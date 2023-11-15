import styled from "@emotion/styled";

export const CheckBox = styled.input`
  width: 9px;
  background: transparent;
  accent-color: ${props => props.colors.gray600};
`;

CheckBox.defaultProps = { type: "checkbox" };
