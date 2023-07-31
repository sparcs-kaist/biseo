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
      h={30}
      w={260}
      round={5}
      padHorizontal={13}
      padVertical={6}
      justify="space-between"
      bg="white"
      color="gray200"
      dir="row"
      borderSize={1}
      borderStyle="solid"
      borderColor="gray200"
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
