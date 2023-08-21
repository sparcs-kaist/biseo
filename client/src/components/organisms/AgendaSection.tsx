import React from "react";
import type {
  Agenda,
  OngoingAgenda,
  TerminatedAgenda,
} from "biseo-interface/agenda";

import { Box } from "@/components/atoms";
import { OngoingAgendaCard, SectionHeader } from "@/components/molecules";
import { AgendaCard } from "@/components/organisms";
import { useAgenda } from "@/services/agenda";

const isTerminatedAgenda = (agenda: Agenda): agenda is TerminatedAgenda => {
  return agenda.status === "terminated";
};

const isOngoingAgenda = (agenda: Agenda): agenda is OngoingAgenda => {
  return agenda.status === "ongoing";
}; // TODO : move to utils

export const AgendaSection: React.FC = () => {
  const { ongoingAgendas, terminatedAgendas } = useAgenda(state => ({
    ongoingAgendas: state.agendas.filter(isOngoingAgenda),
    terminatedAgendas: state.agendas.filter(isTerminatedAgenda),
  }));

  const ongoingAgendaCards = ongoingAgendas.map(agenda => (
    <OngoingAgendaCard key={agenda.id} agenda={agenda} />
  ));
  const terminatedAgendaCards = terminatedAgendas.map(agenda => (
    <AgendaCard agenda={agenda} />
  ));

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={ongoingAgendaCards.length}>
          진행중인 투표
        </SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          {ongoingAgendaCards}
        </Box>
      </Box>
      <Box dir="column" w={300}>
        <SectionHeader count={terminatedAgendaCards.length}>
          종료된 투표
        </SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          {terminatedAgendaCards}
        </Box>
      </Box>
    </Box>
  );
};
