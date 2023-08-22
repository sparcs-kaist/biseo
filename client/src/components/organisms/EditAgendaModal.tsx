import React, { useState } from "react";
import { Modal } from "@/components/molecules";
import { Button, Box, Text, BorderedBox } from "@/components/atoms";
import { ModalInner } from "../molecules/ModalInnerTextBox";
import { useLocation } from "react-router-dom";
import { useAdminAgenda } from "@/services/admin-agenda";
import { AdminAgendaUpdate } from "biseo-interface/admin/agenda";

export const EditAgendaModal: React.FC = () => {
  const [agendaUpdate, setAgendaUpdate] = useState<AdminAgendaUpdate>();
  const [titleS, setTitleS] = useState("");
  const [contentS, setContentS] = useState("");
  const [resolutionS, setResolutionS] = useState("");

  const [newchoiceS, setNewchoiceS] = useState("");
  const location = useLocation();

  const modalParams = new URLSearchParams(location.search);
  const agendaId = parseInt(modalParams.get("agendaId") as string);

  const { targetAgenda } = useAdminAgenda(state => ({
    targetAgenda: state.adminAgendas.find(
      agenda => agenda.id === agendaId && agenda.status === "preparing",
    ),
  }));
  const [choicesS, setChoicesS] = useState(
    targetAgenda!.choices.map(choice => {
      return choice.name;
    }),
  );

  const { updateAgenda } = useAdminAgenda(state => ({
    updateAgenda: state.updateAgenda,
  }));
  const { deleteAgenda } = useAdminAgenda(state => ({
    deleteAgenda: state.deleteAgenda,
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
  const onChangeChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewchoiceS(e.target.value);
  };
  const onSubmitChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoicesS([...choicesS!, newchoiceS]);
  };

  const update = (AgendaParam: AdminAgendaUpdate) => {
    targetAgenda &&
      updateAgenda({
        id: AgendaParam.id,
        title: AgendaParam.title,
        content: AgendaParam.content,
        resolution: AgendaParam.resolution,
        voters: {
          total: AgendaParam.voters.total,
        },
        choices: AgendaParam.choices,
      });
  };

  return (
    <Modal title="투표 수정하기">
      <Box w={630} justify="space-between" padVertical={15} dir="row">
        <Box w={300} gap={20}>
          <Box gap={10}>
            <ModalInner title="템플릿 선택">
              <ModalInner.TextBox></ModalInner.TextBox>
            </ModalInner>
            <ModalInner title="투표 제목">
              <ModalInner.InputBox onClick={onChangeTitle}>
                {targetAgenda?.title}
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="투표 설명">
              <ModalInner.InputBox onClick={onChangeContent}>
                {targetAgenda?.content}
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="의결 문안">
              <ModalInner.InputBox onClick={onChangeResolution}>
                {targetAgenda?.resolution}
              </ModalInner.InputBox>
            </ModalInner>
          </Box>

          <ModalInner title="투표 항목" count={1}>
            <ModalInner.AddVoteOptionArea
              onClick={onChangeChoice}
              onSubmit={onSubmitChoice}
            >
              {choicesS.map(opt => (
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
                  updateAgenda({
                    id: targetAgenda!.id,
                    title: titleS,
                    content: contentS,
                    resolution: resolutionS,
                    voters: {
                      total: [],
                    },
                    choices: choicesS,
                  })
                }
              >
                <Text variant="boldtitle3" color="blue600">
                  투표 수정하기
                </Text>
              </Button>
              <Button h={38} onClick={() => deleteAgenda(targetAgenda!.id)}>
                <Text variant="boldtitle3" color="blue600">
                  투표 삭제하기
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
