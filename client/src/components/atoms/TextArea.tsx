import styled from "@emotion/styled";
import { Text } from "@/components/atoms";

// TODO: max char limit, emoticon and hyperlink
export const TextArea = styled(Text)`
  width: 100%;
  outline: none;
`;

TextArea.defaultProps = { contentEditable: true };
