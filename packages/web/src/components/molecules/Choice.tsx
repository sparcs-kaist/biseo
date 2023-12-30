import type { Choice } from "@biseo/interface/agenda";
import { SelectIcon } from "@biseo/web/assets";
import type { ColorKeys } from "@biseo/web/styles";
import { center, colors, h, text as styleText, w } from "@biseo/web/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState, type PropsWithChildren } from "react";

const Container = styled.div<{
  color: ColorKeys;
  clickable?: boolean;
}>`
  border-radius: 5px;
  background-color: ${props => colors[props.color]};
  border: 1px solid ${colors.gray200};
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
  color: ColorKeys;
}

const ChoiceText: React.FC<ChoiceTextProps> = ({ color, children = null }) => (
  <p css={[styleText.body, styleText[color]]}>{children}</p>
);

const choiceBaseStyle = (
  containerColor: ColorKeys,
  selectIconColor: ColorKeys,
  textColor: ColorKeys,
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
      <div css={[w(13), h(13), center]}>
        <SelectIcon stroke={colors[choiceStyle.selectIconColor]} />
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
