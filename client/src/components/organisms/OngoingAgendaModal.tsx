import React from "react";
import { useLocation } from "react-router-dom";
import { AdminAgendaTags, Modal } from "@/components/molecules";
import { Button, Box, Text } from "@/components/atoms";
import { ModalInner } from "../molecules/ModalInnerTextBox";
import { ParticipantBar } from "../molecules/ParticipantBar";

import { useAdminAgenda } from "@/services/admin-agenda";

const voteOptions: string[] = ["찬성!", "찬성?", "찬성.."];

export const OngoingAgendaModal: React.FC = () => {
  const location = useLocation();

  const modalParams = new URLSearchParams(location.search);
  const agendaId = parseInt(modalParams.get("agendaId") as string);

  const { targetAgenda } = useAdminAgenda(state => ({
    targetAgenda: state.adminAgendas.find(
      agenda => agenda.id === agendaId && agenda.status === "ongoing",
    ),
  }));

  const { remindAgenda, terminateAgenda } = useAdminAgenda(state => ({
    remindAgenda: state.remindAgenda,
    terminateAgenda: state.statusUpdate,
  }));

  const remind = () => {
    targetAgenda && remindAgenda(targetAgenda.id);
  };
  const terminate = () => {
    targetAgenda && terminateAgenda(targetAgenda.id, "terminated");
  };

  return (
    <Modal title="진행 중인 투표">
      <Box w={630} justify="space-between" dir="row">
        <Box w={300} gap={20}>
          <Box gap={10}>
            <ModalInner title="투표 제목">
              <ModalInner.TextBox>{targetAgenda?.title}</ModalInner.TextBox>
            </ModalInner>
            <ModalInner title="투표 설명">
              <ModalInner.TextBox>{targetAgenda?.content}</ModalInner.TextBox>
            </ModalInner>
            <ModalInner title="의결문안">
              <ModalInner.TextBox>
                {targetAgenda?.resolution}
              </ModalInner.TextBox>
            </ModalInner>
          </Box>
          <ModalInner title="투표 항목" count={targetAgenda?.choices.length}>
            <ModalInner.VoteOptions>
              {targetAgenda?.choices.map(c => (
                <ModalInner.VoteOption>{c.name}</ModalInner.VoteOption>
              ))}
            </ModalInner.VoteOptions>
            {/* this approach could be better
          <ModalInner.VoteOptions options={voteOptions}/>
          */}
          </ModalInner>
          <Box
            gap={10}
            bg="blue100"
            padVertical={12}
            padHorizontal={15}
            round={5}
          >
            <AdminAgendaTags />
            <Box dir="row" w="fill" gap={10} justify="space-between">
              <Button h={38} onClick={remind}>
                <Text variant="boldtitle3" color="blue600">
                  투표 독촉하기
                </Text>
              </Button>
              <Button h={38} onClick={terminate}>
                <Text variant="boldtitle3" color="blue600">
                  투표 종료하기
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box w={300} gap={20}>
          <ParticipantBar
            total={targetAgenda?.voters.total.length}
            participant={targetAgenda?.voters.voted.length}
          ></ParticipantBar>
        </Box>
      </Box>
    </Modal>
  );
};
