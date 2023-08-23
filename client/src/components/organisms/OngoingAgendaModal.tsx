import React from "react";
import { useLocation } from "react-router-dom";
import {
  AdminAgendaTags,
  Modal,
  ParticipantBar,
  ModalInner,
} from "@/components/molecules";
import { Button, Box, Text, BorderedBox } from "@/components/atoms";
import { useAdminAgenda } from "@/services/admin-agenda";
import { UserTable } from "./UserTable";

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
    <Modal width={680} height={509} title="진행 중인 투표">
      <Box w={630} justify="space-between" padVertical={15} dir="row">
        <Box w={300} gap={20}>
          <Box gap={10}>
            <ModalInner title="투표 제목">
              <ModalInner.WhiteTextBox>
                {targetAgenda?.title}
              </ModalInner.WhiteTextBox>
            </ModalInner>
            <ModalInner title="투표 설명">
              <ModalInner.WhiteTextBox>
                {targetAgenda?.content}
              </ModalInner.WhiteTextBox>
            </ModalInner>
            <ModalInner title="의결문안">
              <ModalInner.WhiteTextBox>
                {targetAgenda?.resolution}
              </ModalInner.WhiteTextBox>
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
          <ModalInner title="투표 대상" count={3}>
            <BorderedBox
              borderColor="gray200"
              bg="white"
              w={298}
              h={277}
              borderSize={1}
              round={5}
              borderStyle="solid"
            >
              <UserTable />
            </BorderedBox>
          </ModalInner>
        </Box>
      </Box>
    </Modal>
  );
};
