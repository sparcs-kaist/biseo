import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import {
  ChatHeader,
  ChatInput,
  Message,
} from "@biseo/web/components/molecules";
import { useChat } from "@biseo/web/services";
import { text } from "@biseo/web/styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 458px;
  border: solid 1px ${props => props.theme.colors.gray300};
  border-radius: 5px;
  overflow: hidden;
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
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
        {hasMore && (
          <p ref={ref} css={[text.body, text.gray400]}>
            로딩 중
          </p>
        )}
      </Message.List>
      <ChatInput send={sendMessage} />
    </Container>
  );
};
