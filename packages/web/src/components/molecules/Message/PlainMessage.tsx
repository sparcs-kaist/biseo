import React from "react";

import type { Message } from "@biseo/interface/chat";
import { Box, HyperText } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";
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
    <Box dir="row" gap={4} align="center">
      <p css={[text.boldtitle3, text.black]}>{message.user.displayName}</p>
      <p css={[text.option2, text.gray500]}>{formatTime(message.createdAt)}</p>
    </Box>
    <p css={[text.body, text.black]}>{parseURL(message.message)}</p>
  </Box>
);
