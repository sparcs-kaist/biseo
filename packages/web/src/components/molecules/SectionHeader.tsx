import React, { type PropsWithChildren } from "react";
import {
  align,
  bg,
  center,
  gap,
  h,
  padding,
  round,
  row,
  text,
  w,
} from "@biseo/web/styles";

interface Props extends PropsWithChildren {
  count: number;
}

/**
 * @deprecated use AgendaCard.Group instead
 * PROBLEM: structure of AgendaCard.Group does not fit well with
 * non-agenda card components in organisms/AdminSettingSection.tsx
 */
export const SectionHeader: React.FC<Props> = ({ count, children = null }) => (
  <div
    css={[
      row,
      align.center,
      gap(8),
      padding.horizontal(15),
      padding.vertical(11),
    ]}
  >
    <h2 css={[text.title2, text.black]}>{children}</h2>
    <div css={[bg.blue200, round.md, center, w(20), h(20)]}>
      <p css={[text.body, text.blue600]}>{count}</p>
    </div>
  </div>
);
