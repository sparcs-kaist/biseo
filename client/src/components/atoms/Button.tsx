import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Button = styled.div<{
  w?: Size;
  h?: Size;
}>(
  ({ w = "fill", h = 30, theme }) => css`
    display: flex;
    width: ${size(w)};
    height: ${size(h)};
    padding: 0px 15px;
    border-radius: 5px;
    border: none;
    justify-content: center;
    align-items: center;
    line-height: 28px;
    background-color: ${theme.colors.blue200};
  `,
);

type Size = number | "hug" | "fill";
const size = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};
