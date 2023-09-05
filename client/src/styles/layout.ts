import { css } from "@emotion/react";

export const column = css`
  display: flex;
  flex-direction: column;
`;

export const row = css`
  display: flex;
  flex-direction: row;
`;

/**
 * Applies flexbox with column direction
 * @example
 * gap(10) // Apply 10px gap
 */
export const gap = (value: number) => css`
  gap: ${value}px;
`;
