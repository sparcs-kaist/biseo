import React from "react";
import styled from "@emotion/styled";
import { Divider, TextArea } from "@/components/atoms";
import { ReactComponent as EmoticonIcon } from "@/assets/emoticon.svg";
import { ReactComponent as SendIcon } from "@/assets/send.svg";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${props => props.theme.colors.white100};
  border-top: solid 1px ${props => props.theme.colors.gray200};
`;

const InnerContainer = styled.div`
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
    <Container>
      <InnerContainer>
        <TextArea />
        <Divider dir="vertical" />
        <EmoticonIcon />
        <SendIcon />
      </InnerContainer>
    </Container>
  );
};
