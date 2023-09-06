import { css } from "@emotion/react";

const applyAttribute = (attribute: "height" | "width") =>
  Object.assign(
    (value: number) => css`
      ${attribute}: ${value}px;
    `,
    {
      fill: css`
        ${attribute}: 100%;
      `,
    },
  );

/**
 * Applies height
 * @example
 * h(10)   // 10px height
 * h.fill  // 100% height
 */
export const h = applyAttribute("height");

/**
 * Applies width
 * @example
 * w(10)   // 10px width
 * w.fill  // 100% width
 */
export const w = applyAttribute("width");
