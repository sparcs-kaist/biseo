import React from "react";

import type { PreparingAgenda } from "@biseo/interface/agenda";

import { Card } from "@biseo/web/components/atoms";
import { AgendaTag } from "@biseo/web/components/molecules/AgendaTag";

import { column, gap, text } from "@biseo/web/styles";

interface Props {
  agenda: PreparingAgenda;
}

export const PreparingAgendaCard: React.FC<Props> = ({ agenda }) => (
  <Card>
    <div css={[column, gap(8)]}>
      <AgendaTag
        tags={{
          public: agenda.type.public,
          identified: agenda.type.named,
          votable: agenda.user.votable,
        }}
      />
      <div css={[column, gap(2)]}>
        <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
        <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
      </div>
    </div>
  </Card>
);
