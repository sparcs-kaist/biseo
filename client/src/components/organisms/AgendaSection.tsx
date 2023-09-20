import React, { useCallback } from "react";
import type { AgendaStatus } from "@biseo/interface/agenda";
import { AgendaCard } from "@/components/molecules";
import { useAgenda } from "@/services/agenda";
import {
  isOngoingAgenda,
  isTerminatedAgenda,
  isPreparingAgenda,
} from "@/utils/agenda";

import { gap, scroll, column } from "@/styles";
import { css } from "@emotion/react";

const gridLayout = css`
  display: grid;
  grid-template-columns: 380px 300px;
  grid-gap: 15px 20px;
  grid-template-rows: auto 1fr;

  // Ongoing Agenda, Preparing Agenda
  *:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }

  // Terminated Agenda
  *:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
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
      return agendas.length === 0 ? (
        <AgendaCard.Empty agendaStatus={agendaStatus} />
      ) : (
        agendas.map(agenda => <AgendaCard key={agenda.id} agenda={agenda} />)
      );
    },
    [preparingAgendas, ongoingAgendas, terminatedAgendas],
  );

  return (
    <section css={scroll.y}>
      <div css={gridLayout}>
        <div css={[gap(20), column]}>
          <AgendaCard.Group title="진행중인 투표">
            {getAgendaCards("ongoing")}
          </AgendaCard.Group>
          <AgendaCard.Group title="예정된 투표">
            {getAgendaCards("preparing")}
          </AgendaCard.Group>
        </div>
        <AgendaCard.Group title="종료된 투표">
          {getAgendaCards("terminated")}
        </AgendaCard.Group>
      </div>
    </section>
  );
};
