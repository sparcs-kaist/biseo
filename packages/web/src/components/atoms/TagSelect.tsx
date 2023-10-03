import React from "react";
import { css } from "@emotion/react";
import { CloseSmallIcon } from "@biseo/web/assets";

import Select, { components } from "react-select";
import type {
  OptionProps,
  DropdownIndicatorProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
} from "react-select";

import {
  bg,
  border,
  round,
  center,
  column,
  row,
  justify,
  margin,
  padding,
  gap,
  text,
  w,
  h,
  align,
} from "@biseo/web/styles";

import { PositionedDownArrowIcon } from "./Label";
import { PresetOption } from "./PresetOption";

interface Props {
  tags: Tag[];
  onChange: (selection: string[]) => void;
}

interface Tag {
  id: number;
  title: string;
  description: string;
}

const cursorInitial = css`
  cursor: initial;
`;
const cursorPointer = css`
  cursor: pointer;
`;
const boxShadow = css`
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.06);
`;

const controlStyles = css([
  center,
  w(300),
  h(38),
  padding.horizontal(10),
  justify.between,
  border.gray200,
  round.md,
  bg.gray100,
  text.subtitle,
]);
const placeholderStyles = css([text.subtitle, text.gray300, padding.left(5)]);
const valueContainerStyles = css([row, gap(5)]);
const menuListStyles = css([
  column,
  gap(5),
  margin.top(5),
  padding(5),
  round.md,
  bg.white,
  boxShadow,
]);
const multiValueRemoveStyles = css(center);

const selectStyles = {
  control: () => ({ ...controlStyles }),
  placeholder: () => ({ ...placeholderStyles }),
  valueContainer: () => ({ ...valueContainerStyles }),
  menuList: () => ({ ...menuListStyles }),
  multiValueRemove: () => ({ ...multiValueRemoveStyles }),
};

const Option = (props: OptionProps<Tag>) => {
  const { data, isSelected } = props;
  return (
    <components.Option {...props}>
      <PresetOption tag={data} selected={isSelected} />
    </components.Option>
  );
};
const DropdownIndicator = (props: DropdownIndicatorProps<Tag>) => (
  <components.DropdownIndicator {...props}>
    <PositionedDownArrowIcon />
  </components.DropdownIndicator>
);
const MultiValueContainer = (props: MultiValueGenericProps<Tag>) => {
  const { data } = props;
  return (
    <components.MultiValueContainer {...props}>
      <div
        css={[
          row,
          align.center,
          border.gray200,
          round.md,
          bg.white,
          padding.horizontal(8),
          padding.vertical(5),
          gap(6),
          cursorInitial,
        ]}
      >
        <p css={[text.option1, text.gray500]}>{data.title}</p>
        <components.MultiValueRemove {...props} />
      </div>
    </components.MultiValueContainer>
  );
};
const MultiValueRemove = (props: MultiValueRemoveProps<Tag>) => (
  <components.MultiValueRemove {...props}>
    <CloseSmallIcon css={cursorPointer} />
  </components.MultiValueRemove>
);

export const TagSelect: React.FC<Props> = ({ tags, onChange }) => (
  <Select
    css={cursorPointer}
    styles={selectStyles}
    components={{
      Option,
      DropdownIndicator,
      IndicatorSeparator: () => null,
      MultiValueRemove,
      MultiValueLabel: () => null,
      MultiValueContainer,
    }}
    hideSelectedOptions={false}
    closeMenuOnSelect={false}
    isSearchable={false}
    isClearable={false}
    menuPortalTarget={document.body}
    unstyled
    // menuIsOpen
    options={tags}
    placeholder="태그를 선택하세요"
    onChange={selection => onChange(selection.map(t => t.title))}
    getOptionValue={tag => tag.id.toString()}
    isMulti
  />
);
