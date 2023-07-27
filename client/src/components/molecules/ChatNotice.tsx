import React from "react";
import styled from "@emotion/styled";
import { Text } from "@/components/atoms";

interface Props {
  message: string;
}

const ChatNoticeContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 10px 15px;
  background-color: ${props => props.theme.colors.gray100};
  border-top: solid 1px ${props => props.theme.colors.gray200};
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 6px 15px;
  background-color: ${props => props.theme.colors.blue100};
  border: solid 1px ${props => props.theme.colors.blue600};
  border-radius: 10px;
`;

export const ChatNotice: React.FC<Props> = ({ message }) => {
  return (
    <ChatNoticeContainer>
      <Container>
        <Text variant="subtitle">📢</Text>
        <Text variant="boldtitle4" color="blue600">
          {message}
        </Text>
      </Container>
    </ChatNoticeContainer>
  );
};
