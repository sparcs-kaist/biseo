import React, { useCallback } from "react";
import { Box } from "@/components/atoms";
import { SectionHeader, AgendaCard } from "@/components/molecules";
import { useAgenda } from "@/services/agenda";
import {
  isOngoingAgenda,
  isTerminatedAgenda,
  isPreparingAgenda,
} from "@/utils/agenda";
import { AgendaStatus } from "biseo-interface/agenda";

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

      if (agendas.length === 0)
        return <AgendaCard.Empty agendaStatus={agendaStatus} />;
      else
        return (
          <AgendaCard.List>
            {agendas.map(agenda => (
              <AgendaCard key={agenda.id} agenda={agenda} />
            ))}
          </AgendaCard.List>
        );
    },
    [preparingAgendas, ongoingAgendas, terminatedAgendas],
  );

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={ongoingAgendas.length}>
          진행중인 투표
        </SectionHeader>
        {getAgendaCards("ongoing")}
        <SectionHeader count={preparingAgendas.length}>
          예정된 투표
        </SectionHeader>
        {getAgendaCards("preparing")}
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
