import React, { ReactNode, useState } from "react";
import { Modal } from "@/components/molecules";
import { Button, Box, Text, BorderedBox } from "@/components/atoms";
import { ModalInner } from "../molecules/ModalInnerTextBox";

import { useAdminAgenda } from "@/services/admin-agenda";
import { AdminAgendaCreate } from "biseo-interface/admin/agenda";
import { useLocation } from "react-router-dom";
const voteOptions: string[] = ["찬성"];

export const CreateAgendaModal: React.FC = () => {
  const [agendaCreate, setAgendaCreate] = useState<AdminAgendaCreate>();
  const [titleS, setTitleS] = useState("");
  const [contentS, setContentS] = useState("");
  const [resolutionS, setResolutionS] = useState("");

  const { createAgenda } = useAdminAgenda(state => ({
    createAgenda: state.createAgenda,
  }));

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleS(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentS(e.target.value);
  };
  const onChangeResolution = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResolutionS(e.target.value);
  };

  return (
    <Modal title="투표 생성하기">
      <Box w={630} justify="space-between" padVertical={15} dir="row">
        <Box w={300} gap={20}>
          <Box gap={10}>
            <ModalInner title="템플릿 선택">
              <ModalInner.TextBox></ModalInner.TextBox>
            </ModalInner>
            <ModalInner title="투표 제목">
              <ModalInner.InputBox onClick={onChangeTitle}>
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="투표 설명">
              <ModalInner.InputBox onClick={onChangeContent}>
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="의결 문안">
              <ModalInner.InputBox onClick={onChangeResolution}>
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>

            <ModalInner title="투표 항목" count={1}>
              <ModalInner.AddVoteOptionArea onClick={() => {}}>
                {voteOptions.map(opt => (
                  <ModalInner.VoteChoice>{opt}</ModalInner.VoteChoice>
                ))}
              </ModalInner.AddVoteOptionArea>
            </ModalInner>
            <Box
              gap={10}
              bg="blue100"
              padVertical={12}
              padHorizontal={15}
              round={5}
            ></Box>
          </Box>
        </Box>
        <Box w={300} gap={20}>
          <ModalInner title="태그 선택">
            <ModalInner.TextBox>태그를 선택하세요</ModalInner.TextBox>
          </ModalInner>
          <ModalInner title="투표 대상" count={3}>
            <BorderedBox
              borderColor="gray200"
              bg="white"
              w={298}
              h={277}
              borderSize={1}
              round={5}
              borderStyle="solid"
            ></BorderedBox>
          </ModalInner>
          <Box w="fill" gap={20}>
            <Box dir="row" w="fill" justify="space-between">
              <Box gap={20} dir="row" w="fill">
                <Text variant="body" color="black">
                  투표 결과
                </Text>
                <Text variant="body" color="gray600">
                  비공개
                </Text>
              </Box>
              <Box gap={20} dir="row" w="fill">
                <Text variant="body" color="black">
                  투표 상세
                </Text>
                <Text variant="body" color="gray600">
                  무기명
                </Text>
              </Box>
            </Box>
            <Box dir="row" w="fill" gap={10} justify="space-between">
              <Button
                h={38}
                onClick={() =>
                  createAgenda({
                    title: titleS,
                    content: contentS,
                    resolution: resolutionS,
                    voters: {
                      total: [],
                    },
                    choices: [],
                  })
                }
              >
                <Text variant="boldtitle3" color="blue600">
                  투표 생성하기
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
