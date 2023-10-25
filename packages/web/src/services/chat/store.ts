import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Message } from "@biseo/interface/chat";
import type { ChatUser } from "@biseo/interface/user";

import { socket } from "@biseo/web/socket";
import { createDraftMessage, RETRIEVE_CHAT_OFFSET } from "./common";

interface ChatState {
  /**
   * Map of messages
   */
  messages: Map<number, Message>;

  /**
   *
   */
  loading: boolean;

  /**
   * Whether there are more messages to load
   */
  hasMore: boolean;

  /**
   * Appends a message to the store
   */
  append: (message: Message) => void;

  /**
   * Loads messages and appends to the store
   */
  load: () => Promise<void>;

  /**
   * Sends a message to the server and appends to the store
   * Use optimistic update using draft message
   */
  send: (message: string, user: ChatUser) => Promise<void>;
}

const useChatStore = create(
  immer<ChatState>((set, get) => ({
    messages: new Map(),
    loading: false,
    hasMore: true,
    append: message =>
      set(state => {
        state.messages.set(message.id, message);
      }),
    load: async () => {
      if (!get().hasMore) return;

      set({ loading: true });

      const messages = await socket.emitAsync("chat.retrieve", {
        lastChatId: Math.min(...get().messages.keys()) || null,
        limit: RETRIEVE_CHAT_OFFSET,
      });

      if (messages.length === 0) {
        set({ hasMore: false, loading: false });
        return;
      }

      set(state => {
        messages.forEach(message => {
          state.messages.set(message.id, message);
        });
        state.loading = false;
      });
    },
    send: async (message, user) => {
      // Creates a local draft message
      const draft = createDraftMessage(message, user, get().messages.keys());

      set(state => {
        state.messages.set(draft.id, draft);
      });

      try {
        const created = await socket.emitAsync("chat.send", { message });
        set(state => {
          // Removes the draft message and replaces with the created message
          state.messages.delete(draft.id);
          state.messages.set(created.id, created);
        });
      } catch {
        set(state => {
          // Removes the draft message when error
          state.messages.delete(draft.id);
        });
      }
    },
  })),
);

export { useChatStore };
