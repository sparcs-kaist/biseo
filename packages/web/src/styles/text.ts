import { mapColors } from "@biseo/web/styles/color";
import { css } from "@emotion/react";

const singleLine = css`
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const multiLine = css`
  white-space: pre-line;
  word-break: break-all;
  overflow-wrap: break-word;
`;

const style = (size: number, weight: number) => css`
  font-size: ${size}px;
  font-weight: ${weight};
`;

/**
 * Applies typography styles and text color
 * @example
 * text.title1   // Apply title1 typography
 * text.gray300  // Apply gray300 text color
 */
export const text = {
  ...mapColors(
    color => css`
      color: ${color};
    `,
  ),
  title1: style(15, 500),
  title2: style(14, 500),
  title3: style(13, 500),
  subtitle: style(11, 500),
  body: style(12, 500),
  option1: style(10, 500),
  option2: style(9, 500),
  boldtitle1: style(14, 700),
  boldtitle2: style(13, 700),
  boldtitle3: style(12, 700),
  boldtitle4: style(11, 700),
  singleLine,
  multiLine,
} as const;
