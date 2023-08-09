import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";

import { Text } from "@/components/atoms";
import { ChatHeader, ChatInput, Message } from "@/components/molecules";
import { useChat } from "@/services";

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
          <Text ref={ref} variant="body" color="gray400">
            로딩 중
          </Text>
        )}
      </Message.List>
      <ChatInput send={sendMessage} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 458px;
  height: 690px;
  border: solid 1px ${props => props.theme.colors.gray300};
  border-radius: 5px;
  overflow: hidden;
`;
