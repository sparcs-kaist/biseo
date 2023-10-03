import { css } from "@emotion/react";

export const column = css`
  display: flex;
  flex-direction: column;
`;

export const row = css`
  display: flex;
  flex-direction: row;
`;

export const center = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const justify = {
  start: css`
    justify-content: flex-start;
  `,
  center: css`
    justify-content: center;
  `,
  end: css`
    justify-content: flex-end;
  `,
  between: css`
    justify-content: space-between;
  `,
  around: css`
    justify-content: space-around;
  `,
} as const;

export const align = {
  start: css`
    align-items: flex-start;
  `,
  center: css`
    align-items: center;
  `,
  end: css`
    align-items: flex-end;
  `,
  stretch: css`
    align-items: stretch;
  `,
} as const;

/**
 * Applies flexbox with column direction
 * @example
 * gap(10) // Apply 10px gap
 */
export const gap = (value: number) => css`
  gap: ${value}px;
`;
