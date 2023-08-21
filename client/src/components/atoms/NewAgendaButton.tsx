import styled from "@emotion/styled";

export const NewAgendaButton = styled.div`
  width: 100%;
  height: 40px;
  padding: 0px 15px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.gray300};
  color: ${props => props.theme.colors.gray300};
  text-align: center;
  line-height: 40px;
  background-color: white;
`;
