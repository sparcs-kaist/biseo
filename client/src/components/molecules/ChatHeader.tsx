import React from "react";
import { Box, Text } from "@/components/atoms";

interface Props {
  title: string;
}

export const ChatHeader: React.FC<Props> = ({ title }) => {
  return (
    <Box w="fill" h={42} bg="gray100" padHorizontal={20} justify="center">
      <Text variant="title2">{title}</Text>
    </Box>
  );
};
