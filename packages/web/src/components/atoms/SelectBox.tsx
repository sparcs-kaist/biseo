import React, { type PropsWithChildren } from "react";
import { PositionedDownArrowIcon, Select, SelectWrapper } from "./Label";

interface SelectBoxProps {
  width: number;
  height: number;
  options: string[];
  onChange: (selectedValue: string) => void; // new prop
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  width,
  height,
  options,
  onChange,
}) => (
  <SelectWrapper>
    <Select
      w={width}
      h={height}
      onChange={e => onChange(e.target.value)}
      defaultValue=""
    >
      <option value="">전체 보기</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
    <PositionedDownArrowIcon />
  </SelectWrapper>
);

interface SelectTextProps extends PropsWithChildren {
  width: number;
  height: number;
  onChange: (selectedValue: string) => void; // new prop
}

export const SelectText: React.FC<SelectTextProps> = ({
  children = null,
  width,
  height,
  onChange,
}) => (
  <SelectWrapper>
    <Select
      w={width}
      h={height}
      onChange={e => onChange(e.target.value)}
      defaultValue=""
    >
      <option value="" disabled hidden>
        {children}
      </option>
    </Select>
    <PositionedDownArrowIcon />
  </SelectWrapper>
);
