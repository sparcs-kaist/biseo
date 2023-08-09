import React, { type PropsWithChildren } from "react";
import { Box, Text } from "@/components/atoms";
import type { Color } from "@/theme";

interface Choice {
  name: string;
  count: number;
  color: Color;
}

interface Props {
  choice: Choice;
  total: number;
}

export const ChoicePercentage: React.FC<Props> = ({ choice, total }) => {
  return (
    //bg color of squares needed, according to the rank or taking color as parameter directly
    <Box w={260} h={14} justify="space-between" dir="row">
      <Box w={39} align="center" dir="row" gap={8}>
        <Box w={12} h={12} round={2} bg={choice.color}></Box>
        <Text variant="option1">{choice.name}</Text>
      </Box>
      <Text variant="option1" color="gray500">
        {choice.count}/{total}
      </Text>
      <Text variant="option1" color="gray500">
        {(choice.count / total) * 100}%
      </Text>
    </Box>
  );
};
