import styled from "@emotion/styled";
import { DownArrowIcon } from "@/assets";
import { text } from "@/styles";

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Select = styled.select<{ w: number; h: number }>`
  width: ${props => props.w}px;
  height: ${props => props.h}px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.gray200};
  background-color: ${props => props.theme.colors.white};

  font-family: "Noto Sansf KR";
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${props => props.theme.colors.gray600};

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

export const PositionedDownArrowIcon = styled(DownArrowIcon)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const TemplateSelect = styled.select<{ w: number; h: number }>`
  width: ${props => props.w}px;
  height: ${props => props.h}px;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.gray200};
  background-color: ${props => props.theme.colors.gray100};

  color: ${props => props.theme.colors.gray300};

  ${text.subtitle}

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
