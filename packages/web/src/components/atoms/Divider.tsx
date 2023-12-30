import { colors } from "@biseo/web/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Divider = styled.hr<{
  dir?: "horizontal" | "vertical";
}>(
  ({ dir = "horizontal" }) => css`
    border: none;
    ${dir === "horizontal"
      ? css`
          width: 100%;
          border-bottom: 1px solid ${colors.gray300};
        `
      : css`
          height: 100%;
          border-right: 1px solid ${colors.gray300};
        `}
  `,
);
