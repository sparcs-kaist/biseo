import styled from "@emotion/styled";
import { css } from "@emotion/react";

type Size = number | "hug" | "fill";
const calcSize = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};

export const TaggersBox = styled.div<{
  w?: Size;
  h?: Size;
  justify?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between";
  position?: "static" | "absolute";
}>(
  ({ w = "hug", h = "hug", justify = "start", position = "static" }) => css`
    width: ${calcSize(w)};
    height: ${calcSize(h)};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: ${justify};
    gap: 8px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
    z-index: 0;
    position: ${position};
    align-self: auto;
    flex-wrap: wrap;
  `,
);
