import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@/components/atoms";
import {
  SectionHeader,
  AddButtonCard,
  AgendaCard,
} from "@/components/molecules";
import { useAdminAgenda } from "@/services/admin-agenda";
import {
  isOngoingAgenda,
  isPreparingAgenda,
  isTerminatedAgenda,
} from "@/utils/agenda";
import { AdminAgendaStatus } from "@biseo/interface/admin/agenda";

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

      return (
        <AgendaCard.List>
          {agendaStatus === "preparing" && (
            <AddButtonCard content="새로운 투표" onClick={openModal} />
          )}
          {agendas.length === 0 ? (
            <AgendaCard.Empty agendaStatus={agendaStatus} />
          ) : (
            agendas.map(agenda => (
              <AgendaCard.Admin key={agenda.id} agenda={agenda} />
            ))
          )}
        </AgendaCard.List>
      );
    },
    [preparingAgendas, ongoingAgendas, terminatedAgendas],
  );

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={300}>
        <SectionHeader count={preparingAgendas.length}>
          예정된 투표
        </SectionHeader>
        {getAgendaCards("preparing")}
      </Box>
      <Box dir="column" w={300}>
        <SectionHeader count={ongoingAgendas.length}>
          진행중인 투표
        </SectionHeader>
        {getAgendaCards("ongoing")}
      </Box>
      <Box dir="column" w={300}>
        <SectionHeader count={terminatedAgendas.length}>
          종료된 투표
        </SectionHeader>
        {getAgendaCards("terminated")}
      </Box>
    </Box>
  );
};
