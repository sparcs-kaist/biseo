import React from "react";

import type { Message } from "@biseo/interface/chat";
import { formatTime } from "@biseo/web/utils/format";
import { text, row, column, gap, padding, align } from "@biseo/web/styles";

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
      <a css={[text.gray500]} href={urlString} target="_blank" rel="noreferrer">
        {urlString}
      </a>
      {parseURL(content.slice(urlIndexEnd))}
    </>
  );
};

export const PlainMessage: React.FC<Props> = ({ message }) => (
  <div css={[column, gap(4), padding.horizontal(20), padding.vertical(10)]}>
    <div css={[row, gap(4), align.center]}>
      <h3 css={[text.boldtitle3, text.black]}>{message.user.displayName}</h3>
      <p css={[text.option2, text.gray500]}>{formatTime(message.createdAt)}</p>
    </div>
    <p css={[text.body, text.black]}>{parseURL(message.message)}</p>
  </div>
);
