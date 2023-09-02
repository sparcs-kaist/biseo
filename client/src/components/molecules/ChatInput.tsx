import React, { useCallback, useMemo } from "react";
import styled from "@emotion/styled";

import { EmoticonIcon, SendIcon } from "@/assets";
import { Box, Divider, TextAreaAutosize } from "@/components/atoms";
import { useInput } from "@/common/hooks";

const InputForm = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  background-color: ${props => props.theme.colors.white};
  border: solid 1px ${props => props.theme.colors.gray300};
  border-radius: 5px;
`;

interface Props {
  send: (message: string) => void;
}

export const ChatInput: React.FC<Props> = ({ send }) => {
  const { input, setValue } = useInput();

  // TODO: disable send button based on `validated`
  const validated = useMemo(() => input.value.trim().length > 0, [input.value]);

  const sendCurrent = useCallback(() => {
    if (!validated) return;
    send(input.value.trim());
    setValue("");
  }, [input.value, validated]);

  return (
    <Box w="fill" pad={10} bg="white100">
      <InputForm>
        <TextAreaAutosize
          onKeyPress={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendCurrent();
            }
          }}
          value={input.value}
          onChange={input.onChange}
        />
        <Divider dir="vertical" />
        <EmoticonIcon />
        <SendIcon onClick={sendCurrent} />
        {/* TODO: Replace with button / add hover, actove effect */}
      </InputForm>
    </Box>
  );
};
