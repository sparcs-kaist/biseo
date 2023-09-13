import { css } from "@emotion/react";
import { colors } from "@/styles/color";

export const scrollBar = css`
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.gray400};
  }
`;

const applyDirection = (direction: "x" | "y") => css`
  overflow-${direction}: auto;

  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    background-clip: padding-box;

    border-radius: 100px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const scroll = {
  x: applyDirection("x"),
  y: applyDirection("y"),
} as const;
