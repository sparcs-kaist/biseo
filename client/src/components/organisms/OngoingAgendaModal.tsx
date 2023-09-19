import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AdminAgendaTags,
  Modal,
  ModalInner,
  ParticipantBar,
} from "@/components/molecules";
import { Button } from "@/components/atoms";
import { useAdminAgenda } from "@/services/admin-agenda";

import {
  gap,
  row,
  column,
  justify,
  text,
  w,
  bg,
  round,
  padding,
} from "@/styles";

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
      <div css={[row, justify.between, w(630), padding.vertical(15)]}>
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
          <div
            css={[
              column,
              bg.blue100,
              gap(10),
              round.md,
              padding.horizontal(15),
              padding.vertical(13),
            ]}
          >
            <AdminAgendaTags />
            <div css={[row, gap(10), justify.between, w(270)]}>
              <Button w={130} h={38} onClick={remind}>
                <p css={[text.boldtitle3, text.blue600]}>투표 독촉하기</p>
              </Button>
              <Link
                to=".."
                relative="path"
                replace
                style={{ textDecoration: "none" }}
              >
                <Button w={130} h={38} onClick={terminate}>
                  <p css={[text.boldtitle3, text.blue600]}>투표 종료하기</p>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div css={[column, gap(20), w(300)]}>
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
        </div>
      </div>
    </Modal>
  );
};
