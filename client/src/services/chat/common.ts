import type { ChatUser } from "biseo-interface/user";
import type { Message } from "biseo-interface/chat";

export const RETRIEVE_CHAT_OFFSET = 20;

export const createDraftMessage = (
  message: string,
  user: ChatUser,
  preExistingKeys: IterableIterator<number>,
): Message => ({
  id: Math.max(...preExistingKeys, 0) + 1,
  type: "message",
  user: user,
  message: message,
  createdAt: new Date().toISOString(),
});

export const byReverseCreatedTime = (a: Message, b: Message) =>
  Date.parse(b.createdAt) - Date.parse(a.createdAt);
