import React, { useCallback, useMemo, useState } from "react";
import { css } from "@emotion/react";

/* eslint-disable import/no-extraneous-dependencies */
/* TODO: Solve package installation issue */
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
import { useAuth } from "@biseo/web/services/auth";
import type { MessageType } from "@biseo/interface/chat/common";
import { BubbleItem } from "./BubbleItem";

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
  send: (message: string, type: MessageType) => void;
}

export const ChatInput: React.FC<Props> = ({ send }) => {
  const { input, setValue } = useInput();
  const [type, setType] = useState<MessageType>("message");

  const onTypeChange = (newType: MessageType) =>
    setType(prev => {
      if (prev === newType) return "message";
      return newType;
    });

  const validated = useMemo(() => input.value.trim().length > 0, [input.value]);

  /** @constant 클라이언트와 서버에서 사용하는 채팅 메시지의 최대 길이를 지정합니다. */
  const maxMessageLength = 500;

  const sendCurrent = useCallback(() => {
    if (!validated) return;
    send(input.value.trim(), type);
    setValue("");
  }, [input.value, validated, type]);

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
            <BubbleItem label="익명으로 설정" position="top">
              <Ghost
                size={20}
                color={type === "anonymous" ? colors.blue600 : colors.gray300}
                style={{ cursor: "pointer" }}
                onClick={() => onTypeChange("anonymous")}
              />
            </BubbleItem>

            {useAuth().userInfo?.isAdmin && (
              <BubbleItem label="공지 메세지로 설정" position="top">
                <Megaphone
                  size={20}
                  color={
                    type === "adminnotice" ? colors.blue600 : colors.gray300
                  }
                  style={{ cursor: "pointer" }}
                  // onClick={() => onTypeChange("adminnotice")}
                />
              </BubbleItem>
            )}
          </div>
          <div css={sendIconStyle}>
            <SendHorizontal
              size={18}
              color={colors.white}
              onClick={sendCurrent}
            />
          </div>
        </div>

        {/* TODO: Replace with button / add hover, actove effect */}
      </form>
    </div>
  );
};
