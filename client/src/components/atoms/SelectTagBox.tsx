import React from "react";
import {
  PositionedDownArrowIcon,
  SelectWrapper,
  TagSelect,
} from "@/components/atoms";
import { useUserTag } from "@/services/user-tag";

interface Props {
  selected: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const SelectTagBox: React.FC<Props> = ({ selected, onChange }) => {
  const { tags } = useUserTag(state => ({
    tags: state.userTags,
  }));

  return (
    <>
      <SelectWrapper>
        <TagSelect onChange={onChange}>
          <option value="" selected disabled>
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