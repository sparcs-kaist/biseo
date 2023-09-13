import React from "react";
import { BorderedBox } from "./BorderedBox";
import { Text } from "./Text";
import { Box } from "./Box";

interface Tag {
  id: number;
  title: string;
  description: string;
}

interface Props {
  tag: Tag;
  selected: boolean;
}

export const PresetOption: React.FC<Props> = ({ tag, selected }) => (
  <Box
    dir="row"
    w="fill"
    h={30}
    round={5}
    justify="space-between"
    align="center"
    padHorizontal={10}
    bg={selected ? "blue100" : "white"}
  >
    <BorderedBox
      round={5}
      borderSize={1}
      borderStyle="solid"
      borderColor="gray200"
      align="center"
      padHorizontal={6}
      padVertical={3}
    >
      <Text variant="option2" color="gray500">
        {tag.title}
      </Text>
    </BorderedBox>

    <Text variant="option1" color={selected ? "gray600" : "gray500"}>
      {tag.description}
    </Text>
  </Box>
);
