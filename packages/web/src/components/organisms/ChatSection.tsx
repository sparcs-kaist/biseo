import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import { formatDate } from "@biseo/web/utils/format";
import { Divider, Text } from "@biseo/web/components/atoms";
import {
  ChatHeader,
  ChatInput,
  Message,
} from "@biseo/web/components/molecules";
import { round, padding, center, text, bg } from "@biseo/web/styles";
import { useChat } from "@biseo/web/services";
import { css } from "@emotion/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 458px;
  border: solid 1px ${props => props.theme.colors.gray300};
  border-radius: 5px;
  overflow: hidden;
`;

const dateDividerStyle = css`
  ${bg.gray100}
  ${round.lg}
  ${padding.vertical(4)}
  ${padding.horizontal(10)}

  ${text.option1}
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
  const { ref, inView } = useInView();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isNotice, setIsNotice] = useState(false);
  const toRender = isNotice ? notices : messages;

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
    if (isNotice) {
      loadNotices().catch(console.error);
    } else {
      loadMore().catch(console.error);
    }
  }, [isNotice, loadMore, loadNotices]);

  useEffect(() => {
    if (!inView || loading) return;

    const prevScroll = scrollRef.current?.scrollTop ?? 0;

    if (isNotice) {
      if (!hasMoreNotices) return;
      loadNotices()
        .then(() => scrollRef.current?.scrollTo(0, prevScroll))
        .catch(console.error);
    } else {
      if (!hasMore) return;
      loadMore()
        .then(() => scrollRef.current?.scrollTo(0, prevScroll))
        .catch(console.error);
    }
  }, [
    inView,
    loading,
    hasMore,
    hasMoreNotices,
    isNotice,
    loadMore,
    loadNotices,
  ]);

  return (
    <Container>
      <ChatHeader
        title={isNotice ? "공지" : "스레드"}
        onToggle={() => {
          setIsNotice(prev => !prev);
        }}
        isNotice={isNotice}
      />
      <Message.List ref={scrollRef}>
        {toRender.map((message, index) => (
          <>
            <Message key={message.id} message={message} />
            {formatDate(toRender[index + 1]?.createdAt) !==
              formatDate(message.createdAt) && (
              <div
                css={[round.xl, padding(8), center, text.body, text.gray500]}
              >
                <Divider color="gray200" />
                <span css={dateDividerStyle}>
                  {formatDate(message.createdAt)}
                </span>
                <Divider color="gray200" />
              </div>
            )}
          </>
        ))}
        {hasMore && (
          <Text ref={ref} variant="body" color="gray400" textAlign="center">
            로딩 중
          </Text>
        )}
      </Message.List>
      <ChatInput send={sendMessage} />
    </Container>
  );
};
