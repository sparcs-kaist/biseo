/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import { formatDate } from "@biseo/web/utils/format";
import { Divider } from "@biseo/web/components/atoms";
import { ChatInput, Message } from "@biseo/web/components/molecules";
import { useChat } from "@biseo/web/services";
import { css } from "@emotion/react";
import {
  row,
  w,
  padding,
  align,
  justify,
  bg,
  colors,
  text,
  round,
  center,
} from "@biseo/web/styles";
import { Megaphone, ChevronUp } from "lucide-react";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 458px;
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: 5px;
  overflow: hidden;
`;

const dateDividerStyle = css`
  ${bg.gray100};
  ${round.lg};
  ${padding.vertical(4)};
  ${padding.horizontal(10)};
  ${text.option1};
  white-space: nowrap;
`;

export const ChatSection: React.FC = () => {
  const {
    messages,
    notices,
    loading,
    hasMore,
    hasMoreNotices,
    sendMessage,
    loadMore,
    loadNotices,
  } = useChat();

  const [isNotice, setIsNotice] = useState(false);
  const [showLatest, setShowLatest] = useState(false);

  const { ref, inView } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
    if (isNotice) loadNotices().catch(console.error);
    else loadMore().catch(console.error);
  }, [isNotice, loadMore, loadNotices]);

  useEffect(() => {
    if (!inView || loading) return;
    const flag = isNotice ? hasMoreNotices : hasMore;
    const loader = isNotice ? loadNotices : loadMore;
    if (!flag) return;
    const prev = scrollRef.current?.scrollTop ?? 0;
    loader()
      .then(() => scrollRef.current?.scrollTo(0, prev))
      .catch(console.error);
  }, [
    inView,
    loading,
    hasMore,
    hasMoreNotices,
    isNotice,
    loadMore,
    loadNotices,
  ]);

  const toRender = isNotice ? notices : messages;
  const moreFlag = isNotice ? hasMoreNotices : hasMore;

  const handleRecentToggle = () => {
    if (!showLatest) {
      setShowLatest(true);
      if (notices.length === 0) {
        loadNotices().catch(console.error);
      }
    } else {
      setShowLatest(false);
    }
  };

  return (
    <Container>
      <div
        css={css`
          ${row};
          ${w("fill")};
          ${bg.gray100};
          ${padding.horizontal(20)};
          ${align.center};
          ${justify.between};
          min-height: 42px;
        `}
      >
        <div
          css={css`
            ${row};
            gap: 24px;
          `}
        >
          <div
            css={css`
              cursor: pointer;
              ${text.title3};
              color: ${isNotice ? colors.gray500 : colors.black};
            `}
            onClick={() => setIsNotice(false)}
          >
            스레드
          </div>
          <div
            css={css`
              cursor: pointer;
              ${text.title3};
              color: ${isNotice ? colors.black : colors.gray500};
            `}
            onClick={() => setIsNotice(true)}
          >
            공지
          </div>
        </div>
        <Megaphone
          size={20}
          color={colors.gray600}
          style={{ cursor: "pointer" }}
          onClick={handleRecentToggle}
        />
      </div>

      {showLatest && notices.length > 0 && (
        <div
          css={css`
            position: absolute;
            top: 42px;
            left: 0;
            right: 0;
            background: white;
            border-bottom: 1px solid ${colors.gray300};
            padding: 12px 16px;
            ${row};
            ${align.center};
            ${justify.between};
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            z-index: 10;
          `}
        >
          <div
            css={css`
              ${row};
              ${align.center};
              gap: 8px;
              flex: 1;
            `}
          >
            <Megaphone size={20} color={colors.blue600} />
            <p
              css={css`
                ${text.body};
                margin: 0;
                color: ${colors.black};
                word-break: break-word;
                flex: 1;
              `}
            >
              {notices[0].message}
            </p>
          </div>
          <ChevronUp
            size={20}
            color={colors.gray500}
            style={{ cursor: "pointer" }}
            onClick={() => setShowLatest(false)}
          />
        </div>
      )}

      <Message.List
        key={isNotice ? "notice" : "thread"}
        ref={scrollRef}
        style={{ marginTop: showLatest ? 56 : 0 }}
      >
        {toRender.map((msg, idx) => (
          <React.Fragment key={msg.id}>
            <Message message={msg} />
            {idx < toRender.length - 1 &&
              formatDate(toRender[idx + 1].createdAt) !==
                formatDate(msg.createdAt) && (
                <div
                  css={[
                    round.xl,
                    padding(8),
                    center,
                    text.body,
                    { color: colors.gray500 },
                  ]}
                >
                  <Divider color="gray200" />
                  <span css={dateDividerStyle}>
                    {formatDate(msg.createdAt)}
                  </span>
                  <Divider color="gray200" />
                </div>
              )}
          </React.Fragment>
        ))}

        {!showLatest && moreFlag && (
          <div ref={ref} css={[text.body, center, { color: colors.gray500 }]}>
            로딩 중…
          </div>
        )}
      </Message.List>

      <ChatInput send={sendMessage} />
    </Container>
  );
};
