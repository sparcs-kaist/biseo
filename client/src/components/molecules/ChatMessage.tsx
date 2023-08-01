import React from "react";
import { Message } from "biseo-interface/chat";
import { Box, Text } from "@/components/atoms";

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

export const ChatMessage: React.FC<Message> = ({
  user,
  createdAt,
  message,
}) => (
  <Box dir="column" gap={4} padHorizontal={20} padVertical={10}>
    <Box dir="row" gap={4} align="center">
      <Text variant="boldtitle3" color="black">
        {user.displayName}
      </Text>
      <Text variant="option2" color="gray500">
        {formatTime(createdAt)}
      </Text>
    </Box>
    <Text variant="body" color="black">
      {message}
    </Text>
  </Box>
);
