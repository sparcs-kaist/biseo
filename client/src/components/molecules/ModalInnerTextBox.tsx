import React, { PropsWithChildren } from "react";
import {
  BorderedBox,
  Box,
  Text,
  GrayTextButton,
  Scroll,
  TextInput,
  TextAreaFixedsize,
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

interface ButtonProps extends PropsWithChildren {
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

interface TextAreaProps extends PropsWithChildren {
  placeholder?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

interface SubmitProps extends PropsWithChildren {
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        <Box dir="row">
          <Text variant="body" color="black">
            {title}
          </Text>
          {required && (
            <Text variant="body" color="blue600">
              *
            </Text>
          )}
        </Box>
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
    h={35}
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
    h={35}
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
const InputBox: React.FC<ButtonProps> = ({ children, onClick, value }) => (
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
      placeholder={children?.toString()}
      value={value}
      onChange={onClick}
    />
  </BorderedBox>
);
ModalInner.InputBox = InputBox;

const TextAreaInputBox: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  onChange,
}) => (
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
      placeholder={placeholder}
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
    <TextButton onClick={onClick} onSubmit={onSubmit}>
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
    padHorizontal={12}
    round={5}
    borderStyle="solid"
    justify="space-between"
    dir="row"
    align="center"
    onClick={onClick}
  >
    <Text color="gray500" variant="subtitle">
      {children}
    </Text>
    <TrashIcon />
  </BorderedBox>
);
ModalInner.VoteChoice = VoteChoice;

const TextButton: React.FC<SubmitProps> = ({ children, onClick, onSubmit }) => (
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
    align="center"
  >
    <input
      type="text"
      placeholder={children?.toString()}
      style={{ border: 0 }}
      onChange={onClick}
    />
    <Box
      bg="blue200"
      round={5}
      align="center"
      justify="center"
      w={20}
      h={20}
      // @ts-ignore
      onClick={onSubmit}
    >
      <Text color="blue600" variant="boldtitle2">
        +
      </Text>
    </Box>
  </BorderedBox>
);
ModalInner.TextButton = TextButton;
