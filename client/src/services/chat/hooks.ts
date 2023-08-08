import { useCallback } from "react";

import { socket } from "@/socket";
import { useAuth } from "@/services/auth";

import { useChatStore } from "./store";
import { byReverseCreatedTime, RETRIEVE_CHAT_OFFSET } from "./common";

export const useChat = () => {
  const { userInfo } = useAuth();

  const { messages, createDraft, resolveDraft, appendMessages } = useChatStore(
    state => ({
      messages: [...state.messages.values()].sort(byReverseCreatedTime),
      createDraft: state.createDraft,
      resolveDraft: state.resolveDraft,
      createMessage: state.createMessage,
      appendMessages: state.appendMessages,
    }),
  );

  const sendMessage = useCallback(
    async (message: string) => {
      if (!userInfo) throw new Error("User is not logged in");

      const draft = createDraft(message, userInfo);

      try {
        const created = await socket.emitAsync("chat.send", { message });
        resolveDraft(draft, created);
      } catch {
        resolveDraft(draft);
      }
    },
    [createDraft, userInfo],
  );

  const loadMore = useCallback(async () => {
    const loadedMessages = await socket.emitAsync("chat.retrieve", {
      lastChatId: messages.at(-1)?.id || null,
      limit: RETRIEVE_CHAT_OFFSET,
    });
    appendMessages(loadedMessages);
  }, []);

  return { messages, sendMessage, loadMore };
};
