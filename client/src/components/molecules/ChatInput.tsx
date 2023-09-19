import React, { useCallback, useMemo } from "react";
import { css } from "@emotion/react";

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
        <EmoticonIcon />
        <SendIcon onClick={sendCurrent} />
        {/* TODO: Replace with button / add hover, actove effect */}
      </form>
    </div>
  );
};
