import React from "react";
import { useNavigate } from "react-router-dom";

import type { AdminAgenda } from "@biseo/interface/admin/agenda";

import { Card } from "@biseo/web/components/atoms";
import { AgendaTag } from "@biseo/web/components/molecules/AgendaTag";

import { column, gap, text } from "@biseo/web/styles";

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
      <div css={[column, gap(8)]}>
        <AgendaTag
          tags={{
            public: agendaTags.public,
            identified: agendaTags.identified,
            votable: agendaTags.votable,
          }}
        />
        <div css={[column, gap(2)]}>
          <p css={[text.title2, text.black]}>{agenda.title}</p>
          <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
        </div>
      </div>
    </Card>
  );
};
