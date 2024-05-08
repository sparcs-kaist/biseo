import React, { useState, type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import type { Choice } from "@biseo/interface/agenda";
import { SelectIcon } from "@biseo/web/assets";
import { type Color, theme } from "@biseo/web/theme";
import { center, h, w, text } from "@biseo/web/styles";

const Container = styled.div<{
  color: Color;
  clickable?: boolean;
}>`
  border-radius: 5px;
  background-color: ${props => props.theme.colors[props.color]};
  border: 1px solid ${props => props.theme.colors.gray200};
  padding: 6px 12px 6px 12px;
  width: 340px;
  height: fit-content;
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.clickable &&
    css`
      cursor: pointer;
    `}
`;

interface ChoiceTextProps extends PropsWithChildren {
  color: Color;
}

const ChoiceText: React.FC<ChoiceTextProps> = ({ color, children = null }) => {
  const wordBreakWrap = css`
    word-break: break-all;
    overflow-wrap: break-word;
  `;

  return <p css={[text.body, text[color], wordBreakWrap]}>{children}</p>;
};

const choiceBaseStyle = (
  containerColor: Color,
  selectIconColor: Color,
  textColor: Color,
) => ({ containerColor, selectIconColor, textColor });

const choiceStyles = {
  chosen: choiceBaseStyle("blue600", "blue600", "white"),
  hover: choiceBaseStyle("blue200", "blue600", "blue600"),
  notChosen: choiceBaseStyle("white", "gray500", "gray500"),
};

interface ChoiceBaseProps {
  variant: keyof typeof choiceStyles;
  choiceText: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ChoiceBase: React.FC<ChoiceBaseProps> = ({
  variant,
  choiceText,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  const choiceStyle = choiceStyles[variant];

  return (
    <Container
      color={choiceStyle.containerColor}
      onClick={onClick}
      clickable={!!onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div css={[w(13), h(13), center]}>
        <SelectIcon stroke={theme.colors[choiceStyle.selectIconColor]} />
      </div>
      <ChoiceText color={choiceStyle.textColor}>{choiceText}</ChoiceText>
    </Container>
  );
};

interface ChoiceProps {
  choice: Choice;
  chosen: boolean;
  onClick: () => void;
}

export const ChoiceComponent: React.FC<ChoiceProps> = ({
  choice,
  chosen,
  onClick,
}) => (
  <ChoiceBase
    variant={chosen ? "chosen" : "notChosen"}
    choiceText={choice.name}
    onClick={onClick}
  />
);

interface CompletedChoiceProps {
  choice?: Choice;
}

export const CompletedChoice: React.FC<CompletedChoiceProps> = ({
  choice = undefined,
}) => {
  const [hover, setHover] = useState(false);

  return hover ? (
    <ChoiceBase
      variant="hover"
      choiceText={choice?.name ?? ""}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  ) : (
    <ChoiceBase
      variant="chosen"
      choiceText="투표 완료"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export const NotVotableChoice: React.FC = () => (
  <ChoiceBase variant="notChosen" choiceText="투표 권한이 없습니다." />
);
