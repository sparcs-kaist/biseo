import { colors } from "@biseo/web/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

type Size = number | "hug" | "fill";
const calcSize = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};

export const Cell = styled.td<{ w?: Size; scroll?: boolean }>(
  ({ w = "fill" }) => css`
    position: relative;
    display: flex;
    gap: 5px;
    min-width: ${calcSize(w)};
    align-items: flex-start;
    padding: 6px 5px;
    font-size: 10px;
    font-weight: 500;
  `,
);

export const Header = styled.thead`
  width: 100%;
  text-align: left;
  background-color: ${colors.gray100};

  > * tr {
    color: ${colors.gray500};
  
`;

export const Body = styled.tbody`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};

  > * tr {
    color: ${colors.gray600};
  }
`;

export const Row = styled.tr<{ selected?: boolean }>`
  position: relative;
  display: flex;
  height: 32px;
  align-items: center;
  gap: 5px;
  background-color: ${props =>
    props.selected ? colors.blue100 : "transparent"};
  border-bottom: solid 1px ${colors.gray200};
  padding: 0 5px;
`;

export const Table = styled.table<{ w?: Size; h?: Size }>(
  ({ w = "hug", h = "hug" }) => css`
    width: ${calcSize(w)};
    height: ${calcSize(h)};
    border: solid 1px ${colors.gray200};
    border-radius: 5px;
    border-spacing: 0;
    overflow: hidden;
  `,
);
