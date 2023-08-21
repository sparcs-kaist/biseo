import styled from "@emotion/styled";
import React from "react";
import { Box, Text } from "@/components/atoms";

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
  <Box w="fill" padHorizontal={15} padVertical={10} align="center">
    <Container>
      <Text variant="subtitle">📢</Text>
      <Text variant="boldtitle4" color="blue600">
        {message}
      </Text>
    </Container>
  </Box>
);
