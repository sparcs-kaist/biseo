import React from "react";

import { css } from "@emotion/react";
import { theme } from "@/theme";
import { SmallCloseIcon } from "@/assets";
import {
  PositionedDownArrowIcon,
  SelectWrapper,
  TagSelect,
  PresetOption,
  BorderedBox,
  Text,
  Box,
} from "@/components/atoms";
import { useUserTag } from "@/services/user-tag";

import Select, {
  components,
  OptionProps,
  DropdownIndicatorProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
} from "react-select";

interface Props {
  selected: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

interface Tag {
  id: number;
  title: string;
  description: string;
}

export const SelectTagBox: React.FC<Props> = ({ selected, onChange }) => {
  const { tags } = useUserTag(state => ({
    tags: state.userTags,
  }));

  const controlStyles = css`
    display: flex;
    width: 300px;
    height: 38px;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray200};
    background-color: ${theme.colors.gray100};

    font-family: "Noto Sansf KR";
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `;
  const optionStyles = css`
    gap: 5px;
  `;
  const placeholderStyles = css`
    color: ${theme.colors.gray300};
  `;
  const valueContainerStyles = css`
    display: flex;
    padding: 0px;
    gap: 5px;
  `;
  const menuListStyles = css`
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 5px;
  `;
  const multiValueStyles = css``;
  const multiValueRemoveStyles = css`
    display: flex;
  `;
  const Option = (props: OptionProps<Tag>) => {
    return (
      <components.Option {...props}>
        <PresetOption tag={props.data} selected={props.isSelected} />
      </components.Option>
    );
  };
  const DropdownIndicator = (props: DropdownIndicatorProps<Tag>) => {
    return (
      <components.DropdownIndicator {...props}>
        <PositionedDownArrowIcon />
      </components.DropdownIndicator>
    );
  };
  const MultiValueContainer = (props: MultiValueGenericProps<Tag>) => (
    <components.MultiValueContainer {...props}>
      <BorderedBox
        dir="row"
        round={5}
        borderSize={1}
        borderStyle="solid"
        borderColor="gray200"
        bg="white"
        align="center"
        gap={6}
        padHorizontal={8}
        padVertical={5}
      >
        <Text variant="option1" color="gray500">
          {props.data.title}
        </Text>
        <components.MultiValueRemove {...props} />
      </BorderedBox>
    </components.MultiValueContainer>
  );
  const MultiValueRemove = (props: MultiValueRemoveProps<Tag>) => (
    <components.MultiValueRemove {...props}>
      <SmallCloseIcon />
    </components.MultiValueRemove>
  );

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
          placeholder: base => ({
            ...base,
            ...placeholderStyles,
          }),
          valueContainer: base => ({
            ...base,
            ...valueContainerStyles,
          }),
          menuList: base => ({
            ...base,
            ...menuListStyles,
          }),
          multiValue: base => ({
            ...base,
            ...multiValueStyles,
          }),
          multiValueRemove: base => ({
            ...base,
            ...multiValueRemoveStyles,
          }),
        }}
        components={{
          Option,
          DropdownIndicator,
          IndicatorSeparator: () => null,
          // MultiValue,
          MultiValueRemove,
          MultiValueLabel: () => null,
          MultiValueContainer,
        }}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        isSearchable={false}
        isClearable={false}
        // menuIsOpen
        options={tags}
        placeholder="태그를 선택하세요"
        onChange={tags => console.log(tags)}
        getOptionValue={tag => tag.id.toString()}
        isMulti
      />
      {selected.map(tag => (
        <>{tag}</>
      ))}
    </>
  );
};
