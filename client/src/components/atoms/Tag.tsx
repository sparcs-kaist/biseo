import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { Color } from "@/theme";

export const Tag = styled.div<{
  public?: boolean;
  anonymous?: boolean;
  votable?: boolean;
  bg?: Color;
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
    public = false,
    anonymous,
    votable,
    bg,
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
  }) => css`
    background-color: ${bg ? theme.colors[bg] : "transparent"};
    border-radius: ${round}px;
    display: flex;
    align-items: ${align};
    justify-content: ${justify};
    padding-top: ${padTop}px;
    padding-bottom: ${padBottom}px;
    padding-left: ${padLeft}px;
    padding-right: ${padRight}px;
  `,
);
