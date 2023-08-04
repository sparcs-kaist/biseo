import React, { type PropsWithChildren } from "react";
import { Box, Text, BorderedBox } from "@/components/atoms";
import type { Color } from "@/theme";

interface Props {
  name: string;
  count: number;
}

export const OptionVoteResult: React.FC<Props> = ({ name, count }) => {
  return (
    <BorderedBox
      w={260}
      h={30}
      bg="white"
      round={5}
      dir="row"
      align="center"
      justify="space-between"
      padHorizontal={13}
      padVertical={6}
      borderSize={1}
      borderStyle="solid"
      borderColor="gray200"
      color="gray200"
    >
      <Text color="gray500" variant="option1">
        {name}
      </Text>
      <Text color="gray500" variant="option1">
        {count}
      </Text>
    </BorderedBox>
  );
};
