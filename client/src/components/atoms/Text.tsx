import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { Color } from "@/theme";

const typography = (size: number, weight: number) => css`
  font-size: ${size}px;
  font-weight: ${weight};
`;

const textStyles = {
  title1: typography(15, 500),
  title2: typography(14, 500),
  title3: typography(13, 500),
  subtitle: typography(11, 500),
  body: typography(12, 500),
  option1: typography(10, 500),
  option2: typography(9, 500),
  boldtitle1: typography(14, 700),
  boldtitle2: typography(13, 700),
  boldtitle3: typography(12, 700),
  boldtitle4: typography(11, 700),
} as const;

type Variants = keyof typeof textStyles;

export const Text = styled.p<{
  variant?: Variants;
  color?: Color;
  position?: "absolute" | "static";
}>(({ variant = "body", color = "black", theme, position = "static" }) => [
  css({
    color: theme.colors[color],
    position,
    whiteSpace: "pre-line",
  }),
  textStyles[variant],
]);
