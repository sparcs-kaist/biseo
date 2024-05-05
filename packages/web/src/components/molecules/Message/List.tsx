import styled from "@emotion/styled";
import { scroll, scrollBar } from "@biseo/web/styles";

export const List = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  background: ${({ theme }) => theme.colors.white};
  ${scroll.y}
  ${scrollBar}
`;
