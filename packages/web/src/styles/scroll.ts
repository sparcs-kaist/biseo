import { css } from "@emotion/react";
import { colors } from "@biseo/web/styles/color";

export const scrollBar = css`
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.gray400};
  }
`;

const applyXDirection = css`
  width: 100%;

  overflow-x: scroll;
  overflow-y: hidden;

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

const applyYDirection = css`
  height: 100%;

  overflow-y: scroll;
  overflow-x: hidden;

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
  x: applyXDirection,
  y: applyYDirection,
} as const;
