import React from "react";

import type { Message } from "@biseo/interface/chat";
import { Box, HyperText, Text } from "@biseo/web/components/atoms";
import { formatTime } from "@biseo/web/utils/format";

interface Props {
  message: Message;
}

const parseURL: React.FC<string> = (content: string) => {
  if (content.length <= 3) return <>{content}</>;

  let urlIndexStart = content.search(/(https?:\/\/[^\s]+)/);
  if (urlIndexStart === -1)
    urlIndexStart = content.search(/(http?:\/\/[^\s]+)/);
  if (urlIndexStart === -1) return <>{content}</>;

  let urlIndexEnd = urlIndexStart;

  while (
    content[urlIndexEnd] !== " " &&
    content[urlIndexEnd] !== "\n" &&
    content.length > urlIndexEnd
  ) {
    urlIndexEnd += 1;
  }
  const urlString = content.slice(urlIndexStart, urlIndexEnd);
  return (
    <>
      {content.slice(0, urlIndexStart)}
      <HyperText
        color="gray500"
        href={urlString}
        target="_blank"
        rel="noreferrer"
      >
        {urlString}
      </HyperText>
      {parseURL(content.slice(urlIndexEnd))}
    </>
  );
};

export const PlainMessage: React.FC<Props> = ({ message }) => (
  <Box dir="column" gap={4} padHorizontal={20} padVertical={10}>
    <Box dir="row" gap={6} align="center">
      <Text variant="body" color="gray600">
        {message.user.displayName}
      </Text>
      <Text variant="option1" color="gray400">
        {formatTime(message.createdAt)}
      </Text>
    </Box>
    <Text variant="body" color="black">
      {parseURL(message.message)}
    </Text>
  </Box>
);
