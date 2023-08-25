import styled from "@emotion/styled";
import TextareaAutosize from "react-textarea-autosize";

export const TextAreaFixedsize = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  resize: none;
  border: none;
  background: transparent;
  font-size: 11px;
  font-weight: 500;
  color: ${props => props.theme.colors.black};
  ::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    color: ${props => props.theme.colors.gray300};
  }
`;

// TODO: Apply text styles / Relates - #53
export const TextAreaAutosize = styled(TextareaAutosize)`
  width: 100%;
  outline: none;
  resize: none;
  border: none;
  background: transparent;
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.colors.black};
  ::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    color: ${props => props.theme.colors.gray300};
  }
`;
