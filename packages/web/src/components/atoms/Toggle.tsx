import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Size = number | "hug" | "fill";
type Position = "left" | "middle" | "right";

const calcSize = (size: Size) => {
  if (size === "fill") return "fill";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};
const calcBorderRadius = (position: Position) => {
  if (position === "left") return "5px 0px 0px 5px";
  if (position === "middle") return "0px 0px 0px 0px";
  if (position === "right") return "0px 5px 5px 0px";
  return "0px 0px 0px 0px";
};
const calcBorderWidth = (position: Position, selected: boolean) => {
  const activeborder = selected ? 0 : 1;
  if (position === "left") return `1px ${activeborder}px 1px 1px`;
  if (position === "middle")
    return `1px ${activeborder}px 1px ${activeborder}px`;
  if (position === "right") return `1px 1px 1px ${activeborder}px`;
  return "0px 0px 0px 0px";
};

export const ToggleContainor = styled.div<{
  w?: Size;
  h?: Size;
}>(
  ({ w = "fill", h = 20 }) => css`
    display: flex;
    width: ${calcSize(w)};
    height: ${calcSize(h)};
    border: none;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  `,
);

export const ToggleButton = styled.div<{
  selected: boolean;
  position: Position;
}>(
  ({ selected, position, theme }) => css`
    display: flex;
    width: fill;
    height: 100%;
    border-style: solid;
    border-width: ${calcBorderWidth(position, selected)};
    border-radius: ${calcBorderRadius(position)};
    border-color: ${selected ? theme.colors.blue300 : theme.colors.gray300};
    justify-content: center;
    align-items: center;
    padding: 4px 5px 4px 5px;
    background-color: ${selected ? theme.colors.blue200 : theme.colors.white};
    transition-duration: 0.25s;
    transition-property: background-color;

    &:hover {
      cursor: ${selected ? "default" : "pointer"};
      background-color: ${theme.colors.blue200};
    }
  `,
);
