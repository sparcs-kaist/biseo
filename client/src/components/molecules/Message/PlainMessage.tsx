import React from "react";
import { Box, Text } from "@/components/atoms";
import { formatTime } from "@/utils/format";

import type { Message } from "biseo-interface/chat";

interface Props {
  message: Message;
}

export const PlainMessage: React.FC<Props> = ({ message }) => (
  <Box dir="column" gap={4} padHorizontal={20} padVertical={10}>
    <Box dir="row" gap={4} align="center">
      <Text variant="boldtitle3" color="black">
        {message.user.displayName}
      </Text>
      <Text variant="option2" color="gray500">
        {formatTime(message.createdAt)}
      </Text>
    </Box>
    <Text variant="body" color="black">
      {message.message}
    </Text>
  </Box>
);
