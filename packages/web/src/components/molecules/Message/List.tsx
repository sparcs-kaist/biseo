import { Scroll } from "@biseo/web/components/atoms";
import { colors } from "@biseo/web/styles";
import styled from "@emotion/styled";

export const List = styled(Scroll)`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  background: ${colors.white};
`;
