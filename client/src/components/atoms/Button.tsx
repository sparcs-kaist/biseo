import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Color } from "@/theme";

export const Button = styled.button<{
  w?: Size;
  h?: Size;
  color?: Color;
}>(
  ({ w = "fill", h = 28, color = "blue200", theme }) => css`
    display: flex;
    width: ${size(w)};
    height: ${size(h)};
    padding: 0px 15px;
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
      cursor: default;
    }
  `,
);

type Size = number | "hug" | "fill";
const size = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};
