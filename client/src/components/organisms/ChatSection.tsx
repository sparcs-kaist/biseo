import React from "react";
import { Box, Text } from "@/components/atoms";
import { ChatHeader, ChatMessage } from "@/components/molecules";
import styled from "@emotion/styled";

const ChatContainer = styled.div`
  border: solid 1px ${props => props.theme.colors.gray300};
  border-radius: 5px;
  overflow: hidden;
`;

export const ChatSection: React.FC = () => {
  return (
    <ChatContainer>
      <Box w={458} h={690} round={5}>
        <ChatHeader title="스레드" />
        <Box h="fill" justify="end">
          <ChatMessage
            user="닉네임"
            time={new Date(2023, 7, 26, 0, 0, 0)}
            message="메세지가 위치할 자리입니다."
          />
          <ChatMessage
            user="Cookie"
            time={new Date(2023, 7, 26, 4, 30, 0)}
            message="짧은 메세지 예시. 투표 언제 시작해요? 빨리 하고 가요~"
          />
          <ChatMessage
            user="Berry"
            time={new Date(2023, 7, 26, 12, 9, 0)}
            message="긴 메세지 예시. 신입생 프로젝트는 어디서 확인할 수 있나요? 😎🎦🕶🍿😎🎦🕶🍿😎🎦🕶🍿 깃헙 링크 어디 있나요? 🍿📺❄️🍿📺❄️🍿📺❄️ 코스트코 팝콘이 진짜 맛있는데 아쉬나요?"
          />
          <ChatMessage
            user="닉네임"
            time={new Date(2023, 7, 26, 23, 59, 0)}
            message="메세지가 위치할 자리입니다."
          />
        </Box>
      </Box>
    </ChatContainer>
  );
};
