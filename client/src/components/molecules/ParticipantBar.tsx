import React from "react";
import { BorderedBox, Box, Text } from "@/components/atoms";

interface Props {
  total?: number;
  participant?: number;
}

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
        <Text color="blue600">{participant}</Text>
      </Box>
    </Box>
    <BorderedBox
      w={300}
      h={30}
      bg="white"
      round={5}
      dir="row"
      align="center"
      justify="space-between"
      borderSize={1}
      borderStyle="solid"
      borderColor="gray200"
      color="gray200"
      position="relative"
    >
      <Box
        w={total ? (300 * participant) / total : 0}
        bg="blue300"
        h={30}
        z-index={0}
        position="absolute"
      ></Box>
      <Box
        z-index={2}
        position="absolute"
        w={300}
        h={30}
        dir="row"
        align="center"
        justify="space-between"
        padHorizontal={13}
        padVertical={6}
      >
        <Text color="black" variant="option1">
          {total ? (participant * 100) / total : 0}%
        </Text>
        <Text color="black" variant="option1">
          {participant}/{total}
        </Text>
      </Box>
    </BorderedBox>
  </Box>
);
