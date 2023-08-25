import styled from "@emotion/styled";

export const TextInput = styled.input`
  width: 300px;
  height: 35px;
  padding: 0 15px;
  font-size: 11px;
  font-weight: 500;
  background: transparent;
  border: none;
  border-radius: 5px;
`;
TextInput.defaultProps = {
  type: "text",
};
