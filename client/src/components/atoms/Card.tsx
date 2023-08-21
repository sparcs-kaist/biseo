import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Card = styled.div<{
  primary?: boolean;
  bold?: boolean;
  clickable?: boolean;
  round?: number;
}>`
  border-radius: ${props => props.round || 10}px;
  background-color: ${props =>
    props.primary ? props.theme.colors.blue100 : props.theme.colors.white};
  ${props =>
    props.bold
      ? `border: 1px solid ${
          props.primary
            ? props.theme.colors.blue600
            : props.theme.colors.gray500
        };`
      : `border: 1px solid ${
          props.primary
            ? props.theme.colors.blue300
            : props.theme.colors.gray300
        };
  `}
  padding: 18px 20px;
  width: 100%;

  ${props =>
    props.clickable &&
    css`
      cursor: pointer;

      &:hover {
        background-color: ${props.theme.colors.blue100};
      }
    `}
`;
