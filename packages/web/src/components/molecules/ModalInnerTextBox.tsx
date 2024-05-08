import React, { type PropsWithChildren } from "react";
import {
  GrayTextButton,
  Scroll,
  TextInput,
  TextAreaFixedsize,
  Button,
  Clickable,
  TaggersBox,
  Divider,
} from "@biseo/web/components/atoms";
import "@biseo/web/components/atoms/placeholder.css";
import { TrashIcon } from "@biseo/web/assets";
import { css } from "@emotion/react";
import {
  colors,
  text,
  w,
  h,
  padding,
  scroll,
  scrollBar,
  bg,
  align,
  column,
  gap,
  border,
  round,
  row,
  center,
  justify,
} from "@biseo/web/styles";

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

/** @constant 클라이언트와 서버에서 사용하는 채팅 메시지의 최대 길이를 지정합니다. */
const maxTextLength = 255;

export const ModalInner: React.FC<ModalInnerProps> & SubComponents = ({
  title,
  count = undefined,
  buttonText = "",
  buttonOnClick = () => {},
  children,
  required = false,
}: ModalInnerProps) => (
  <div css={[column, w("fill"), gap(8)]}>
    <div css={[w("fill"), row, align.end, justify.between]}>
      <div css={[row, align.center, gap(8)]}>
        <div css={[row, gap(2)]}>
          <p css={[text.body, text.black]}>{title}</p>
          {required && <p css={[text.body, text.blue600]}>*</p>}
        </div>
        {count !== undefined && (
          <div css={[center, bg.blue200, round.md, w(20), h(20)]}>
            <p css={[text.blue600, text.body]}>{count}</p>
          </div>
        )}
      </div>
      <GrayTextButton onClick={buttonOnClick}>{buttonText}</GrayTextButton>
    </div>
    {children}
  </div>
);

const TextBox: React.FC<PropsWithChildren> = ({ children = null }) => (
  <div
    css={[
      border.gray200,
      round.md,
      bg.gray100,
      w(300),
      padding.vertical(10),
      padding.horizontal(15),
      gap(10),
    ]}
  >
    <p css={[colors.gray600, text.subtitle]}>{children}</p>
  </div>
);
ModalInner.TextBox = TextBox;
const WhiteTextBox: React.FC<PropsWithChildren> = ({ children = null }) => (
  <div
    css={[
      border.gray200,
      round.md,
      bg.white,
      w(300),
      padding.vertical(10),
      padding.horizontal(15),
      gap(10),
    ]}
  >
    <p css={[colors.gray600, text.subtitle]}>{children}</p>
  </div>
);
ModalInner.WhiteTextBox = WhiteTextBox;
const InputBox: React.FC<InputProps> = ({ value = undefined, onChange }) => (
  <div css={[border.gray200, round.md, bg.gray100, w(300), row, align.center]}>
    <TextInput
      placeholder="내용을 입력하세요"
      value={value}
      onChange={onChange}
      maxLength={maxTextLength}
    />
  </div>
);
ModalInner.InputBox = InputBox;

const TextAreaInputBox: React.FC<TextAreaProps> = ({
  value = undefined,
  onChange,
}) => (
  <div css={[w(300), h(68), border.gray200, round.md, bg.gray100]}>
    <TextAreaFixedsize
      placeholder="내용을 입력하세요"
      value={value}
      onChange={onChange}
      maxLength={maxTextLength}
    />
  </div>
);
ModalInner.TextAreaInputBox = TextAreaInputBox;

const TextButton: React.FC<SubmitProps> = ({
  children = null,
  value,
  onClick,
  onSubmit,
}) => (
  <div css={[w(300), bg.gray100, row, align.center, padding.right(15), border]}>
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
      <p css={[colors.blue600, text.boldtitle2, "line-height: 1"]}>+</p>
    </Button>
  </div>
);
ModalInner.TextButton = TextButton;

const VoteOptions: React.FC<PropsWithChildren> = ({ children = null }) => {
  const scrollTyle = css`
    ${scroll.y}
    ${scrollBar}
  overflow-y: scroll;
  `;
  const flexWrap = css`
    flex-wrap: wrap;
  `;
  return (
    <div
      css={[
        row,
        justify.start,
        w("fill"),
        h(150),
        scrollTyle,
        gap(8),
        flexWrap,
      ]}
    >
      {children}
    </div>
  );
};
ModalInner.VoteOptions = VoteOptions;

const VoteOption: React.FC<PropsWithChildren> = ({ children = null }) => (
  <div
    css={[
      w("hug"),
      h("hug"),
      justify.center,
      border.gray200,
      round.md,
      padding.vertical(7),
      padding.horizontal(15),
    ]}
    style={{
      maxWidth: "100%",
      wordBreak: "break-all",
      overflowWrap: "break-word",
    }}
  >
    <p css={[colors.gray600, text.subtitle]}>{children}</p>
  </div>
);
ModalInner.VoteOption = VoteOption;

const AddVoteOptionArea: React.FC<SubmitProps> = ({
  children = null,
  value,
  onClick,
  onSubmit,
}) => (
  <div css={[w(300), border.gray200, round.md, `overflow: hidden`]}>
    <div
      css={[
        bg.white,
        w("fill"),
        h(152),
        padding(10),
        column,
        align.stretch,
        scroll.y,
        scrollBar,
        gap(10),
      ]}
    >
      {children}
    </div>
    <Divider color="gray200" />
    <TextButton onClick={onClick} onSubmit={onSubmit} value={value}>
      새로운 항목
    </TextButton>
  </div>
);
ModalInner.AddVoteOptionArea = AddVoteOptionArea;

const VoteChoice: React.FC<PropsWithChildren & { onClick?: () => void }> = ({
  children = null,
  onClick = () => {},
}) => (
  <div
    css={[
      w("fill"),
      h("hug"),
      bg.white,
      justify.between,
      align.start,
      border.gray200,
      round.md,
      padding.vertical(8),
      padding.horizontal(12),
      row,
      gap(5),
    ]}
    style={{
      minHeight: 32,
    }}
  >
    <p
      css={[colors.gray600, text.subtitle]}
      style={{
        wordBreak: "break-all",
        overflowWrap: "break-word",
      }}
    >
      {children}
    </p>
    <Clickable>
      <button
        type="submit"
        css={[w(13), h(13), center, bg.white]}
        style={{
          border: "none",
          background: "transparent",
        }}
        onClick={onClick}
      >
        <TrashIcon />
      </button>
    </Clickable>
  </div>
);
ModalInner.VoteChoice = VoteChoice;

const TagChoice: React.FC<PropsWithChildren> = ({ children = null }) => (
  <div
    css={[
      h(30),
      bg.white,
      border.gray200,
      padding.horizontal(15),
      round.md,
      gap(8),
      center,
    ]}
  >
    <p css={[colors.gray600, text.subtitle]}>{children}</p>
  </div>
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
