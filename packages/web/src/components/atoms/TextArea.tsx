import styled from "@emotion/styled";
import TextareaAutosize from "react-textarea-autosize";
import { w, h, text, padding } from "@biseo/web/styles";

export const TextAreaFixedsize = styled.textarea`
  ${w("fill")}
  ${h("fill")}
  ${padding.vertical(10)}
  ${padding.horizontal(15)}
  resize: none;
  border: none;
  background: transparent;
  ${text.subtitle}
  ${text.gray600}
  ::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    ${text.gray300}
  }
`;

export const TextAreaAutosize = styled(TextareaAutosize)`
  ${w("fill")}
  max-height: 100%;
  outline: none;
  resize: none;
  border: none;
  background: transparent;
  ${text.body}
  ${text.gray600}
  ::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    ${text.gray300}
  }
`;
