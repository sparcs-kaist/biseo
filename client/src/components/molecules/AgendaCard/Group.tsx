import React, { Children } from "react";
import { type PropsWithChildren } from "react";
import {
  align,
  bg,
  center,
  column,
  gap,
  h,
  padding,
  round,
  row,
  text,
  w,
} from "@/styles";

interface Props extends PropsWithChildren {
  title: string;
}

export const Group: React.FC<Props> = ({ title, children = null }) => (
  <div>
    <div css={[row, align.center, h(42), gap(8), padding.horizontal(15)]}>
      <h2 css={[text.title2, text.black]}>{title}</h2>
      <div
        css={[
          text.body,
          text.blue600,
          bg.blue200,
          w(20),
          h(20),
          round.md,
          center,
        ]}
      >
        {Children.count(children)}
      </div>
    </div>
    <ul css={[column, gap(15)]}>{children}</ul>
  </div>
);
