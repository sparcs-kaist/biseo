import styled from "@emotion/styled";

export const Button = styled.div`
  width: 90px;
  height: 28px;
  border-radius: 5px;
  border: none;
  text-align: center;
  line-height: 28px;
  background-color: ${props => props.theme.colors.blue200};
`;
