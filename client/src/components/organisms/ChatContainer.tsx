import React from "react";
import styled from "@emotion/styled";
import { ChatMessage } from "@/components/molecules";

const rawData = [
  {
    user: "닉네임",
    time: new Date(2023, 7, 26, 0, 0, 0),
    message: "메세지가 위치할 자리입니다.",
  },
  {
    user: "Cookie",
    time: new Date(2023, 7, 26, 4, 30, 0),
    message: "짧은 메세지 예시. 투표 언제 시작해요? 빨리 하고 가요~",
  },
  {
    user: "Berry",
    time: new Date(2023, 7, 26, 12, 9, 0),
    message:
      "긴 메세지 예시. 신입생 프로젝트는 어디서 확인할 수 있나요? 😎🎦🕶🍿😎🎦🕶🍿😎🎦🕶🍿 깃헙 링크 어디 있나요? 🍿📺❄️🍿📺❄️🍿📺❄️ 코스트코 팝콘이 진짜 맛있는데 아쉬나요?",
  },
  {
    user: "닉네임",
    time: new Date(2023, 7, 26, 23, 59, 0),
    message: "메세지가 위치할 자리입니다.",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  overflow: scroll;
`;

export const ChatContainer: React.FC = () => {
  return (
    <Container>
      {rawData
        .slice()
        .reverse()
        .map(data => (
          <ChatMessage {...data} />
        ))}
    </Container>
  );
};
