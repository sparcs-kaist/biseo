import React from "react";
import { Color, theme } from "@/theme";
import styled from "@emotion/styled";
import type { Choice } from "biseo-interface/agenda";
import { Text } from "@/components/atoms";
import { SelectIcon } from "@/assets";
import { PropsWithChildren } from "react";

const Container = styled.div<{
  color: Color;
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
`;

interface ChoiceTextProps extends PropsWithChildren {
  color: Color;
}

const ChoiceText: React.FC<ChoiceTextProps> = ({ color, children }) => {
  return (
    <Text variant="body" color={color}>
      {children}
    </Text>
  );
};

interface ChoiceBaseProps {
  chosen: boolean;
  text: string;
  onClick?: () => void;
}

const ChoiceBase: React.FC<ChoiceBaseProps> = ({ chosen, text, onClick }) => {
  const containerColor = chosen ? "blue600" : "white";
  const selectIconColor = chosen ? theme.colors.blue600 : theme.colors.gray500;
  const textColor = chosen ? "white" : "gray500";

  return (
    <Container color={containerColor} onClick={onClick}>
      <SelectIcon stroke={selectIconColor} />
      <ChoiceText color={textColor}>{text}</ChoiceText>
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
}) => <ChoiceBase chosen={chosen} text={choice.name} onClick={onClick} />;

export const CompletedChoice: React.FC = () => (
  <ChoiceBase chosen={true} text="투표 완료" />
);

export const NotVotableChoice: React.FC = () => (
  <ChoiceBase chosen={false} text="투표 권한이 없습니다." />
);
