import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { ChatHeader, ChatInput, Message } from "@/components/molecules";

import { useChat } from "@/services";

export const ChatSection: React.FC = () => {
  const { messages, sendMessage } = useChat();

  useEffect(() => console.log(messages), [messages]);

  return (
    <Container>
      <ChatHeader title="스레드" />
      <Message.List>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
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
