import { css } from "@emotion/react";
import { mapColors } from "@biseo/web/styles/color";

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
  title1: style(18, 500),
  title2: style(15, 500),
  title3: style(14, 500),
  subtitle: style(13, 500),
  body: style(14, 500),
  option1: style(12, 500),
  option2: style(11, 500),
  boldtitle1: style(20, 700),
  boldtitle2: style(18, 700),
  boldtitle3: style(14, 700),
  boldtitle4: style(13, 700),
} as const;
