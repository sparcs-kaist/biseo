import { css } from "@emotion/react";
import { mapColors } from "@biseo/web/styles/color";

/**
 * Applies border
 * @example
 * border.gray300              // Apply gray300 border
 * [border.gray300, round.md]  // Usage with `round` mixin
 */
export const border = mapColors(
  color => css`
    border: 1px solid ${color};
  `,
);
