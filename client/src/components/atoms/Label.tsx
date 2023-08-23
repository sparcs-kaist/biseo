import styled from "@emotion/styled";
import { DownArrowIcon } from "@/assets";
import downArrow from "../../assets/downarrow.svg";

export const Select = styled.select<{ w: number, h: number}>`
  width: ${props => props.w}px;
  height: ${props => props.h}px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.gray200};
  background-color: ${props => props.theme.colors.white};

  // Use the imported SVG as a background image
  background-image: url(${downArrow});
  background-repeat: no-repeat;
  background-position: right 10px center;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  appearance: none;
`;
