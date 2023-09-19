import React, { useCallback } from "react";
import type { AgendaStatus } from "@biseo/interface/agenda";
import { AgendaCard } from "@/components/molecules";
import { useAgenda } from "@/services/agenda";
import {
  isOngoingAgenda,
  isTerminatedAgenda,
  isPreparingAgenda,
} from "@/utils/agenda";

import { scroll } from "@/styles";
import { css } from "@emotion/react";

const gridLayout = css`
  display: grid;
  grid-template-columns: 380px 300px;
  grid-template-rows: auto 1fr;
  grid-gap: 15px 20px;

  // Ongoing Agenda
  *:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }

  // Preparing Agenda
  *:nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }

  // Terminated Agenda
  *:nth-child(3) {
    grid-column: 2;
    grid-row: 1 / 3;
  }
`;

export const AgendaSection: React.FC = () => {
  const { preparingAgendas, ongoingAgendas, terminatedAgendas } = useAgenda(
    state => ({
      preparingAgendas: state.agendas.filter(isPreparingAgenda),
      ongoingAgendas: state.agendas.filter(isOngoingAgenda),
      terminatedAgendas: state.agendas.filter(isTerminatedAgenda),
    }),
  );

  const getAgendas = useCallback(
    (agendaStatus: AgendaStatus) => {
      if (agendaStatus === "preparing") return preparingAgendas;
      if (agendaStatus === "ongoing") return ongoingAgendas;
      if (agendaStatus === "terminated") return terminatedAgendas;
      return [];
    },
    [preparingAgendas, ongoingAgendas, terminatedAgendas],
  );

  const getAgendaCards = useCallback(
    (agendaStatus: AgendaStatus) => {
      const agendas = getAgendas(agendaStatus);
      if (agendaStatus === "ongoing") {
        agendas.sort((a, b) => {
          if (a.voters.voted === 0) return -1;
          if (b.voters.voted === 0) return 1;
          return 0;
        });
      }
      return agendas.map(agenda => (
        <AgendaCard key={agenda.id} agenda={agenda} />
      ));
    },
    [preparingAgendas, ongoingAgendas, terminatedAgendas],
  );

  return (
    <section css={scroll.y}>
      <div css={gridLayout}>
        <AgendaCard.Group agendaStatus="ongoing">
          {getAgendaCards("ongoing")}
        </AgendaCard.Group>
        <AgendaCard.Group agendaStatus="preparing">
          {getAgendaCards("preparing")}
        </AgendaCard.Group>
        <AgendaCard.Group agendaStatus="terminated">
          {getAgendaCards("terminated")}
        </AgendaCard.Group>
      </div>
    </section>
  );
};
