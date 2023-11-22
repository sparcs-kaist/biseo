import React from "react";

import type { PreparingAgenda } from "@biseo/interface/agenda";

import { Card } from "@biseo/web/components/atoms";
import { AgendaTag } from "@biseo/web/components/molecules/AgendaTag";

import { column, gap, text } from "@biseo/web/styles";

const agendaTags = {
  public: true,
  identified: false,
  votable: true,
};

interface Props {
  agenda: PreparingAgenda;
}

export const PreparingAgendaCard: React.FC<Props> = ({ agenda }) => (
  <Card>
    <div css={[column, gap(8)]}>
      <AgendaTag
        tags={{
          public: agendaTags.public,
          identified: agendaTags.identified,
          votable: agenda.user.votable,
        }}
      />
      <div css={[column, gap(2)]}>
        <p css={[text.title2, text.black]}>{agenda.title}</p>
        <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
      </div>
    </div>
  </Card>
);
