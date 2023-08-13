import React from "react";
import { Box, Text, BorderedBox } from "@/components/atoms";

interface Props {
  name: string;
  count: number;
  totalCount: number;
  userChoice: boolean;
}

export const OptionVoteResult: React.FC<Props> = ({
  name,
  count,
  totalCount,
  userChoice,
}) => {
  return (
    <BorderedBox
      w={260}
      h={30}
      bg="white"
      round={5}
      dir="row"
      align="center"
      justify="space-between"
      // padHorizontal={13}
      // padVertical={6}
      borderSize={1}
      borderStyle="solid"
      borderColor={userChoice ? "blue300" : "gray200"}
      color="gray200"
      position="relative"
    >
      <Box
        w={(260 * count) / totalCount}
        bg={userChoice ? "blue200" : "blue100"}
        h={30}
        z-index={0}
        position="absolute"
      ></Box>
      <Box
        z-index={2}
        position="absolute"
        w={260}
        h={30}
        dir="row"
        align="center"
        justify="space-between"
        padHorizontal={13}
        padVertical={6}
      >
        <Text color="gray500" variant="option1">
          {name}
        </Text>
        <Text color="gray500" variant="option1">
          {count}
        </Text>
      </Box>
    </BorderedBox>
  );
};
