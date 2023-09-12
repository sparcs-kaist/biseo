import React from "react";
import { useNavigate } from "react-router-dom";

import type { AdminAgenda } from "@biseo/interface/admin/agenda";

import { Card, Divider, ProgressBar, Button } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules/AgendaTag";

import { useAdminAgenda } from "@/services/admin-agenda";

import { row, center, justify, gap, text, w } from "@/styles";

const agendaTags = {
  public: true,
  identified: false,
  votable: true,
};

interface Props {
  agenda: AdminAgenda;
}

export const AdminOngoingAgendaCard: React.FC<Props> = ({ agenda }) => {
  const navigate = useNavigate();

  const openModal = () => navigate(`ongoing?agendaId=${agenda.id}`);

  const { remindAgenda, terminateAgenda } = useAdminAgenda(state => ({
    remindAgenda: state.remindAgenda,
    terminateAgenda: state.statusUpdate,
  }));

  const remind = () => {
    remindAgenda(agenda.id);
  };
  const terminate = () => {
    terminateAgenda(agenda.id, "terminated");
  };

  return (
    <Card onClick={openModal}>
      <div css={[gap(8), w("fill")]}>
        <AgendaTag tags={agendaTags} admin />
        <div css={gap(2)}>
          <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
          <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
        </div>
        <div css={[row, center, justify.between, w("fill")]}>
          <ProgressBar
            max={agenda.voters.total.length}
            value={agenda.voters.voted.length}
          />
          <p css={[text.option1, text.gray500]}>
            투표참여 {agenda.voters.voted.length}/{agenda.voters.total.length}
          </p>
        </div>
        <Divider />
        <div css={[row, justify.between, gap(8), w("fill")]}>
          <Button
            onClick={e => {
              e.stopPropagation();
              remind();
            }}
          >
            <p css={[text.option1, text.blue600]}>투표 독촉하기</p>
          </Button>
          <Button
            onClick={e => {
              e.stopPropagation();
              terminate();
            }}
          >
            <p css={[text.option1, text.blue600]}>투표 종료하기</p>
          </Button>
        </div>
      </div>
    </Card>
  );
};
