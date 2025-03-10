import React, { useEffect } from "react";
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
  const { messages, loading, hasMore, sendMessage, loadMore } = useChat();
  const { ref, inView } = useInView();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inView || loading || !hasMore || !scrollRef.current) return;
    const prevScrollPosition = scrollRef.current.scrollTop;
    loadMore()
      .then(() => scrollRef.current?.scrollTo(0, prevScrollPosition))
      .catch(console.error);
  }, [loadMore, inView, loading, hasMore]);

  return (
    <Container>
      <ChatHeader title="스레드" />
      <Message.List ref={scrollRef}>
        {messages.map((message, index) => (
          <>
            <Message key={message.id} message={message} />
            {formatDate(messages[index + 1]?.createdAt) !==
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
