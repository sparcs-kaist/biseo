/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from "react";
import type { Message, MessageType } from "@biseo/interface/chat";
import { formatTime } from "@biseo/web/utils/format";
import { useAuth } from "@biseo/web/services/auth";
import { useChat } from "@biseo/web/services/chat/hooks";
import { MoreHorizontal } from "lucide-react";
import { css } from "@emotion/react";
import {
  column,
  row,
  align,
  justify,
  gap,
  padding,
  text,
  colors,
} from "@biseo/web/styles";

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
      <a
        href={urlString}
        target="_blank"
        rel="noreferrer"
        css={css`
          ${text.body};
          color: ${colors.gray500};
          text-decoration: underline;
        `}
      >
        {urlString}
      </a>
      {parseURL(content.slice(urlIndexEnd))}
    </>
  );
};

export const PlainMessage: React.FC<Props> = ({ message }) => {
  const { updateMessageType } = useChat();
  const me = useAuth().userInfo;
  const isAdmin = me?.isAdmin;
  const isMy = me?.displayName === message.user.displayName;
  const isNotice = message.type === "adminnotice";
  const nextType: MessageType = isNotice ? "message" : "adminnotice";

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div css={[column, gap(4), padding.horizontal(20), padding.vertical(10)]}>
      <div css={[row, justify.between, align.center]}>
        <div css={[row, align.center, gap(6)]}>
          <p
            css={css`
              ${text.body};
              color: ${colors.gray600};
              margin: 0;
            `}
          >
            {message.user.displayName}
          </p>
          <p
            css={css`
              ${text.option1};
              color: ${colors.gray400};
              margin: 0;
            `}
          >
            {formatTime(message.createdAt)}
          </p>
        </div>

        {isAdmin && isMy && (
          <div css={{ position: "relative" }} ref={menuRef}>
            <MoreHorizontal
              size={20}
              color={colors.gray500}
              style={{ cursor: "pointer" }}
              onClick={() => setMenuOpen(o => !o)}
            />
            {menuOpen && (
              <div
                css={css`
                  position: absolute;
                  top: 24px;
                  right: 0;
                  background: #fff;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                  border-radius: 4px;
                  z-index: 10;
                  display: inline-block;
                  white-space: nowrap;
                `}
              >
                <div
                  css={css`
                    ${padding.horizontal(12)};
                    ${padding.vertical(8)};
                    cursor: pointer;
                    display: inline-block;
                    white-space: nowrap;
                  `}
                  onClick={() => {
                    updateMessageType(message.id, nextType);
                    setMenuOpen(false);
                  }}
                >
                  <span
                    css={css`
                      ${text.body};
                      color: ${colors.black};
                      white-space: nowrap;
                    `}
                  >
                    {isNotice ? "공지 해제" : "공지로 설정"}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div css={{ marginTop: 4 }}>
        <p
          css={css`
            ${text.body};
            color: ${colors.black};
            margin: 0;
          `}
        >
          {parseURL(message.message)}
        </p>
      </div>
    </div>
  );
};
