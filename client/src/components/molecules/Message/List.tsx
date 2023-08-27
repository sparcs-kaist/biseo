import styled from "@emotion/styled";
import { Scroll } from "@/components/atoms";

export const List = styled(Scroll)`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  background: ${({ theme }) => theme.colors.white};
`;
