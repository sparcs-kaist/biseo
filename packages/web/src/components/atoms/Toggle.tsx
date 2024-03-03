import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Size = number | "hug" | "fill";

const calcSize = (size: Size) => {
  if (size === "fill") return "fill";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};

export const ToggleContainor = styled.div<{
  w?: Size;
  h?: Size;
}>(
  ({ w = "fill", h = 20 }) => css`
    display: flex;
    width: ${calcSize(w)};
    height: ${calcSize(h)};
    border-radius: 5px;
    border: none;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  `,
);

export const ToggleButton = styled.div<{
  selected: boolean;
  isLeft: boolean;
}>(
  ({ selected, isLeft = true, theme }) => css`
    display: flex;
    width: fill;
    height: 100%;
    padding: 0px;
    border-style: solid;
    border-width: 1px;
    border-radius: ${isLeft ? "5px 0px 0px 5px" : "0px 5px 5px 0px"};
    border-color: ${selected ? theme.colors.blue300 : theme.colors.gray400};
    justify-content: center;
    align-items: center;
    line-height: 28px;
    padding: 4px 6px 4px 6px;
    background-color: ${selected ? theme.colors.blue200 : theme.colors.white};
    transition-duration: 0.25s;
    transition-property: background-color;

    &:hover {
      background-color: ${theme.colors.blue200};
    }
  `,
);
