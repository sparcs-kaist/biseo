import React, { useCallback, useState } from "react";
import type { AgendaStatus } from "@biseo/interface/agenda";
import { AgendaCard } from "@biseo/web/components/molecules";
import { useAgenda } from "@biseo/web/services/agenda";
import {
  isOngoingAgenda,
  isTerminatedAgenda,
  isPreparingAgenda,
} from "@biseo/web/utils/agenda";

import { scroll } from "@biseo/web/styles";
import { css } from "@emotion/react";

// for test

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
  const [showRecentAgendasOnly, setShowRecentAgendasOnly] = useState(
    localStorage.getItem("showRecentAgendasOnly") === "true",
  );

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
      if (agendaStatus === "ongoing") {
        return ongoingAgendas.sort((a, b) => +a.voters.voted - +b.voters.voted);
      }

      if (agendaStatus === "terminated") {
        const recent24Hours = new Date();
        recent24Hours.setDate(new Date().getDate() - 1);
        return showRecentAgendasOnly
          ? terminatedAgendas.filter(
              agenda => new Date(agenda.endAt) > recent24Hours,
            )
          : terminatedAgendas;
      }
      return [];
    },
    [preparingAgendas, ongoingAgendas, terminatedAgendas],
  );

  const getAgendaCards = useCallback(
    (agendaStatus: AgendaStatus) => {
      const agendas = getAgendas(agendaStatus);
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
        <AgendaCard.Group
          agendaStatus="terminated"
          recentOnly={showRecentAgendasOnly}
          handleRecentOnly={() => {
            setShowRecentAgendasOnly(curr => !curr);
            localStorage.setItem(
              "showRecentAgendasOnly",
              String(!showRecentAgendasOnly),
            );
          }}
        >
          {getAgendaCards("terminated")}
        </AgendaCard.Group>
      </div>
    </section>
  );
};
