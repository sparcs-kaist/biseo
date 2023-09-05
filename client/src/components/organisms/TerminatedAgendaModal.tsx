import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@/components/atoms";
import {
  AdminAgendaTags,
  Modal,
  ModalInner,
  OptionVoteResult,
  ParticipantBar,
  TerminatedModalInner,
} from "@/components/molecules";
import { useAdminAgenda } from "@/services/admin-agenda";
import { UserTable } from "./UserTable";

export const TerminatedAgendaModal: React.FC = () => {
  const location = useLocation();
  const modalParams = new URLSearchParams(location.search);
  const agendaId = parseInt(modalParams.get("agendaId") as string);

  const { targetAgenda } = useAdminAgenda(state => ({
    targetAgenda: state.adminAgendas.find(
      agenda => agenda.id === agendaId && agenda.status === "terminated",
    ),
  }));
  const totalChoiceCount =
    targetAgenda === undefined
      ? 0
      : targetAgenda?.choices
          .map(choice => choice.count)
          .reduce((prev, current) => prev + current, 0);
  const totalVoterCount =
    targetAgenda?.voters.voted.length === undefined
      ? 0
      : targetAgenda?.voters.voted.length;
  const totalVotableCount =
    targetAgenda?.voters.total.length === undefined
      ? 0
      : targetAgenda?.voters.total.length;

  return (
    <Modal title="종료된 투표">
      <Box h={498} w={630} justify="space-between" dir="row">
        <Box w={300} h={498} gap={20}>
          <Box w={300} gap={10}>
            <ModalInner title="투표 제목">
              <ModalInner.WhiteTextBox>
                {targetAgenda?.title}
              </ModalInner.WhiteTextBox>
            </ModalInner>
            <ModalInner title="투표 내용">
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
          <Box w={300} h={245} gap={10}>
            <ParticipantBar
              total={totalVotableCount}
              participant={totalVoterCount}
            />
            <Box w={300} h={177} dir="column" gap={8}>
              <TerminatedModalInner.OptionResultsBox
                count={targetAgenda?.choices.length}
              >
                {targetAgenda?.choices.map(choice => (
                  <OptionVoteResult
                    key={choice.id}
                    name={choice.name}
                    count={choice.count}
                    totalCount={totalChoiceCount}
                  />
                ))}
              </TerminatedModalInner.OptionResultsBox>
            </Box>
          </Box>
        </Box>

        <Box w={300} h={498} justify="space-between">
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
          <Box
            w={300}
            h={52}
            justify="space-between"
            padVertical={15}
            padHorizontal={12}
            bg="blue100"
            round={5}
          >
            <AdminAgendaTags />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
