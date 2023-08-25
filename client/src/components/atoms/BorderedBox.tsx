import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { Color } from "@/theme";

export const BorderedBox = styled.div<{
  w?: Size;
  h?: Size;
  bg?: Color;
  round?: number;
  roundTop?: number;
  roundBot?: number;
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
  borderSize?: number;
  borderColor?: Color;
  borderStyle?:
    | "solid"
    | "dotted"
    | "dashed"
    | "double"
    | "groove"
    | "groove"
    | "ridge"
    | "hidden"
    | "none";
  position?: "absolute" | "static" | "relative";
}>(
  ({
    w = "hug",
    h = "hug",
    bg,
    round = 0,
    roundTop = round,
    roundBot = round,
    dir = "column",
    gap = 0,
    align = "start",
    justify = "start",
    pad = 0,
    padHorizontal = pad,
    padVertical = pad,
    padLeft = padHorizontal,
    padRight = padHorizontal,
    padBottom = padVertical,
    padTop = padVertical,
    theme,
    borderSize = 0,
    borderColor,
    borderStyle,
    position = "static",
  }) => css`
    width: ${size(w)};
    height: ${size(h)};
    background-color: ${bg ? theme.colors[bg] : "transparent"};
    border-radius: ${roundTop}px ${roundTop}px ${roundBot}px ${roundBot}px;
    display: flex;
    flex-direction: ${dir};
    align-items: ${align};
    justify-content: ${justify};
    gap: ${gap}px;
    padding-top: ${padTop}px;
    padding-bottom: ${padBottom}px;
    padding-left: ${padLeft}px;
    padding-right: ${padRight}px;
    border: ${borderSize}px ${borderStyle};
    border-color: ${borderColor ? theme.colors[borderColor] : "transparent"};
    position: ${position};
  `,
);

type Size = number | "hug" | "fill";
const size = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};
