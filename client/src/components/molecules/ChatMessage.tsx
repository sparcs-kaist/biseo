import React from "react";
import { Message } from "biseo-interface/chat";
import { Box, Text } from "@/components/atoms";
import { formatTime } from "@/utils/format";

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
