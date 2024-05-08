import React from "react";
import { useNavigate } from "react-router-dom";

import type { AdminAgenda } from "@biseo/interface/admin/agenda";

import { Card } from "@biseo/web/components/atoms";
import { AgendaTag } from "@biseo/web/components/molecules/AgendaTag";

import { align, column, gap, justify, row, text, w } from "@biseo/web/styles";
import { formatDateSimple } from "@biseo/web/utils/format";

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
      <div css={[column, gap(8), w("fill")]}>
        <div css={[row, justify.between, align.center]}>
          <AgendaTag
            tags={{
              public: agendaTags.public,
              identified: agendaTags.identified,
              votable: agendaTags.votable,
            }}
          />
          <p css={[text.subtitle, text.gray400]}>
            {formatDateSimple(agenda.endAt)}
          </p>
        </div>
        <div css={[column, gap(2)]}>
          <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
          <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
        </div>
      </div>
    </Card>
  );
};
