import React, { useState, type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import type { Choice } from "@biseo/interface/agenda";
import { Text } from "@/components/atoms";
import { SelectIcon } from "@/assets";
import { type Color, theme } from "@/theme";

const Container = styled.div<{
  color: Color;
  clickable?: boolean;
}>`
  border-radius: 5px;
  background-color: ${props => props.theme.colors[props.color]};
  border: 1px solid ${props => props.theme.colors.gray200};
  padding: 6px 13px 6px 13px;
  width: 340px;
  height: 30px;
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

const ChoiceText: React.FC<ChoiceTextProps> = ({ color, children = null }) => (
  <Text variant="body" color={color}>
    {children}
  </Text>
);

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
  text: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ChoiceBase: React.FC<ChoiceBaseProps> = ({
  variant,
  text,
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
      <SelectIcon stroke={theme.colors[choiceStyle.selectIconColor]} />
      <ChoiceText color={choiceStyle.textColor}>{text}</ChoiceText>
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
    text={choice.name}
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
      text={choice?.name ?? ""}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  ) : (
    <ChoiceBase
      variant="chosen"
      text="투표 완료"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export const NotVotableChoice: React.FC = () => (
  <ChoiceBase variant="notChosen" text="투표 권한이 없습니다." />
);
