import React from "react";
import { css } from "@emotion/react";
import {
  bg,
  round,
  row,
  justify,
  padding,
  text,
  w,
  h,
  align,
  border,
} from "@biseo/web/styles";

interface Tag {
  id: number;
  title: string;
  description: string;
}

interface Props {
  tag: Tag;
  selected: boolean;
}

const cursorPointer = css`
  cursor: pointer;
`;

export const PresetOption: React.FC<Props> = ({ tag, selected }) => (
  <div
    css={[
      row,
      justify.between,
      align.center,
      selected ? bg.blue100 : bg.white,
      w("fill"),
      h(30),
      round.md,
      padding.horizontal(10),
      cursorPointer,
    ]}
  >
    <div
      css={[
        align.center,
        border.gray200,
        round.md,
        padding.horizontal(6),
        padding.vertical(3),
      ]}
    >
      <p css={[text.option2, text.gray500]}>{tag.title}</p>
    </div>
    <p css={[text.option1, selected ? text.gray600 : text.gray500]}>
      {tag.description}
    </p>
  </div>
);
