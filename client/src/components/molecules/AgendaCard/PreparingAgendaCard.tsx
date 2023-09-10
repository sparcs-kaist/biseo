import React from "react";

import type { PreparingAgenda } from "@biseo/interface/agenda";

import { Card } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules/AgendaTag";

import { gap, text } from "@/styles";

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
    <div css={gap(8)}>
      <AgendaTag
        tags={{
          public: agendaTags.public,
          identified: agendaTags.identified,
          votable: agenda.user.votable,
        }}
      />
      <div css={gap(2)}>
        <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
        <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
      </div>
    </div>
  </Card>
);
