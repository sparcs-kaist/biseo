import React, { PropsWithChildren } from "react";
import { BorderedBox, Box, Text, TextArea } from "@/components/atoms";

interface ModalInnerProps extends PropsWithChildren {
  title: string;
  count?: number;
}
interface SubComponents {
  TextBox: typeof TextBox;
  VoteOption: typeof VoteOption;
  VoteOptions: typeof VoteOptions;
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
