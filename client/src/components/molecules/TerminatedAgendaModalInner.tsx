import React, { PropsWithChildren } from "react";
import { BorderedBox, Box, Text, TextArea } from "@/components/atoms";

interface BoxWithTitle extends PropsWithChildren {
  title: string;
}
interface SubComponents {
  BoxWithTitle: typeof BoxWithTitle;
  TextBoxWithTitle: typeof TextBoxWithTitle;
  ParticipantBar: typeof ParticipantBar;
  OptionResultsBox: typeof OptionResultsBox;
  OptionVoteResult: typeof OptionVoteResult;
}

const BoxWithTitle: React.FC<BoxWithTitle> = ({ title, children }) => (
  <Box w={300} dir="column" gap={8}>
    <Text variant="body" color="black">
      {title}
    </Text>
    <BorderedBox
      borderColor="gray200"
      bg="white"
      w={300}
      borderSize={1}
      padVertical={10}
      padHorizontal={15}
      round={5}
      borderStyle="solid"
    >
      {children}
    </BorderedBox>
  </Box>
);
//ModalInner.TextBox = TextBox;

const TextBoxWithTitle: React.FC<BoxWithTitle> = ({ title, children }) => (
  <Box w={300} dir="column" gap={8}>
    <Text variant="body" color="black">
      {title}
    </Text>
    <BorderedBox
      borderColor="gray200"
      bg="white"
      w={300}
      borderSize={1}
      padVertical={10}
      padHorizontal={15}
      round={5}
      borderStyle="solid"
    >
      <Text color="gray600" variant="subtitle">
        {children}
      </Text>
    </BorderedBox>
  </Box>
);

interface PropsForParticipant {
  total: number;
  participant: number;
}

const ParticipantBar: React.FC<PropsForParticipant> = ({
  total,
  participant,
}) => (
  <Box w={300} h={58} gap={8} dir="column">
    <Box w={75} h={20} gap={8} dir="row">
      <Text variant="body" color="black">
        투표 현황
      </Text>
      <Box bg="blue200" round={5} align="center" justify="center" w={20} h={20}>
        <Text variant="boldtitle4" color="blue600">
          {participant}
        </Text>
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
      borderColor="blue200"
      color="gray200"
      position="relative"
    >
      <Box
        w={(300 * participant) / total}
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
          {(participant * 100) / total}%
        </Text>
        <Text color="black" variant="option1">
          {participant}/{total}
        </Text>
      </Box>
    </BorderedBox>
  </Box>
);

const OptionResultsBox: React.FC<PropsWithChildren> = ({ children }) => (
  <Box w={300} h={177} dir="column" gap={8}>
    <Text variant="body" color="black">
      투표 결과
    </Text>
    <BorderedBox
      w={300}
      borderColor="gray200"
      borderSize={1}
      borderStyle="solid"
      round={5}
      pad={10}
      gap={10}
      dir="column"
    >
      {children}
    </BorderedBox>
  </Box>
);

interface PropsForOptionVoteResult {
  name: string;
  count: number;
  totalCount: number;
  w?: number;
  userChoice?: boolean;
}
const OptionVoteResult: React.FC<PropsForOptionVoteResult> = ({
  name,
  count,
  totalCount,
  userChoice = true,
  w = 260,
}) => {
  return (
    <BorderedBox
      w={w}
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
        w={(w * count) / totalCount}
        bg={userChoice ? "blue200" : "blue100"}
        h={30}
        z-index={0}
        position="absolute"
      ></Box>
      <Box
        z-index={2}
        position="absolute"
        w={w}
        h={30}
        dir="row"
        align="center"
        justify="space-between"
        padHorizontal={13}
        padVertical={6}
      >
        <Text color="black" variant="option1">
          {name}
        </Text>
        <Text color="black" variant="option1">
          {count}
        </Text>
      </Box>
    </BorderedBox>
  );
};

export const TerminatedModalInner: SubComponents = {
  BoxWithTitle: BoxWithTitle,
  TextBoxWithTitle: TextBoxWithTitle,
  ParticipantBar: ParticipantBar,
  OptionResultsBox: OptionResultsBox,
  OptionVoteResult: OptionVoteResult,
};
