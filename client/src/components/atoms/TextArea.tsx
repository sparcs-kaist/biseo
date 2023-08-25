import styled from "@emotion/styled";
import TextareaAutosize from "react-textarea-autosize";

// TODO: Apply text styles / Relates - #53
export const TextArea = styled(TextareaAutosize)`
  width: 100%;
  outline: none;
  resize: none;
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.gray600};
  ::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    color: ${props => props.theme.colors.gray300};
  }
`;
