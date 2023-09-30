import { useCallback } from "react";

import { useAuth } from "@biseo/web/services/auth";

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
    async (message: string) => userInfo && sendWithUser(message, userInfo),
    [userInfo, sendWithUser],
  );

  return { messages, loading, hasMore, sendMessage, loadMore };
};
