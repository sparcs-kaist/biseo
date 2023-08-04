import React from "react";
import { Box, Text } from "@/components/atoms";

interface Props {
  title: string;
  subtitle: string;
  content: string;
}

export const AgendaDetail: React.FC<Props> = ({ title, subtitle, content }) => (
  <>
    <Box w={260} gap={2}>
      <Text variant="title2" color="black">
        {title}
      </Text>
      <Text variant="subtitle" color="gray500">
        {subtitle}
      </Text>
    </Box>
    <Box>
      <Text variant="subtitle" color="blue600">
        {content}
      </Text>
    </Box>
  </>
);
