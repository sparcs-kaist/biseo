import React from "react";
import styled from "@emotion/styled";
import { text } from "@biseo/web/styles";

interface Props {
  title: string;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: "100%";
  min-height: 42px;
  background-color: ${props => props.theme.colors.gray100};
  padding: 0 20px;
  justify-content: center;
`;

export const ChatHeader: React.FC<Props> = ({ title }) => (
  <Container>
    <h2 css={[text.title2, text.black]}>{title}</h2>
  </Container>
);
