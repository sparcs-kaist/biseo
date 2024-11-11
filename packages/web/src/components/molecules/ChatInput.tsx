/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useMemo } from "react";
import { css } from "@emotion/react";

/* TODO:  */
import { SendHorizontal, Ghost, Megaphone } from "lucide-react";
import { TextAreaAutosize } from "@biseo/web/components/atoms";
import { useInput } from "@biseo/web/common/hooks";
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
  center,
  colors,
} from "@biseo/web/styles";

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
  ${align.end}
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

  const sendIconStyle = css`
    ${center}
    ${w(28)}
    ${h(28)}

    ${validated ? bg.blue600 : bg.gray300}
    ${round.md}

    flex: 0 0 auto;
    cursor: pointer;
    transition: all 0.2s;
  `;

  return (
    <div css={inputBoxStyle}>
      <form css={formStyle}>
        <div css={[center, w("fill"), h("fill")]}>
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
          {/* <Divider dir="vertical" /> */}
        </div>
        {/* TODO: Add EmoticonIcon */}
        <div css={[center, w("hug"), h("hug"), gap(8)]}>
          <div css={[center, w("hug"), h("hug"), gap(4)]}>
            <Ghost
              size={18}
              color={colors.gray300}
              style={{ cursor: "pointer" }}
            />
            <Megaphone
              size={18}
              color={colors.gray300}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div css={sendIconStyle}>
            <SendHorizontal size={18} color={colors.white} />
          </div>
        </div>

        {/* TODO: Replace with button / add hover, actove effect */}
      </form>
    </div>
  );
};
