import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { theme } from "@/theme";

export const Card = styled.div<{
  primary?: boolean;
  bold?: boolean;
  clickable?: boolean;
  small?: boolean;
  round?: number;
  align?: "center" | "start" | "end";
  justify?: "center" | "start" | "end" | "space-between";
  height?: number;
}>(
  ({
    primary,
    bold,
    clickable,
    small,
    round = 5,
    align = "start",
    justify = "start",
  }) => css`
    border-radius: ${round}px;
    background-color: ${primary ? theme.colors.blue100 : theme.colors.white};
    border: 1px solid
      ${(() => {
        if (bold) return primary ? theme.colors.blue600 : theme.colors.gray500;
        return primary ? theme.colors.blue300 : theme.colors.gray300;
      })()};
    padding: ${small ? `12px 15px` : `18px 20px`};
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: ${align};
    justify-content: ${justify};

    ${clickable &&
    css`
      cursor: pointer;

      &:hover {
        background-color: ${theme.colors.blue100};
      }
    `}
  `,
);
