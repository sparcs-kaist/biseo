import React from "react";
import { BorderedBox, Box, Text } from "@/components/atoms";

interface Props {
  title: string;
  content: string;
}

export const ModalInnerTextBox: React.FC<Props> = ({ title, content }) => (
  <Box dir="column" gap={8}>
    <Text variant="body" color="black">
      {title}
    </Text>
    <BorderedBox
      borderColor="gray200"
      bg="white"
      w={300}
      borderSize={3}
      padVertical={10}
      padHorizontal={15}
      round={5}
      borderStyle="solid"
    >
      <Text color="gray600" variant="subtitle">
        {content}
      </Text>
    </BorderedBox>
  </Box>
);
