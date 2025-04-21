import type { Message, MessageType } from "@biseo/interface/chat";
import type { ChatUser } from "@biseo/interface/user/common";

export const RETRIEVE_CHAT_OFFSET = 20;

export const createDraftMessage = (
  message: string,
  type: MessageType,
  user: ChatUser,
  preExistingKeys: IterableIterator<number>,
): Message => ({
  id: Math.max(...preExistingKeys, 0) + 1,
  type,
  user:
    type === "anonymous"
      ? { id: 0, displayName: "익명", username: "익명" }
      : user,
  message,
  createdAt: new Date().toISOString(),
});

export const byReverseCreatedTime = (a: Message, b: Message) =>
  Date.parse(b.createdAt) - Date.parse(a.createdAt);
