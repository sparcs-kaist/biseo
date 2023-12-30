import { colors, text } from "@biseo/web/styles";
import styled from "@emotion/styled";
import React from "react";

interface Props {
  title: string;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: "100%";
  min-height: 42px;
  background-color: ${colors.gray100};
  padding: 0 20px;
  justify-content: center;
`;

export const ChatHeader: React.FC<Props> = ({ title }) => (
  <Container>
    <p css={[text.title2, text.black]}>{title}</p>
  </Container>
);
