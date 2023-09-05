import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AdminAgendaTags,
  Modal,
  ModalInner,
  ParticipantBar,
} from "@/components/molecules";
import { Box, Button, Text } from "@/components/atoms";
import { useAdminAgenda } from "@/services/admin-agenda";
import { UserTable } from "./UserTable";

export const OngoingAgendaModal: React.FC = () => {
  const location = useLocation();

  const modalParams = new URLSearchParams(location.search);
  const agendaId = parseInt(modalParams.get("agendaId") as string);

  const { targetAgenda, remindAgenda, terminateAgenda } = useAdminAgenda(
    state => ({
      targetAgenda: state.adminAgendas.find(
        agenda => agenda.id === agendaId && agenda.status === "ongoing",
      ),
      remindAgenda: state.remindAgenda,
      terminateAgenda: state.statusUpdate,
    }),
  );

  const remind = () => {
    if (targetAgenda) {
      remindAgenda(targetAgenda.id);
    }
  };
  const terminate = () => {
    if (targetAgenda) {
      terminateAgenda(targetAgenda.id, "terminated");
    }
  };

  return (
    <Modal title="진행 중인 투표">
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
                <ModalInner.VoteOption key={c.id}>
                  {c.name}
                </ModalInner.VoteOption>
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
            <Box dir="row" w={270} gap={10} justify="space-between">
              <Button w={130} h={38} onClick={remind}>
                <Text variant="boldtitle3" color="blue600">
                  투표 독촉하기
                </Text>
              </Button>
              <Link
                to=".."
                relative="path"
                replace
                style={{ textDecoration: "none" }}
              >
                <Button w={130} h={38} onClick={terminate}>
                  <Text variant="boldtitle3" color="blue600">
                    투표 종료하기
                  </Text>
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box w={300} gap={20}>
          <ParticipantBar
            total={targetAgenda?.voters.total.length}
            participant={targetAgenda?.voters.voted.length}
          />
          <ModalInner
            title="투표 대상"
            count={targetAgenda?.voters.total.length}
          >
            <UserTable
              userList={targetAgenda?.voters.total.map(user => user.id) || []}
              selectedUsers={
                targetAgenda?.voters.voted.map(user => user.id) || []
              }
              filterBy="voted"
            />
          </ModalInner>
        </Box>
      </Box>
    </Modal>
  );
};
