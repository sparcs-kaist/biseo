import styled from "@emotion/styled";

export const Choice = styled.div<{
  chosen?: boolean;
}>`
  border-radius: 5px;
  background-color: ${props =>
    props.chosen ? props.theme.colors.blue600 : props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray200};
  padding: 6px 13px 6px 13px;
  width: 340px;
  height: 30px;
  gap: 10px;
`;
