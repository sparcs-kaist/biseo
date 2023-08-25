import React from "react";
import {
  PositionedDownArrowIcon,
  SelectWrapper,
  TagSelect,
} from "@/components/atoms";
import { useUserTagi } from "@/services/user-tag";

interface Props {
  selected: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const SelectTagBox: React.FC<Props> = ({ selected, onChange }) => {
  const { tags } = useUserTagi(state => ({
    tags: state.userTags,
  }));

  return (
    <>
      <SelectWrapper>
        <TagSelect defaultValue={[]} onChange={onChange}>
          <option value="" disabled>
            태그를 선택하세요
          </option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.title}>
              {tag.title}
            </option>
          ))}
        </TagSelect>
        <PositionedDownArrowIcon />
      </SelectWrapper>
      {selected.map(tag => (
        <>{tag}</>
      ))}
    </>
  );
};
