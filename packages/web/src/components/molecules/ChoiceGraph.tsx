import { Box } from "@biseo/web/components/atoms";
import type { ColorKeys } from "@biseo/web/styles";
import { text } from "@biseo/web/styles";
import React from "react";

interface Props {
  choices: { name: string; count: number }[];
  colors: ColorKeys[];
}
const graphMaxLength = 260;

const graph = (
  choices: { name: string; count: number }[],
  colors: ColorKeys[],
) => {
  const sortedChoices = choices.sort((a, b) => b.count - a.count);

  const totalChoiceCount = sortedChoices
    .map(choice => choice.count)
    .reduce((a, b) => a + b);
  const graphLength = sortedChoices.map(
    choice => (choice.count * graphMaxLength) / totalChoiceCount,
  );

  const resultLengthTotal = graphLength.reduce((a, b) => a + b);

  if (resultLengthTotal < graphMaxLength) {
    // Adjustment for possibly unused 1 pixel
    graphLength[graphLength.length - 1] += graphMaxLength - resultLengthTotal;
  }

  return graphLength.map((rodLength, index) => (
    <Box bg={colors[index]} h={20} w={rodLength} />
  ));
};

export const ChoiceGraph: React.FC<Props> = ({ choices, colors }) => (
  <Box h={46} dir="column" gap={10}>
    <Box w={260} justify="space-between" dir="row">
      <p css={[text.subtitle, text.black]}>투표결과</p>
      <p css={[text.option1, text.gray500]}>
        재석 {choices.map(choice => choice.count).reduce((a, b) => a + b)}명
      </p>
    </Box>
    <Box round={5} dir="row" h={20} w={260}>
      {graph(choices, colors)}
    </Box>
  </Box>
);
