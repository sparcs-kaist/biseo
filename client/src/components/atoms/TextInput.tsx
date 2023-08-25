import styled from "@emotion/styled";

export const TextInput = styled.input`
  width: 300px;
  height: 35px;
  padding: 0 15px;
  font-size: 11px;
  font-weight: 500;
  background: ${props => props.theme.colors.gray100};
  border: solid 1px ${props => props.theme.colors.gray200};
  border-radius: 5px;
`;
TextInput.defaultProps = {
  type: "text",
};
