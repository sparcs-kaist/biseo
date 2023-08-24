import React from "react";
import {
  PositionedDownArrowIcon,
  SelectWrapper,
  TemplateSelect,
} from "@/components/atoms";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  width: number;
  height: number;
  onChange: (selectedValue: string) => void; // new prop
}

export const SelectTemplateBox: React.FC<Props> = ({
  children,
  width,
  height,
  onChange,
}) => (
  <SelectWrapper>
    <TemplateSelect
      w={width}
      h={height}
      onChange={e => onChange(e.target.value)}
      defaultValue=""
    >
      <option value="">{children}</option>
      {/* Add more options later*/}
    </TemplateSelect>
    <PositionedDownArrowIcon />
  </SelectWrapper>
);
