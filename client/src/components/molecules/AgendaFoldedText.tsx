import React from "react";
import { Box, Text } from "@/components/atoms";

interface Props {
  title: string;
  subtitle: string;
}

export const AgendaFoldedText: React.FC<Props> = ({ title, subtitle }) => (
  <Box w={260} gap={2}>
    <Text variant="title2" color="black">
      {title}
    </Text>
    <Text variant="subtitle" color="gray500">
      {subtitle}
    </Text>
  </Box>
);
