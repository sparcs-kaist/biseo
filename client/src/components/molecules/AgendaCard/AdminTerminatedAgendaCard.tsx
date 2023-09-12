import React from "react";
import { useNavigate } from "react-router-dom";

import type { AdminAgenda } from "@biseo/interface/admin/agenda";

import { Card } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules/AgendaTag";

import { gap, text } from "@/styles";

const agendaTags = {
  public: true,
  identified: false,
  votable: false,
};

interface Props {
  agenda: AdminAgenda;
}

export const AdminTerminatedAgendaCard: React.FC<Props> = ({ agenda }) => {
  const navigate = useNavigate();
  const openModal = () => navigate(`terminated?agendaId=${agenda.id}`);

  return (
    <Card clickable onClick={openModal}>
      <div css={gap(8)}>
        <AgendaTag
          tags={{
            public: agendaTags.public,
            identified: agendaTags.identified,
            votable: agendaTags.votable,
          }}
        />
        <div css={gap(2)}>
          <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
          <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
        </div>
      </div>
    </Card>
  );
};
