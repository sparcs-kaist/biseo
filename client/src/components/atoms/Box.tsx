import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { Color } from "@/theme";

type Size = number | "hug" | "fill";
const calcSize = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};

export const Box = styled.div<{
  w?: Size;
  h?: Size;
  bg?: Color;
  round?: number;
  dir?: "row" | "column";
  gap?: number | "auto";
  align?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between";
  justify?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between";
  pad?: number;
  padHorizontal?: number;
  padVertical?: number;
  padTop?: number;
  padBottom?: number;
  padLeft?: number;
  padRight?: number;
  zIndex?: number;
  position?: "static" | "absolute";
  self?: "auto" | "stretch";
  wrap?: "wrap" | "nowrap";
}>(
  ({
    w = "hug",
    h = "hug",
    bg,
    round = 0,
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
    zIndex = 0,
    position = "static",
    self = "auto",
    wrap = "nowrap",
  }) => css`
    width: ${calcSize(w)};
    height: ${calcSize(h)};
    background-color: ${bg ? theme.colors[bg] : "transparent"};
    border-radius: ${round}px;
    display: flex;
    flex-direction: ${dir};
    align-items: ${align};
    justify-content: ${justify};
    gap: ${gap}px;
    padding-top: ${padTop}px;
    padding-bottom: ${padBottom}px;
    padding-left: ${padLeft}px;
    padding-right: ${padRight}px;
    z-index: ${zIndex};
    position: ${position};
    align-self: ${self};
    flex-wrap: ${wrap};
  `,
);
