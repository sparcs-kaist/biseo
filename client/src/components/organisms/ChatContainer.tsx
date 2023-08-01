import React from "react";
import { Message } from "biseo-interface/chat";
import styled from "@emotion/styled";
import { ChatMessage, ChatNotice } from "@/components/molecules";

const rawData = [
  {
    id: 0,
    type: "message",
    user: { displayName: "닉네임", id: 0 },
    createdAt: new Date(2023, 7, 26, 0, 0, 0),
    message: "메세지가 위치할 자리입니다.",
  },
  {
    id: 0,
    type: "message",
    user: { displayName: "Cookie", id: 0 },
    createdAt: new Date(2023, 7, 26, 4, 30, 0),
    message: "짧은 메세지 예시. 투표 언제 시작해요? 빨리 하고 가요~",
  },
  {
    type: "notice",
    message:
      "쿠키 준회원의 승급 심사 투표가 시작되었습니다. 쿠키 준회원의 승급 심사 투표가 시작되었습니다. 쿠키 준회원의 승급 심사 투표가 시작되었습니다. 기이이인 공지",
  },
  {
    id: 0,
    type: "message",
    user: { displayName: "Berry", id: 0 },
    createdAt: new Date(2023, 7, 26, 12, 9, 0),
    message:
      "긴 메세지 예시. 신입생 프로젝트는 어디서 확인할 수 있나요? 😎🎦🕶🍿😎🎦🕶🍿😎🎦🕶🍿 깃헙 링크 어디 있나요? 🍿📺❄️🍿📺❄️🍿📺❄️ 코스트코 팝콘이 진짜 맛있는데 아쉬나요?",
  },
  {
    id: 0,
    type: "message",
    user: { displayName: "Berry", id: 0 },
    createdAt: new Date(2023, 7, 26, 12, 9, 0),
    message:
      "긴 메세지 예시. 신입생 프로젝트는 어디서 확인할 수 있나요? 😎🎦🕶🍿😎🎦🕶🍿😎🎦🕶🍿 깃헙 링크 어디 있나요? 🍿📺❄️🍿📺❄️🍿📺❄️ 코스트코 팝콘이 진짜 맛있는데 아쉬나요?",
  },
  {
    id: 0,
    type: "message",
    user: { displayName: "Berry", id: 0 },
    createdAt: new Date(2023, 7, 26, 12, 9, 0),
    message:
      "긴 메세지 예시. 신입생 프로젝트는 어디서 확인할 수 있나요? 😎🎦🕶🍿😎🎦🕶🍿😎🎦🕶🍿 깃헙 링크 어디 있나요? 🍿📺❄️🍿📺❄️🍿📺❄️ 코스트코 팝콘이 진짜 맛있는데 아쉬나요?",
  },
  {
    id: 0,
    type: "message",
    user: { displayName: "Berry", id: 0 },
    createdAt: new Date(2023, 7, 26, 12, 9, 0),
    message:
      "긴 메세지 예시. 신입생 프로젝트는 어디서 확인할 수 있나요? 😎🎦🕶🍿😎🎦🕶🍿😎🎦🕶🍿 깃헙 링크 어디 있나요? 🍿📺❄️🍿📺❄️🍿📺❄️ 코스트코 팝콘이 진짜 맛있는데 아쉬나요?",
  },
  { type: "notice", message: "쿠키 준회원의 승급 심사 투표가 시작되었습니다." },
  {
    id: 0,
    type: "message",
    user: { displayName: "닉네임", id: 0 },
    createdAt: new Date(2023, 7, 26, 23, 59, 0),
    message: "메세지가 위치할 자리입니다.",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  overflow: scroll;
`;
// TODO: scrollbar design

export const ChatContainer: React.FC = () => {
  return (
    <Container>
      {rawData
        .slice()
        .reverse()
        .map(data =>
          data.type === "message" ? (
            <ChatMessage {...(data as Message)} />
          ) : (
            <ChatNotice {...data} />
          ),
        )}
    </Container>
  );
};
