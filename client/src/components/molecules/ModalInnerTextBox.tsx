import React, { PropsWithChildren } from "react";
import {
  BorderedBox,
  Box,
  Text,
  GrayTextButton,
  Scroll,
  TextInput,
  TextAreaFixedsize,
  Button,
  Clickable,
} from "@/components/atoms";
import "@/components/atoms/placeholder.css";
import { TrashIcon } from "@/assets";

interface ModalInnerProps extends PropsWithChildren {
  title: string;
  count?: number;
  buttonText?: string;
  buttonOnClick?: React.MouseEventHandler;
  required?: boolean;
}

interface InputProps {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextAreaProps extends PropsWithChildren {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

interface SubmitProps extends PropsWithChildren {
  value: string;
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

interface SubComponents {
  TextBox: typeof TextBox;
  TextAreaInputBox: typeof TextAreaInputBox;
  VoteOption: typeof VoteOption;
  VoteOptions: typeof VoteOptions;
  AddVoteOptionArea: typeof AddVoteOptionArea;
  VoteChoice: typeof VoteChoice;
  TextButton: typeof TextButton;
  InputBox: typeof InputBox;
  TagChoice: typeof TagChoice;
  WhiteTextBox: typeof WhiteTextBox;
}

export const ModalInner: React.FC<ModalInnerProps> & SubComponents = ({
  title,
  count,
  buttonText,
  buttonOnClick,
  children,
  required,
}) => (
  <Box dir="column" w="fill" gap={8}>
    <Box w="fill" dir="row" align="end" justify="space-between">
      <Box dir="row" align="center" gap={8}>
        <Box dir="row" gap={2}>
          <Text variant="body" color="black">
            {title}
          </Text>
          {required && (
            <Text variant="body" color="blue600">
              *
            </Text>
          )}
        </Box>
        {count !== undefined && (
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
      <GrayTextButton onClick={buttonOnClick}>{buttonText}</GrayTextButton>
    </Box>
    {children}
  </Box>
);

const TextBox: React.FC<PropsWithChildren> = ({ children }) => (
  <BorderedBox
    borderColor="gray200"
    bg="gray100"
    w={300}
    borderSize={1}
    padVertical={10}
    padHorizontal={15}
    round={5}
    borderStyle="solid"
    gap={10}
  >
    <Text color="gray600" variant="subtitle">
      {children}
    </Text>
  </BorderedBox>
);
ModalInner.TextBox = TextBox;
const WhiteTextBox: React.FC<PropsWithChildren> = ({ children }) => (
  <BorderedBox
    borderColor="gray200"
    bg="white"
    w={300}
    borderSize={1}
    padVertical={10}
    padHorizontal={15}
    round={5}
    borderStyle="solid"
    gap={10}
  >
    <Text color="gray600" variant="subtitle">
      {children}
    </Text>
  </BorderedBox>
);
ModalInner.WhiteTextBox = WhiteTextBox;
const InputBox: React.FC<InputProps> = ({ value, onChange }) => (
  <BorderedBox
    w={300}
    borderColor="gray200"
    bg="gray100"
    borderSize={1}
    round={5}
    borderStyle="solid"
    dir="row"
    align="center"
  >
    <TextInput
      placeholder="내용을 입력하세요"
      value={value}
      onChange={onChange}
    />
  </BorderedBox>
);
ModalInner.InputBox = InputBox;

const TextAreaInputBox: React.FC<TextAreaProps> = ({ value, onChange }) => (
  <BorderedBox
    w={300}
    h={68}
    borderColor="gray200"
    bg="gray100"
    borderSize={1}
    round={5}
    borderStyle="solid"
  >
    <TextAreaFixedsize
      placeholder="내용을 입력하세요"
      value={value}
      onChange={onChange}
    />
  </BorderedBox>
);
ModalInner.TextAreaInputBox = TextAreaInputBox;

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

const AddVoteOptionArea: React.FC<SubmitProps> = ({
  children,
  value,
  onClick,
  onSubmit,
}) => (
  <Box w={300}>
    <BorderedBox
      borderColor="gray200"
      bg="white"
      w="fill"
      h={152}
      borderSize={1}
      pad={10}
      padRight={0}
      roundBot={0}
      roundTop={5}
      borderStyle="solid"
    >
      <Scroll>
        <Box w="fill" gap={10}>
          {children}
        </Box>
      </Scroll>
    </BorderedBox>
    <TextButton onClick={onClick} onSubmit={onSubmit} value={value}>
      새로운 항목
    </TextButton>
  </Box>
);
ModalInner.AddVoteOptionArea = AddVoteOptionArea;

const VoteChoice: React.FC<PropsWithChildren & { onClick?: () => void }> = ({
  children,
  onClick = () => {},
}) => (
  <BorderedBox
    borderColor="gray200"
    bg="white"
    w="fill"
    h={32}
    borderSize={1}
    padVertical={6}
    padLeft={12}
    padRight={0}
    round={5}
    borderStyle="solid"
    justify="space-between"
    dir="row"
    align="center"
  >
    <Text color="gray500" variant="subtitle">
      {children}
    </Text>
    <Clickable>
      <Box pad={10} onClick={onClick}>
        <TrashIcon />
      </Box>
    </Clickable>
  </BorderedBox>
);
ModalInner.VoteChoice = VoteChoice;

const TextButton: React.FC<SubmitProps> = ({
  children,
  value,
  onClick,
  onSubmit,
}) => (
  <BorderedBox
    w={300}
    borderColor="gray200"
    bg="gray100"
    borderSize={1}
    roundBot={5}
    roundTop={0}
    borderStyle="solid"
    dir="row"
    align="center"
    padRight={15}
  >
    <TextInput
      value={value}
      placeholder={children?.toString()}
      onChange={onClick}
      style={{ outline: "none" }}
    />
    <Button w={20} h={20} onClick={onSubmit}>
      <Text color="blue600" variant="boldtitle2">
        +
      </Text>
    </Button>
  </BorderedBox>
);
ModalInner.TextButton = TextButton;

const TagChoice: React.FC<PropsWithChildren> = ({ children }) => (
  <BorderedBox
    borderColor="gray200"
    bg="white"
    h={30}
    borderSize={1}
    padVertical={0}
    padHorizontal={15}
    round={5}
    borderStyle="solid"
    gap={8}
    justify="center"
    align="center"
  >
    <Text color="gray600" variant="subtitle">
      {children}
    </Text>
  </BorderedBox>
);
ModalInner.TagChoice = TagChoice;
