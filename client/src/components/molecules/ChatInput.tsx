import React from "react";
import styled from "@emotion/styled";
import { Box, Divider, TextArea } from "@/components/atoms";
import { ReactComponent as EmoticonIcon } from "@/assets/emoticon.svg";
import { ReactComponent as SendIcon } from "@/assets/send.svg";

const Container = styled.div`
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

export const ChatInput: React.FC = () => {
  return (
    <Box w="fill" pad={10} bg="white100">
      <Container>
        <TextArea />
        <Divider dir="vertical" />
        <EmoticonIcon />
        <SendIcon />
      </Container>
    </Box>
  );
};
