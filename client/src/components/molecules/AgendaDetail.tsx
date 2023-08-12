import React from "react";
import { Box, Text } from "@/components/atoms";

interface Props {
  title: string;
  content: string;
  resolution: string;
}

export const AgendaDetail: React.FC<Props> = ({
  title,
  content,
  resolution,
}) => (
  <>
    <Box w={260} gap={2}>
      <Text variant="title2" color="black">
        {title}
      </Text>
      <Text variant="subtitle" color="gray500">
        {content}
      </Text>
    </Box>
    <Box>
      <Text variant="subtitle" color="blue600">
        {resolution}
      </Text>
    </Box>
  </>
);
