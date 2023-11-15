import { Box } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";
import type { Color } from "@biseo/web/theme";
import styled from "@emotion/styled";
import React from "react";

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

  border: 1px solid ${props => props.colors[props.borderColor]};
  border-radius: 5px;

  background: linear-gradient(
    to right,
    ${props => props.colors[props.color]} ${props => props.percent}%,
    #ffffff ${props => props.percent}%
  );
`;

export const ParticipantBar: React.FC<Props> = ({
  total = 0,
  participant = 0,
}) => (
  <Box w={300} h={59} gap={8} dir="column">
    <Box w={75} h={20} gap={8} dir="row" align="center">
      <p css={[text.body, text.black]}>투표 참여</p>
      <Box bg="blue200" round={5} align="center" justify="center" w={20} h={20}>
        <p css={[text.boldtitle4, text.blue600]}>{participant}</p>
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
          <p css={[text.option1, text.black]}>
            {total ? ((participant * 100) / total).toFixed(1) : 0}%
          </p>
          <p css={[text.option1, text.black]}>
            {participant}/{total}
          </p>
        </Box>
      </Background>
    </Box>
  </Box>
);
