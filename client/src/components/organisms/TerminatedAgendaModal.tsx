import React from "react";
import { useLocation } from "react-router-dom";
import {
  AdminAgendaTags,
  Modal,
  ModalInner,
  OptionVoteResult,
  ParticipantBar,
  TerminatedModalInner,
} from "@/components/molecules";
import { useAdminAgenda } from "@/services/admin-agenda";

import { gap, row, column, justify, w, bg, round, padding } from "@/styles";

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
      <div css={[row, justify.between, w(630)]}>
        <div css={[column, gap(20), w(300)]}>
          <div css={[column, gap(10)]}>
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
          </div>
          <div css={[column, gap(10)]}>
            <ParticipantBar
              total={totalVotableCount}
              participant={totalVoterCount}
            />
            <div css={[column, gap(8)]}>
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
            </div>
          </div>
        </div>

        <div css={[column, justify.between, w(300)]}>
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
          <div
            css={[
              column,
              bg.blue100,
              round.md,
              padding.horizontal(15),
              padding.vertical(12),
            ]}
          >
            <AdminAgendaTags />
          </div>
        </div>
      </div>
    </Modal>
  );
};
