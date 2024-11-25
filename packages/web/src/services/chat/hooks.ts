import { useCallback } from "react";

import { useAuth } from "@biseo/web/services/auth";

import type { MessageType } from "@biseo/interface/chat/common";
import { useChatStore } from "./store";
import { byReverseCreatedTime } from "./common";

export const useChat = () => {
  const { userInfo } = useAuth();

  const { messages, sendWithUser, loadMore, loading, hasMore } = useChatStore(
    state => ({
      messages: [...state.messages.values()].sort(byReverseCreatedTime),
      loading: state.loading,
      hasMore: state.hasMore,
      sendWithUser: state.send,
      loadMore: state.load,
    }),
  );

  const sendMessage = useCallback(
    async (message: string, type: MessageType) =>
      userInfo && sendWithUser(message, type, userInfo),
    [userInfo, sendWithUser],
  );

  return { messages, loading, hasMore, sendMessage, loadMore };
};
