import styled from "@emotion/styled";
import { DownArrowIcon } from "@/assets";
import { w, padding, bg, border, justify, align, round, text } from "@/styles";

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Select = styled.select`
  ${padding.vertical(0)}
  ${padding.horizontal(10)}
  ${justify.between}
  ${align.center}
  ${round.md}
  ${border.gray200}
  ${bg.white}

  ${text.option1}
  ${text.gray600}
  font-family: "Noto Sansf KR";
  font-style: normal;
  line-height: normal;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  appearance: none;
`;

export const PositionedDownArrowIcon = styled(DownArrowIcon)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
`;

export const TemplateSelect = styled.select`
  ${padding.vertical(0)}
  ${padding.horizontal(15)}
  ${justify.between}
  ${align.center}
  ${round.md}
  ${border.gray200}
  ${bg.gray100}

  ${text.gray300};
  ${text.subtitle}
  font-family: "Noto Sansf KR";
  font-style: normal;
  line-height: normal;

  &:hover {
    cursor: pointer;
  }

  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  appearance: none;
`;

export const TagSelect = styled.select`
  ${w(300)}
  ${padding(5)}
  ${justify.between}
  ${align.center}
  ${round.md}
  ${border.gray200}

  border: 0;
  ${round.md}
  ${bg.white};

  ${text.gray600};
  ${text.subtitle}
  font-family: "Noto Sansf KR";
  font-style: normal;
  line-height: normal;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  -ms-appearance: none;
  appearance: none;
`;
TagSelect.defaultProps = {
  multiple: true,
};
