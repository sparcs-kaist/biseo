import React, { useState, type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import type { Choice } from "@biseo/interface/agenda";
import { Text } from "@biseo/web/components/atoms";
import { SelectIcon } from "@biseo/web/assets";
import { type Color, theme } from "@biseo/web/theme";
import { center, h, w } from "@biseo/web/styles";

const Container = styled.div<{
  containerColor: Color;
  borderColor: Color;
  clickable?: boolean;
}>`
  border-radius: 5px;
  background-color: ${props => props.theme.colors[props.containerColor]};
  border: 1px solid ${props => props.theme.colors[props.borderColor]};
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

const ChoiceText: React.FC<ChoiceTextProps> = ({ color, children = null }) => (
  <Text
    variant="body"
    color={color}
    style={{
      wordBreak: "break-all",
      overflowWrap: "break-word",
    }}
  >
    {children}
  </Text>
);

const choiceBaseStyle = (
  containerColor: Color,
  borderColor: Color,
  selectIconStrokeColor: Color,
  selectIconFillColor: Color,
  textColor: Color,
) => ({
  containerColor,
  borderColor,
  selectIconStrokeColor,
  selectIconFillColor,
  textColor,
});

const choiceStyles = {
  chosen: choiceBaseStyle("blue600", "blue600", "blue600", "white", "white"),
  hover: choiceBaseStyle("blue200", "blue200", "blue600", "blue200", "blue600"),
  notChosen: choiceBaseStyle("white", "gray200", "gray500", "white", "gray500"),
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
      containerColor={choiceStyle.containerColor}
      borderColor={choiceStyle.borderColor}
      onClick={onClick}
      clickable={!!onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div css={[w(13), h(13), center]}>
        <SelectIcon
          stroke={theme.colors[choiceStyle.selectIconStrokeColor]}
          fill={theme.colors[choiceStyle.selectIconFillColor]}
        />
      </div>
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
