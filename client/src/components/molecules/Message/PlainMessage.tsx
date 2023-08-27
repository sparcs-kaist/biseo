import React from "react";
import { Box, HyperText, Text } from "@/components/atoms";
import { formatTime } from "@/utils/format";

import type { Message } from "@biseo/interface/chat";

interface Props {
  message: Message;
}

interface ParseResult {
  preURL: string;
  URL: string;
  postURL: string;
}

const parseURL: React.FC<string> = (content: string) => {
  if (content.length <= 3) return <>{content}</>;

  let URL_index_start = content.search(/(https?:\/\/[^\s]+)/);
  if (URL_index_start === -1)
    URL_index_start = content.search(/(http?:\/\/[^\s]+)/);
  if (URL_index_start === -1) return <>{content}</>;

  let URL_index_end = URL_index_start;

  while (
    content[URL_index_end] !== " " &&
    content[URL_index_end] !== "\n" &&
    content.length > URL_index_end
  )
    URL_index_end++;
  const URL_String = content.slice(URL_index_start, URL_index_end);
  return (
    <>
      {content.slice(0, URL_index_start)}
      <HyperText
        color="gray500"
        href={URL_String}
        target="_blank"
        rel="noreferrer"
      >
        {URL_String}
      </HyperText>
      {parseURL(content.slice(URL_index_end))}
    </>
  );
};

const change = (content: ParseResult) => {};
const b = "<a> hello </a>";
export const PlainMessage: React.FC<Props> = ({ message }) => (
  <Box dir="column" gap={4} padHorizontal={20} padVertical={10}>
    <Box dir="row" gap={4} align="center">
      <Text variant="boldtitle3" color="black">
        {message.user.displayName}
      </Text>
      <Text variant="option2" color="gray500">
        {formatTime(message.createdAt)}
      </Text>
    </Box>
    <Text variant="body" color="black">
      {parseURL(message.message)}
    </Text>
  </Box>
);
