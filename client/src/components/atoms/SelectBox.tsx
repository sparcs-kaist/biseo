import React from "react";
import {
  PositionedDownArrowIcon,
  Select,
  SelectWrapper,
} from "@/components/atoms";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  width: number;
  height: number;
  options: string[];
  onChange: (selectedValue: string) => void; // new prop
}

export const SelectBox: React.FC<Props> = ({
  width,
  height,
  options,
  onChange,
}) => (
  <SelectWrapper>
    <Select w={width} h={height} onChange={e => onChange(e.target.value)}>
      <option value="" selected>
        전체보기
      </option>
      {options.map((option, id) => (
        <option key={id} value={option}>
          {option}
        </option>
      ))}
    </Select>
    <PositionedDownArrowIcon />
  </SelectWrapper>
);

export const SelectText: React.FC<Props> = ({
  children,
  width,
  height,
  onChange,
}) => (
  <SelectWrapper>
    <Select w={width} h={height} onChange={e => onChange(e.target.value)}>
      <option value="" disabled selected hidden>
        {children}
      </option>
    </Select>
    <PositionedDownArrowIcon />
  </SelectWrapper>
);
