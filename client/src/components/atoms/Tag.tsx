import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { theme } from "@/theme";
import type { Color } from "@/theme";

const colors = (color: Color, bg: Color) =>
  css({
    color: theme.colors[color],
    backgroundColor: theme.colors[bg],
  });

const tagNames = {
  _hidden: "공개",
  hidden: "비공개",
  _anonymous: "기명",
  anonymous: "무기명",
  // _votable: colors("green600", "green200"),
  votable: "투표 가능",
  empty: "",
} as const;

const tagStyles = {
  _hidden: colors("orange600", "orange200"),
  hidden: colors("gray600", "gray200"),
  _anonymous: colors("green600", "green200"),
  anonymous: colors("purple600", "purple200"),
  // _votable: colors("green600", "green200"),
  votable: colors("blue600", "blue200"),
  empty: css`
    display: none;
  `,
} as const;

type Types = keyof typeof tagStyles;

const TagInner = styled.div<{
  type: Types;
  round?: number;
  align?: "center" | "start" | "end";
  justify?: "center" | "start" | "end";
  padHorizontal?: number;
  padVertical?: number;
  padTop?: number;
  padBottom?: number;
  padLeft?: number;
  padRight?: number;
}>(
  ({
    type,
    round = 3,
    align = "center",
    justify = "center",
    padHorizontal = 10,
    padVertical = 2,
    padLeft = padHorizontal,
    padRight = padHorizontal,
    padBottom = padVertical,
    padTop = padVertical,
    theme,
  }) => [
    css`
      height: 18px;
      border-radius: ${round}px;
      display: flex;
      align-items: ${align};
      justify-content: ${justify};
      padding-top: ${padTop}px;
      padding-bottom: ${padBottom}px;
      padding-left: ${padLeft}px;
      padding-right: ${padRight}px;

      font-size: 10px;
      font-weight: 500;
    `,
    tagStyles[type],
  ],
);

interface Props {
  type: Types;
}

export const Tag: React.FC<Props> = ({ type }) => {
  return <TagInner type={type}>{tagNames[type]}</TagInner>;
};
