import React from "react";
import { css } from "@emotion/react";
import { theme } from "@/theme";
import { SmallCloseIcon } from "@/assets";
import {
  PositionedDownArrowIcon,
  PresetOption,
  BorderedBox,
  Text,
} from "@/components/atoms";

import Select, {
  components,
  OptionProps,
  DropdownIndicatorProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
} from "react-select";

interface Props {
  tags: Tag[];
}

interface Tag {
  id: number;
  title: string;
  description: string;
}

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
  margin-top: 5px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  background-color: white;
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

export const TagSelect_temp: React.FC<Props> = ({ tags }) => (
  <Select
    styles={{
      control: () => ({
        ...controlStyles,
      }),
      option: () => ({
        ...optionStyles,
      }),
      placeholder: () => ({
        ...placeholderStyles,
      }),
      valueContainer: () => ({
        ...valueContainerStyles,
      }),
      menuList: () => ({
        ...menuListStyles,
      }),
      multiValue: () => ({
        ...multiValueStyles,
      }),
      multiValueRemove: () => ({
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
    unstyled
    options={tags}
    placeholder="태그를 선택하세요"
    onChange={tags => console.log(tags)}
    getOptionValue={tag => tag.id.toString()}
    isMulti
  />
);
