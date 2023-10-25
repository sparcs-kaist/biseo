import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { Color } from "@biseo/web/theme";

type Size = number | "hug" | "fill";
const calcSize = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};

export const Button = styled.button<{
  w?: Size;
  h?: Size;
  color?: Color;
  padHorizontal?: number;
}>(
  ({ w = "fill", h = 28, color = "blue200", padHorizontal = 0, theme }) => css`
    display: flex;
    width: ${calcSize(w)};
    height: ${calcSize(h)};
    padding: 0px ${padHorizontal}px;
    border-radius: 5px;
    border: none;
    justify-content: center;
    align-items: center;
    line-height: 28px;
    background-color: ${theme.colors[color]};

    &:hover {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed;
    }
  `,
);

export const Clickable = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
