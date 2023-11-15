import { TrashIcon } from "@biseo/web/assets";
import {
  BorderedBox,
  Box,
  Button,
  Clickable,
  GrayTextButton,
  Scroll,
  TaggersBox,
  TextAreaFixedsize,
  TextInput,
} from "@biseo/web/components/atoms";
import "@biseo/web/components/atoms/placeholder.css";
import { scroll, scrollBar, text } from "@biseo/web/styles";
import { css } from "@emotion/react";
import React, { type PropsWithChildren } from "react";

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
  TaggerBox: typeof TaggerBox;
}

export const ModalInner: React.FC<ModalInnerProps> & SubComponents = ({
  title,
  count = undefined,
  buttonText = "",
  buttonOnClick = () => {},
  children,
  required = false,
}: ModalInnerProps) => (
  <Box dir="column" w="fill" gap={8}>
    <Box w="fill" dir="row" align="flex-end" justify="space-between">
      <Box dir="row" align="center" gap={8}>
        <Box dir="row" gap={2}>
          <p css={[text.body, text.black]}>{title}</p>
          {required && <p css={[text.body, text.blue600]}>*</p>}
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
            <p css={[text.body, text.blue600]}>{count}</p>
          </Box>
        )}
      </Box>
      <GrayTextButton onClick={buttonOnClick}>{buttonText}</GrayTextButton>
    </Box>
    {children}
  </Box>
);

const TextBox: React.FC<PropsWithChildren> = ({ children = null }) => (
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
    <p css={[text.subtitle, text.gray600]}>{children}</p>
  </BorderedBox>
);
ModalInner.TextBox = TextBox;
const WhiteTextBox: React.FC<PropsWithChildren> = ({ children = null }) => (
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
    <p css={[text.subtitle, text.gray600]}>{children}</p>
  </BorderedBox>
);
ModalInner.WhiteTextBox = WhiteTextBox;
const InputBox: React.FC<InputProps> = ({ value = undefined, onChange }) => (
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

const TextAreaInputBox: React.FC<TextAreaProps> = ({
  value = undefined,
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
      placeholder="내용을 입력하세요"
      value={value}
      onChange={onChange}
    />
  </BorderedBox>
);
ModalInner.TextAreaInputBox = TextAreaInputBox;

const TextButton: React.FC<SubmitProps> = ({
  children = null,
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
      onKeyDown={e => {
        if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
          e.preventDefault();
          onSubmit();
        }
      }}
    />
    <Button w={20} h={20} onClick={onSubmit}>
      <p css={[text.boldtitle2, text.blue600]}>+</p>
    </Button>
  </BorderedBox>
);
ModalInner.TextButton = TextButton;

const VoteOptions: React.FC<PropsWithChildren> = ({ children = null }) => {
  const scrollTyle = css`
    ${scroll.y}
    ${scrollBar}
  overflow-y: scroll;
  `;
  return (
    <Box
      dir="row"
      gap={8}
      w="fill"
      h={150}
      wrap="wrap"
      justify="flex-start"
      css={scrollTyle}
    >
      {children}
    </Box>
  );
};
ModalInner.VoteOptions = VoteOptions;

const VoteOption: React.FC<PropsWithChildren> = ({ children = null }) => (
  <BorderedBox
    borderColor="gray200"
    bg="white"
    w="hug"
    h="hug"
    justify="center"
    borderSize={1}
    padVertical={7}
    padHorizontal={15}
    round={5}
    borderStyle="solid"
    style={{
      maxWidth: "100%",
      wordBreak: "break-all",
      overflowWrap: "break-word",
    }}
  >
    <p css={[text.subtitle, text.gray600]}>{children}</p>
  </BorderedBox>
);
ModalInner.VoteOption = VoteOption;

const AddVoteOptionArea: React.FC<SubmitProps> = ({
  children = null,
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
      align="stretch"
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
  children = null,
  onClick = () => {},
}) => (
  <BorderedBox
    borderColor="gray200"
    bg="white"
    w="fill"
    h="hug"
    borderSize={1}
    padVertical={8}
    padHorizontal={12}
    round={5}
    borderStyle="solid"
    justify="space-between"
    gap={5}
    dir="row"
    align="flex-start"
    style={{
      minHeight: 32,
    }}
  >
    <p css={[text.subtitle, text.gray500]}>{children}</p>
    <Clickable>
      <Box w={13} h={13} justify="center" align="center" onClick={onClick}>
        <TrashIcon />
      </Box>
    </Clickable>
  </BorderedBox>
);
ModalInner.VoteChoice = VoteChoice;

const TagChoice: React.FC<PropsWithChildren> = ({ children = null }) => (
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
    <p css={[text.subtitle, text.gray600]}>{children}</p>
  </BorderedBox>
);
ModalInner.TagChoice = TagChoice;

const TaggerBox: React.FC<PropsWithChildren> = ({ children = null }) => (
  <TaggersBox w={300} h={73}>
    <Scroll>
      <TaggersBox>{children}</TaggersBox>
    </Scroll>
  </TaggersBox>
);
ModalInner.TaggerBox = TaggerBox;
