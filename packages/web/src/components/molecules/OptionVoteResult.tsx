import React from "react";
import styled from "@emotion/styled";
import { Box, Text } from "@biseo/web/components/atoms";
import type { Color } from "@biseo/web/theme";

interface Props {
  name: string;
  count: number;
  totalCount: number;
  userChoice?: boolean;
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

export const OptionVoteResult: React.FC<Props> = ({
  name,
  count,
  totalCount,
  userChoice = false,
}) => (
  <Box w="fill" h={30}>
    <Background
      percent={(count / totalCount) * 100}
      color={userChoice ? "blue300" : "blue200"}
      borderColor={userChoice ? "blue300" : "gray200"}
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
        <Text color={userChoice ? "blue500" : "gray500"} variant="option1">
          {name}
        </Text>
        <Text color={userChoice ? "blue500" : "gray500"} variant="option1">
          {count}
        </Text>
      </Box>
    </Background>
  </Box>
);
