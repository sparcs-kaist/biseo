import React from "react";
import type { Color } from "@biseo/web/theme";
import {
  w,
  h,
  round,
  bg,
  justify,
  align,
  gap,
  row,
  text,
} from "@biseo/web/styles";

interface Choice {
  name: string;
  count: number;
  color: Color;
}

interface Props {
  choice: Choice;
  total: number;
}

export const ChoicePercentage: React.FC<Props> = ({ choice, total }) => (
  // bg color of squares needed, according to the rank or taking color as parameter directly
  <div css={[w(260), h(14), justify.between, row]}>
    <div css={[w(39), align.center, row, gap(8)]}>
      <div css={[w(12), h(12), round.md, bg[choice.color]]} />
      <p css={[text.option1, text.black]}>{choice.name}</p>
    </div>
    <p css={[text.option1, text.gray500]}>
      {choice.count}/{total}
    </p>
    <p css={[text.option1, text.gray500]}>{(choice.count / total) * 100}%</p>
  </div>
);
