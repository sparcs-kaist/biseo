import React from "react";
import { Select, Text } from "@/components/atoms";

interface Props {
  width: number;
  height: number;
  onChange: (selectedValue: string) => void; // new prop
}

export const SelectBox: React.FC<Props> = ({ width, height, onChange }) => (
  <Select w={width} h={height} onChange={e => onChange(e.target.value)}>
    <option key="regular" value="regular">
      <Text variant="option2" color="gray600">
        정회원
      </Text>
    </option>
    <option key="associate" value="associate">
      <Text variant="option2" color="gray600">
        준회원
      </Text>
    </option>
    {/* Add more options later*/}
  </Select>
);
