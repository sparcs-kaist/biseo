import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Message, MessageType } from "@biseo/interface/chat";
import type { ChatUser } from "@biseo/interface/user";

import { socket } from "@biseo/web/socket";
import { createDraftMessage, RETRIEVE_CHAT_OFFSET } from "./common";

interface ChatState {
  /**
   * Map of messages
   */
  messages: Map<number, Message>;

  /**
   * Map of adminnotices
   */
  notices: Map<number, Message>;

  /**
   *
   */
  loading: boolean;

  /**
   * Whether there are more messages to load
   */
  hasMore: boolean;

  /**
   * Whether there are more adminnotices to load
   */
  hasMoreNotices: boolean;

  /**
   * Appends a message to the store
   */
  append: (message: Message) => void;

  /**
   * Appends a adminnotice to the store
   */
  appendNotice: (message: Message) => void;

  /**
   * Removes a adminnotice from the store
   */
  removeNotice: (id: number) => void;
  /**
   * Loads messages and appends to the store
   */
  load: () => Promise<void>;

  /**
   * Loads adminnotices and appends to the store
   */
  loadNotices: () => Promise<void>;

  /**
   * Sends a message to the server and appends to the store
   * Use optimistic update using draft message
   */
  send: (message: string, type: MessageType, user: ChatUser) => Promise<void>;

  /**
   * Updates a message to the server and appends to the store
   * Use optimistic update using draft message
   */
  updateMessageType: (id: number, type: MessageType) => Promise<void>;
}

const useChatStore = create(
  immer<ChatState>((set, get) => ({
    messages: new Map(),
    notices: new Map(),
    loading: false,
    hasMore: true,
    hasMoreNotices: true,

    append: message =>
      set(state => {
        state.messages.set(message.id, message);
      }),
    appendNotice: message =>
      set(state => {
        state.notices.set(message.id, message);
      }),
    removeNotice: id =>
      set(state => {
        state.notices.delete(id);
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
    loadNotices: async () => {
      if (!get().hasMoreNotices) return;

      set({ loading: true });

      const messages = await socket.emitAsync("chat.retrieveAdminNotice", {
        lastChatId: Math.min(...get().notices.keys()) || null,
        limit: RETRIEVE_CHAT_OFFSET,
      });

      if (messages.length === 0) {
        set({ hasMoreNotices: false, loading: false });
        return;
      }

      set(state => {
        messages.forEach(message => {
          state.notices.set(message.id, message);
        });
        state.loading = false;
      });
    },
    send: async (message, type, user) => {
      // Creates a local draft message
      const draft = createDraftMessage(
        message,
        type,
        user,
        get().messages.keys(),
      );

      set(state => {
        state.messages.set(draft.id, draft);
      });

      try {
        const created = await socket.emitAsync("chat.send", { message, type });
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
    updateMessageType: async (id, type) => {
      set(state => {
        const msg = state.messages.get(id);
        if (msg) msg.type = type;
      });

      try {
        await socket.emitAsync("chat.update", { id, type });
      } catch {
        console.log(console.error);
      }
    },
  })),
);

export { useChatStore };
