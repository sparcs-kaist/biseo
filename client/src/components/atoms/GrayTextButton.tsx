import styled from "@emotion/styled";

export const GrayTextButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.colors.gray400};
  font-size: 9px;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
