import styled from "@emotion/styled";

export const CheckBox = styled.input`
  width: 9px;
  background: transparent;
  accent-color: ${props => props.theme.colors.gray600};
`;

CheckBox.defaultProps = { type: "checkbox" };
