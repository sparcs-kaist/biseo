import React from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/react";
import { theme } from "@/theme";
import type { Color } from "@/theme";
import { Select } from "./Label";

interface Props {
  width: number;
  selectedOption?: string;
  options: string[];
  setSelectedOption?: (value: string) => void;
}

export const SelectBox: React.FC<Props> = ({ width, selectedOption, options }) => (
    <Select w={width} value={selectedOption}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>

);
