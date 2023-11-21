import { Box } from "@biseo/web/components/atoms";
import type { ColorKeys } from "@biseo/web/styles";
import { text } from "@biseo/web/styles";
import React from "react";

interface Choice {
  name: string;
  count: number;
  color: ColorKeys;
}

interface Props {
  choice: Choice;
  total: number;
}

export const ChoicePercentage: React.FC<Props> = ({ choice, total }) => (
  // bg color of squares needed, according to the rank or taking color as parameter directly
  <Box w={260} h={14} justify="space-between" dir="row">
    <Box w={39} align="center" dir="row" gap={8}>
      <Box w={12} h={12} round={2} bg={choice.color} />
      <p css={[text.option1, text.black]}>{choice.name}</p>
    </Box>
    <p css={[text.option1, text.gray500]}>
      {choice.count}/{total}
    </p>
    <p css={[text.option1, text.gray500]}>{(choice.count / total) * 100}%</p>
  </Box>
);
