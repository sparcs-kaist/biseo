import styled from "@emotion/styled";

export const Select = styled.select<{ w: number; }>`
  width: ${props => props.w}px;
  height: 38px;
  padding: 0px 15px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.gray200};
  background-color: ${props => props.theme.colors.gray100};

  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  appearance: none;

`;
