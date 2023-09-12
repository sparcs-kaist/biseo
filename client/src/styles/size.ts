import { css } from "@emotion/react";

export type Size = number | "hug" | "fill";
const calcSize = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};

const applyAttribute = (attribute: "height" | "width") => (value: Size) => css`
  ${attribute}: ${calcSize(value)};
`;

/**
 * Applies height
 * @example
 * h(10)      // 10px height
 * h("fill")  // 100% height
 * h("hug")   // fit-content
 */
export const h = applyAttribute("height");

/**
 * Applies width
 * @example
 * w(10)      // 10px width
 * w("fill")  // 100% width
 * w("hug")   // fit-content
 */
export const w = applyAttribute("width");
