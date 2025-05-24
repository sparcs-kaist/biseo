import { useCallback } from "react";

import { useAuth } from "@biseo/web/services/auth";

import type { MessageType } from "@biseo/interface/chat/common";
import { useChatStore } from "./store";
import { byReverseCreatedTime } from "./common";

export const useChat = () => {
  const { userInfo } = useAuth();

  const {
    messages,
    notices,
    sendWithUser,
    loadMore,
    loadNotices,
    loading,
    hasMore,
    hasMoreNotices,
    updateMessageType,
  } = useChatStore(state => ({
    messages: [...state.messages.values()].sort(byReverseCreatedTime),
    notices: [...state.notices.values()].sort(byReverseCreatedTime),
    loading: state.loading,
    hasMore: state.hasMore,
    hasMoreNotices: state.hasMoreNotices,
    sendWithUser: state.send,
    loadMore: state.load,
    loadNotices: state.loadNotices,
    updateMessageType: state.updateMessageType,
  }));

  const sendMessage = useCallback(
    async (message: string, type: MessageType) =>
      userInfo && sendWithUser(message, type, userInfo),
    [userInfo, sendWithUser],
  );

  const fetchLatestNotice = useCallback(
    () => Promise.resolve(notices[0] ?? null),
    [notices],
  );

  return {
    messages,
    notices,
    loading,
    hasMore,
    hasMoreNotices,
    sendMessage,
    loadMore,
    loadNotices,
    updateMessageType,
    fetchLatestNotice,
  };
};
