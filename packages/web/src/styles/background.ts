import { mapColors } from "@biseo/web/styles/color";
import { css } from "@emotion/react";

/**
 * Applies background-color
 * @example
 * bg.gray100  // Apply gray100 background-color
 */
export const bg = mapColors(
  color => css`
    background-color: ${color};
  `,
);
