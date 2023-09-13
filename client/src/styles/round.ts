import { css } from "@emotion/react";

/**
 * Applies border radius
 * @example
 * round.md  // Apply 5px radius
 * round.lg  // Apply 10px radius
 */
export const round = {
  md: css`
    border-radius: 5px;
  `,
  lg: css`
    border-radius: 10px;
  `,
  xl: css`
    border-radius: 15px;
  `,
} as const;
