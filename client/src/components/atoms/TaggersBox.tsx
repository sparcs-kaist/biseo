import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { Color } from "@/theme";

export const TaggersBox = styled.div<{
  w?: number;
  h?: number;
  justify?: "center" | "flex-start" | "flex-end" | "stretch" | "space-between";
  position?: "static" | "absolute";
  self?: "auto" | "stretch";
}>(
  ({
    w = 300,
    h = 73,
    justify = "start",
    position = "static",
    self = "auto",
  }) => css`
    width: ${w}px;
    height: ${h}px;
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
    align-self: ${self};
    flex-wrap: wrap;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
);
