import React, { type PropsWithChildren } from "react";
import { Box, Text } from "@/components/atoms";
import type { Color } from "@/theme";

interface Props {
  choiceName: string;
  choiceCount: number;
  choiceTotal: number;
  color: Color;
}

export const SectionHeader: React.FC<Props> = ({
  choiceName,
  choiceCount,
  choiceTotal,
  color,
}) => {
  return (
    //bg color of squares needed, according to the rank or taking color as parameter directly
    <Box w={260} h={14} align="center" dir="row" padHorizontal={20}>
      <Box justify="space-betweeen">
        <Box w={12} h={12} round={2} bg={0} color={color}></Box>
        <Text variant="option1">{choiceName}</Text>
      </Box>
      <Text variant="option1" color="gray500">
        {choiceCount}/{choiceTotal}
      </Text>
      <Text variant="option1" color="gray500">
        {(choiceCount / choiceTotal) * 100}%
      </Text>
    </Box>
  );
};
