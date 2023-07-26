import React from "react";
import { Box, Text } from "@/components/atoms";
import styled from "@emotion/styled";

interface Props {
  user: string;
  time: Date;
  message: string;
}

const formatTime = (time: Date) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours < 12 ? "오전" : "오후";

  const formatLength = (time: number) => {
    return time < 10 ? "0" + time : time;
  };
  const displayHours = formatLength(hours % 12 ? hours % 12 : 12);
  const displayMinutes = formatLength(minutes);

  return `${ampm} ${displayHours}:${displayMinutes}`;
};

const ChatMessageContainer = styled.div`
  width: 100%;
  border-top: solid 1px ${props => props.theme.colors.gray200};
`;

export const ChatMessage: React.FC<Props> = ({ user, time, message }) => {
  return (
    <ChatMessageContainer>
      <Box dir="column" gap={4} padHorizontal={20} padVertical={10}>
        <Box dir="row" gap={4} align="center">
          <Text variant="boldtitle3" color="black">
            {user}
          </Text>
          <Text variant="option2" color="gray500">
            {formatTime(time)}
          </Text>
        </Box>
        <Text variant="body" color="black">
          {message}
        </Text>
      </Box>
    </ChatMessageContainer>
  );
};
