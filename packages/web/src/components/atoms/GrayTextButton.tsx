import { colors } from "@biseo/web/styles";
import styled from "@emotion/styled";

export const GrayTextButton = styled.button`
  background-color: transparent;
  color: ${colors.gray400};
  font-size: 9px;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
