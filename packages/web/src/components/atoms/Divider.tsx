import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { Color } from "@biseo/web/theme";

export const Divider = styled.hr<{
  dir?: "horizontal" | "vertical";
  color?: Color;
}>(
  ({ dir = "horizontal", color = "gray300", theme }) => css`
    border: none;
    ${dir === "horizontal"
      ? css`
          width: 100%;
          height: 1px;
          border: none;
          background-color: ${theme.colors[color]};
        `
      : css`
          width: 1px;
          height: 100%;
          border: none;
          background-color: ${theme.colors[color]};
        `}
  `,
);
