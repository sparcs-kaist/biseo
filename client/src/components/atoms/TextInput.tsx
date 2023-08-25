import styled from "@emotion/styled";

export const TextInput = styled.input`
  padding: 0 15px;
  font-size: 11px;
  font-weight: 500;
  background: transparent;
  border: none;
  border-radius: 5px;
  color: ${props => props.theme.colors.black};
  ::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    color: ${props => props.theme.colors.gray300};
  }
`;
TextInput.defaultProps = {
  type: "text",
};
