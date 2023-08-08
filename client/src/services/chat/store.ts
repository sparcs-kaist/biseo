import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Message } from "biseo-interface/chat";
import type { ChatUser } from "biseo-interface/user";

import { createDraftMessage } from "./common";

interface ChatState {
  messages: Map<number, Message>;

  /**
   * Creates a temporary message for optimistic ui update
   * Returns the id of the draft message which can be used to resolve the draft
   */
  createDraft: (message: string, user: ChatUser) => number;
  // (message?: Message) => void;

  /**
   * Resolves a draft message
   * Removes or replaces the draft message with the actual message
   */
  resolveDraft: (draftId: number, message?: Message) => void;

  /**
   * Creates a message in the store
   */
  createMessage: (message: Message) => void;

  /**
   * Appends multiple messages to the store
   */
  appendMessages: (messages: Message[]) => void;
}

const useChatStore = create(
  immer<ChatState>((set, get) => ({
    messages: new Map(),
    createMessage: message =>
      set(state => {
        state.messages.set(message.id, message);
      }),
    appendMessages: messages =>
      set(state => {
        messages.map(message => {
          state.messages.set(message.id, message);
        });
      }),
    createDraft: (message, user) => {
      const draftMessage = createDraftMessage(
        message,
        user,
        get().messages.keys(),
      );
      set(state => {
        state.messages.set(draftMessage.id, draftMessage);
      });
      return draftMessage.id;
    },
    resolveDraft: (draftId, message) =>
      set(state => {
        state.messages.delete(draftId);
        message && state.messages.set(message.id, message);
      }),
  })),
);

export { useChatStore };
