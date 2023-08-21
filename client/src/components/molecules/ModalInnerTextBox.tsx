import React, { PropsWithChildren } from "react";
import { BorderedBox, Box, Text, TextArea, Button } from "@/components/atoms";

interface ModalInnerProps extends PropsWithChildren {
  title: string;
  count?: number;
}
interface SubComponents {
  TextBox: typeof TextBox;
  VoteOption: typeof VoteOption;
  VoteOptions: typeof VoteOptions;
  AddVoteOptionArea: typeof AddVoteOptionArea;
  VoteChoice: typeof VoteChoice;
  TextButton: typeof TextButton;
}

export const ModalInner: React.FC<ModalInnerProps> & SubComponents = ({
  title,
  count,
  children,
}) => (
  <Box dir="column" gap={8}>
    <Box dir="row" gap={8} align="center">
      <Text variant="body" color="black">
        {title}
      </Text>
      {count && (
        <Box
          bg="blue200"
          round={5}
          align="center"
          justify="center"
          w={20}
          h={20}
        >
          <Text color="blue600">{count}</Text>
        </Box>
      )}
    </Box>
    {children}
  </Box>
);

const TextBox: React.FC<PropsWithChildren> = ({ children }) => (
  <BorderedBox
    borderColor="gray200"
    bg="gray100"
    w={300}
    h={35}
    borderSize={1}
    padVertical={8}
    padHorizontal={15}
    round={5}
    borderStyle="solid"
    gap={10}
  >
    <Text color="gray300" variant="subtitle">
      {children}
    </Text>
  </BorderedBox>
);
ModalInner.TextBox = TextBox;

const VoteOptions: React.FC<PropsWithChildren> = ({ children }) => (
  <Box dir="row" gap={8}>
    {children}
  </Box>
);
ModalInner.VoteOptions = VoteOptions;

const VoteOption: React.FC<PropsWithChildren> = ({ children }) => (
  <BorderedBox
    borderColor="gray200"
    bg="white"
    w="hug"
    h={30}
    justify="center"
    borderSize={1}
    padHorizontal={15}
    round={5}
    borderStyle="solid"
  >
    <Text color="gray600" variant="subtitle">
      {children}
    </Text>
  </BorderedBox>
);
ModalInner.VoteOption = VoteOption;

const AddVoteOptionArea: React.FC<PropsWithChildren> = ({ children }) => (
  <Box w={300}>
    <BorderedBox
      borderColor="gray200"
      bg="white"
      w={300}
      h={152}
      borderSize={1}
      padVertical={10}
      padHorizontal={10}
      roundBot={0}
      roundTop={5}
      borderStyle="solid"
      gap={10}
    >
      {children}
    </BorderedBox>
    <TextButton>새로운 항목</TextButton>
  </Box>
);
ModalInner.AddVoteOptionArea = AddVoteOptionArea;

const VoteChoice: React.FC<PropsWithChildren> = ({ children }) => (
  <BorderedBox
    borderColor="gray200"
    bg="white"
    w={280}
    h={32}
    borderSize={1}
    padVertical={6}
    padHorizontal={12}
    round={5}
    borderStyle="solid"
    gap={10}
    justify="space-between"
  >
    <Text color="gray500" variant="subtitle">
      {children}
    </Text>
  </BorderedBox>
);
ModalInner.VoteChoice = VoteChoice;

const TextButton: React.FC<PropsWithChildren> = ({ children }) => (
  <BorderedBox
    borderColor="gray200"
    bg="gray100"
    w={300}
    h={38}
    borderSize={1}
    padVertical={10}
    padHorizontal={15}
    roundBot={5}
    roundTop={0}
    borderStyle="solid"
    gap={10}
    justify="space-between"
    dir="row"
  >
    <Text color="gray500" variant="subtitle">
      {children}
    </Text>
    <Box bg="blue200" round={5} align="center" justify="center" w={20} h={20}>
      <Text color="blue600" variant="boldtitle2">
        +
      </Text>
    </Box>
  </BorderedBox>
);
ModalInner.TextButton = TextButton;
