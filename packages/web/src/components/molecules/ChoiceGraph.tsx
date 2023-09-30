import React from "react";
import { Box, Text } from "@biseo/web/components/atoms";
import type { Color } from "@biseo/web/theme";

interface Props {
  choices: { name: string; count: number }[];
  colors: Color[];
}
const graphMaxLength = 260;

const graph = (choices: { name: string; count: number }[], colors: Color[]) => {
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
      <Text variant="subtitle" color="black">
        투표결과
      </Text>
      <Text variant="option1" color="gray500">
        재석 {choices.map(choice => choice.count).reduce((a, b) => a + b)}명
      </Text>
    </Box>
    <Box round={5} dir="row" h={20} w={260}>
      {graph(choices, colors)}
    </Box>
  </Box>
);
