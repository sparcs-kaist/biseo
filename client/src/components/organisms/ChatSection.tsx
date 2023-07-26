import React from "react";
import styled from "@emotion/styled";
import { ChatHeader, ChatInput } from "@/components/molecules";
import { ChatContainer } from "@/components/organisms";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 458px;
  height: 690px;
  border: solid 1px ${props => props.theme.colors.gray300};
  border-radius: 5px;
  overflow: hidden;
`;

export const ChatSection: React.FC = () => {
  return (
    <Container>
      <ChatHeader title="스레드" />
      <ChatContainer />
      <ChatInput />
    </Container>
  );
};
