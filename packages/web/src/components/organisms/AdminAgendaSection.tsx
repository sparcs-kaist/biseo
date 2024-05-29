import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import type { AdminAgendaStatus } from "@biseo/interface/admin/agenda";
import { AddButtonCard, AgendaCard } from "@biseo/web/components/molecules";
import { useAdminAgenda } from "@biseo/web/services/admin-agenda";
import {
  isOngoingAgenda,
  isPreparingAgenda,
  isTerminatedAgenda,
} from "@biseo/web/utils/agenda";

import { scroll } from "@biseo/web/styles";
import { css } from "@emotion/react";

const gridLayout = css`
  display: grid;
  grid-template-columns: 300px 300px 300px;
  grid-template-rows: auto 1fr;
  grid-gap: 15px 20px;

  // Preparing Agenda
  *:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }

  // Ongoing Agenda
  *:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
  }

  // Terminated Agenda
  *:nth-child(3) {
    grid-column: 3;
    grid-row: 1;
  }
`;

export const AdminAgendaSection: React.FC = () => {
  const navigate = useNavigate();
  const openModal = () => navigate(`create`);

  const { preparingAgendas, ongoingAgendas, terminatedAgendas } =
    useAdminAgenda(state => ({
      ongoingAgendas: state.adminAgendas.filter(isOngoingAgenda),
      terminatedAgendas: state.adminAgendas.filter(isTerminatedAgenda),
      preparingAgendas: state.adminAgendas.filter(isPreparingAgenda),
    }));

  const getAgendas = useCallback(
    (agendaStatus: AdminAgendaStatus) => {
      if (agendaStatus === "preparing") return preparingAgendas;
      if (agendaStatus === "ongoing") return ongoingAgendas;
      if (agendaStatus === "terminated") return terminatedAgendas;
      return [];
    },
    [preparingAgendas, ongoingAgendas, terminatedAgendas],
  );

  const getAgendaCards = useCallback(
    (agendaStatus: AdminAgendaStatus) => {
      const agendas = getAgendas(agendaStatus);
      return agendas.map(agenda => (
        <AgendaCard.Admin key={agenda.id} agenda={agenda} />
      ));
    },
    [preparingAgendas, ongoingAgendas, terminatedAgendas],
  );

  return (
    <section css={scroll.y}>
      <div css={gridLayout}>
        <AgendaCard.Group agendaStatus="preparing" admin>
          <AddButtonCard content="새로운 투표" onClick={openModal} />
          {getAgendaCards("preparing")}
        </AgendaCard.Group>
        <AgendaCard.Group agendaStatus="ongoing" admin>
          {getAgendaCards("ongoing")}
        </AgendaCard.Group>
        <AgendaCard.Group agendaStatus="terminated" admin>
          {getAgendaCards("terminated")}
        </AgendaCard.Group>
      </div>
    </section>
  );
};
