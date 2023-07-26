import React from "react";
import styled from "@emotion/styled";
import { Text } from "../atoms";

interface Props {
  title: string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 42px;
  background-color: ${props => props.theme.colors.gray100};
  align-items: center;
  padding: 0 20px;
  border-bottom: solid 1px ${props => props.theme.colors.gray200};
`;

export const ChatHeader: React.FC<Props> = ({ title }) => {
  return (
    <Container>
      <Text variant="title2">{title}</Text>
    </Container>
  );
};
