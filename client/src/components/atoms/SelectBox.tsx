import React from "react";
import {
  PositionedDownArrowIcon,
  Select,
  SelectWrapper,
} from "@/components/atoms";

interface Props {
  width: number;
  height: number;
  onChange: (selectedValue: string) => void; // new prop
}

export const SelectBox: React.FC<Props> = ({ width, height, onChange }) => (
  <SelectWrapper>
    <Select w={width} h={height} onChange={e => onChange(e.target.value)}>
      <option value="" disabled selected hidden>
        전체보기
      </option>
      <option key="regular" value="regular">
        정회원
      </option>
      <option key="associate" value="associate">
        준회원
      </option>
      {/* Add more options later*/}
    </Select>
    <PositionedDownArrowIcon />
  </SelectWrapper>
);
