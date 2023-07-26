import React from "react";
import styled from "@emotion/styled";
import { Box, Text } from "../atoms";

interface Props {
  title: string;
}

const Container = styled.div`
  width: 100%;
  border-bottom: solid 1px ${props => props.theme.colors.gray200};
`;

export const ChatHeader: React.FC<Props> = ({ title }) => {
  return (
    <Container>
      <Box w="fill" h={42} bg="gray100" justify="center" padHorizontal={20}>
        <Text variant="title2">{title}</Text>
      </Box>
    </Container>
  );
};
