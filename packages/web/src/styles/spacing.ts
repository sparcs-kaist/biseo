import { css } from "@emotion/react";

const style = (attribute: string) => (value: number) => css`
  ${attribute}: ${value}px;
`;

const applyPrefix = (prefix: "padding" | "margin") =>
  Object.assign(style(prefix), {
    top: style(`${prefix}-top`),
    bottom: style(`${prefix}-bottom`),
    left: style(`${prefix}-left`),
    right: style(`${prefix}-right`),
    vertical: style(`${prefix}-block`),
    horizontal: style(`${prefix}-inline`),
  });

/**
 * @example
 * padding(10)            // 10px padding for all sides
 * padding.top(5)         // 5px padding for top
 * padding.horizontal(8)  // 8px padding for left and right
 */
export const padding = applyPrefix("padding");

/**
 * @example
 * margin(10)            // 10px margin for all sides
 * margin.top(5)         // 5px margin for top
 * margin.horizontal(8)  // 8px margin for left and right
 */
export const margin = applyPrefix("margin");
