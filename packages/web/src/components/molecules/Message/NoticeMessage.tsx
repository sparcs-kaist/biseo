import { Box } from "@biseo/web/components/atoms";
import { colors, text } from "@biseo/web/styles";
import styled from "@emotion/styled";
import React from "react";

interface Props {
  message: string; // TODO: introduce Notice type
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 6px 15px;
  background-color: ${colors.blue100};
  border: solid 1px ${colors.blue600};
  border-radius: 10px;
`;

export const NoticeMessage: React.FC<Props> = ({ message }) => (
  <Box w="fill" padHorizontal={15} padVertical={10} align="center">
    <Container>
      <p css={[text.subtitle, text.black]}>📢</p>
      <p css={[text.boldtitle4, text.blue600]}>{message}</p>
    </Container>
  </Box>
);
