import React from "react";
import type { Message as IMessage } from "@biseo/interface/chat";

import { List } from "./List";
import { NoticeMessage } from "./NoticeMessage";
import { PlainMessage } from "./PlainMessage";

interface Props {
  message: IMessage;
}

const Component: React.FC<Props> = ({ message }) =>
  message.type === "notice" ? (
    <NoticeMessage message={message.message} />
  ) : (
    <PlainMessage message={message} />
  );

export const Message = Object.assign(Component, { List });
