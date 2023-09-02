import React from "react";
import styled from "@emotion/styled";
import { Box, Text } from "@/components/atoms";
import { Color } from "@/theme";

interface Props {
  total?: number;
  participant?: number;
}

const Background = styled.div<{
  percent: number;
  color: Color;
  borderColor: Color;
}>`
  width: 100%;
  height: 100%;

  border: 1px solid ${props => props.theme.colors[props.borderColor]};
  border-radius: 5px;

  background: linear-gradient(
    to right,
    ${props => props.theme.colors[props.color]} ${props => props.percent}%,
    #ffffff ${props => props.percent}%
  );
`;

export const ParticipantBar: React.FC<Props> = ({
  total = 0,
  participant = 0,
}) => (
  <Box w={300} h={59} gap={8} dir="column">
    <Box w={75} h={20} gap={8} dir="row" align="center">
      <Text variant="body" color="black">
        투표 참여
      </Text>
      <Box bg="blue200" round={5} align="center" justify="center" w={20} h={20}>
        <Text variant="boldtitle4" color="blue600">
          {participant}
        </Text>
      </Box>
    </Box>
    <Box w={300} h={30}>
      <Background
        percent={total ? (participant / total) * 100 : 0}
        color="blue300"
        borderColor="gray200"
      >
        <Box
          w="fill"
          h="fill"
          dir="row"
          align="center"
          justify="space-between"
          padHorizontal={13}
          padVertical={6}
        >
          <Text color="black" variant="option1">
            {total ? ((participant * 100) / total).toFixed(1) : 0}%
          </Text>
          <Text color="black" variant="option1">
            {participant}/{total}
          </Text>
        </Box>
      </Background>
    </Box>
  </Box>
);
