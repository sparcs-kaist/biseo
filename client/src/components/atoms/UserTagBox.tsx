import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { Color } from "@/theme";

export const UserTagBox = styled.div<{
  w?: Size;
  h?: Size;
  bg?: Color;
  border?: Color;
  round?: number;
  dir?: "row" | "column";
  gap?: number | "auto";
  align?: "center" | "start" | "end";
  justify?: "center" | "start" | "end" | "space-between";
  pad?: number;
  padHorizontal?: number;
  padVertical?: number;
  padTop?: number;
  padBottom?: number;
  padLeft?: number;
  padRight?: number;
  zIndex?: number;
  variant?: "subtitle";
  color?: Color;
}>(
  ({
    w = "hug",
    h = "hug",
    bg = "white",
    border = "gray200",
    round = 5,
    gap = 0,
    align = "center",
    justify = "center",
    padHorizontal = 15,
    padVertical = 0,
    padLeft = padHorizontal,
    padRight = padHorizontal,
    padBottom = padVertical,
    padTop = padVertical,
    theme,
    variant = "subtitle",
    color = "gray600",
  }) => css`
    width: ${size(w)};
    height: ${size(h)};
    background-color: ${theme.colors[bg]};
    border-radius: ${round}px;
    border: 1px solid ${theme.colors[border]};
    display: flex;
    align-items: ${align};
    justify-content: ${justify};
    gap: ${gap}px;
    padding-top: ${padTop}px;
    padding-bottom: ${padBottom}px;
    padding-left: ${padLeft}px;
    padding-right: ${padRight}px;
    color: ${theme.colors[color]};
    font-size: 11px;
    font-weight: 500;
    font-family: "Noto Sans KR";
    font-style: normal;
    line-height: normal;
  `,
);

type Size = number | "hug" | "fill";
const size = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};
