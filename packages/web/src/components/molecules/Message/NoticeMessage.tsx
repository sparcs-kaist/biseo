import styled from "@emotion/styled";
import React from "react";
import { w, padding, text, center } from "@biseo/web/styles";

interface Props {
  message: string; // TODO: introduce Notice type
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 6px 15px;
  background-color: ${props => props.theme.colors.blue100};
  border: solid 1px ${props => props.theme.colors.blue600};
  border-radius: 10px;
`;

export const NoticeMessage: React.FC<Props> = ({ message }) => (
  <div css={[w("fill"), padding.horizontal(15), padding.vertical(10), center]}>
    <Container>
      <h4 css={text.subtitle}>📢</h4>
      <h4 css={[text.boldtitle4, text.blue600]}>{message}</h4>
    </Container>
  </div>
);
