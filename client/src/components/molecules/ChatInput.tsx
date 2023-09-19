import React, { useCallback, useMemo, useState } from "react";
import { css } from "@emotion/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { EmoticonIcon, SendIcon } from "@/assets";
import { Divider, TextAreaAutosize } from "@/components/atoms";
import { useInput } from "@/common/hooks";
import {
  w,
  h,
  padding,
  scroll,
  scrollBar,
  bg,
  justify,
  align,
  row,
  gap,
  border,
  round,
} from "@/styles";

const inputBoxStyle = css`
  ${w("fill")}
  max-height: 30%;
  ${padding(10)}
  ${bg.white100}
  ${justify.start}
  ${align.start}
`;

const formStyle = css`
  ${row}
  ${gap(10)}
  ${w("fill")}
  ${h("fill")}
  ${padding.vertical(10)}
  ${padding.horizontal(15)}
  ${bg.white}
  ${border.gray300}
  ${round.md}
`;

const textAreaScrollStyle = css`
  ${scroll.y}
  ${scrollBar}
  overflow-y: scroll;
`;

interface Props {
  send: (message: string) => void;
}

export const ChatInput: React.FC<Props> = ({ send }) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const absolutePosition = css`
    position: absolute;
    transform: translate(0%, -100%);
  `;

  const { input, setValue } = useInput();

  const validated = useMemo(() => input.value.trim().length > 0, [input.value]);

  /** @constant 클라이언트와 서버에서 사용하는 채팅 메시지의 최대 길이를 지정합니다. */
  const maxMessageLength = 500;

  const sendCurrent = useCallback(() => {
    if (!validated) return;
    send(input.value.trim());
    setValue("");
  }, [input.value, validated]);

  return (
    <div css={inputBoxStyle}>
      <form css={formStyle}>
        <div css={[row, w("fill"), h("fill")]}>
          <TextAreaAutosize
            css={textAreaScrollStyle}
            onKeyDown={e => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                sendCurrent();
              }
            }}
            value={input.value}
            maxLength={maxMessageLength}
            onChange={input.onChange}
          />
          <Divider dir="vertical" />
        </div>
        <EmoticonIcon
          onClick={e => {
            e.stopPropagation();
            setPickerOpen(p => !p);
          }}
        />
        {pickerOpen && (
          <div css={absolutePosition}>
            <Picker
              data={data}
              onEmojiSelect={(emoji: { native: string }) =>
                setValue(s => s + emoji.native)
              }
              onClickOutside={() => setPickerOpen(false)}
              // emojiButtonRadius="50%"
              // emojiButtonSize={24}
              // emojiSize={16}
              // dynamicWidth={true}
              isNative
              previewPosition="none"
              skinTonePosition="none"
            />
          </div>
        )}
        <SendIcon onClick={sendCurrent} />
        {/* TODO: Replace with button / add hover, actove effect */}
      </form>
    </div>
  );
};
