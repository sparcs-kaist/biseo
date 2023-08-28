import React from "react";

import { css } from "@emotion/react";
import { theme } from "@/theme";

import { useUserTag } from "@/services/user-tag";
import { PositionedDownArrowIcon, SelectWrapper, TagSelect } from "./Label";

import Select from "react-select";

interface Props {
  selected: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const SelectTagBox: React.FC<Props> = ({ selected, onChange }) => {
  const { tags } = useUserTag(state => ({
    tags: state.userTags,
  }));

  const tags_1 = ["test1", "test2", "test3"];

  const controlStyles = css`
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray200};
    background-color: ${theme.colors.white};

    font-family: "Noto Sansf KR";
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${theme.colors.gray600};
  `;
  const optionStyles = css`
    border: 1px dotted ${theme.colors.black};
    color: "black";
    height: 18px;
  `;
  return (
    <>
      <Select
        styles={{
          control: base => ({
            ...base,
            ...controlStyles,
          }),
          option: base => ({
            ...base,
            ...optionStyles,
          }),
        }}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        // menuIsOpen
        options={[
          { value: "one", label: "One" },
          { value: "two", label: "Two" },
        ]}
        placeholder="태그를 선택하세요"
        isMulti
      />
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
