import React from "react";

import type { PreparingAgenda } from "@biseo/interface/agenda";

import { Box, Card } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules/AgendaTag";

import { text } from "@/styles";

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
    <Box css={{ gap: 8, width: "-webkit-fill-available" }}>
      <AgendaTag
        tags={{
          public: agendaTags.public,
          identified: agendaTags.identified,
          votable: agenda.user.votable,
        }}
      />
      <Box css={{ gap: 2, display: "grid" }}>
        <h1 css={[text.title2, text.black]}>{agenda.title}</h1>
        <p css={[text.subtitle, text.gray500]}>{agenda.content}</p>
      </Box>
    </Box>
  </Card>
);
