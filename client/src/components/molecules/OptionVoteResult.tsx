import React from "react";
import { Box, Text } from "@/components/atoms";
import styled from "@emotion/styled";
import { Color } from "@/theme";

interface Props {
  name: string;
  count: number;
  totalCount: number;
  w?: number;
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
  userChoice,
  w = 260,
}) => {
  return (
    <Box w={w} h={30}>
      <Background
        percent={(count / totalCount) * 100}
        color={userChoice ? "blue200" : "blue100"}
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
};
