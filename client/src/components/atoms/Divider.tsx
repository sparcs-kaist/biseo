import styled from "@emotion/styled";

export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.gray300};
`;
