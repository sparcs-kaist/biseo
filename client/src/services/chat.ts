import { socket } from "@/socket";
import { create } from "zustand";
import type { Message } from "@server/chat/common";

const RETRIEVE_CHAT_OFFSET = 20;

export interface PendingMessage extends Omit<Message, "id" | "user" | "type"> {
  localId: number;
}

interface ChatStoreState {
  chats: Message[];
  pendingChats: PendingMessage[];
  sendChat: (message: string) => void;
  retrieveChats: () => void;
}

const useChat = create<ChatStoreState>((set, get) => ({
  chats: [],
  pendingChats: [],
  sendChat: async (message) => {
    const localId = (get().pendingChats.at(-1)?.localId || 0) + 1;

    // Optimistic ui update
    set(state => ({
      pendingChats: [
        ...state.pendingChats,
        { localId, message, createdAt: new Date().toISOString() },
      ],
    }));

    try {
      await socket.emitAsync("chat/send", { message });
    } catch (error) {
      // TODO: handle error
    }

    // Remove pending chat after success or error
    // TODO: handle local id
    set(state => ({
      pendingChats: state.pendingChats.filter(chat => chat.localId !== localId),
    }));
  },
  retrieveChats: async () => {
    try {
      const messages = await socket.emitAsync("chat/retrieve", {
        lastChatId: get().chats[0]?.id || null,
        limit: RETRIEVE_CHAT_OFFSET,
      });
      set(state => ({ chats: [...messages, ...state.chats] }));
    } catch (error) {
      // TODO: handle error
    }
  },
}));

socket.on("chat/received", message => {
  useChat.setState(state => ({
    // TODO: handle local id
    chats: [...state.chats, message],
  }));
});

export { useChat };
