import { colors } from "@biseo/web/styles";
import styled from "@emotion/styled";

export const CheckBox = styled.input`
  width: 9px;
  background: transparent;
  accent-color: ${colors.gray600};
`;

CheckBox.defaultProps = { type: "checkbox" };
