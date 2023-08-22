import styled from "@emotion/styled";

export const UserTag = styled.div`
  display: flex;
  height: 18px;
  padding: 3px 6px;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  font-weight: 500;
  color: ${props => props.theme.colors.gray500};
  background-color: ${props => props.theme.colors.white};
  border: solid 1px ${props => props.theme.colors.gray200};
  border-radius: 5px;
`;
