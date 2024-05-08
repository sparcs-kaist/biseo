import React from "react";
import type { Color } from "@biseo/web/theme";
import {
  bg,
  w,
  h,
  text,
  justify,
  row,
  round,
  column,
  gap,
} from "@biseo/web/styles";

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
    <div css={[bg[colors[index]], h(20), w(rodLength)]} />
  ));
};

export const ChoiceGraph: React.FC<Props> = ({ choices, colors }) => (
  <div css={[h(46), column, gap(10)]}>
    <div css={[w(260), justify.between, row]}>
      <h4 css={[text.subtitle, text.black]}>투표결과</h4>
      <p css={[text.option1, text.gray500]}>
        재석 {choices.map(choice => choice.count).reduce((a, b) => a + b)}명
      </p>
    </div>
    <div css={[w(260), h(20), row, round.md]}>{graph(choices, colors)}</div>
  </div>
);
