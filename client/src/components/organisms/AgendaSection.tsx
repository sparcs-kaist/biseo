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
  const { ongoingAgendas } = useAgenda(state => ({
    ongoingAgendas: state.agendas.filter(isOngoingAgenda),
  }));

  const ongoingAgendaCards = ongoingAgendas.map(agenda => (
    <OngoingAgendaCard key={agenda.id} agenda={agenda}></OngoingAgendaCard>
  ));

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={4}>진행중인 투표</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          {ongoingAgendaCards}
        </Box>
      </Box>
      <Box dir="column" w={300}>
        <SectionHeader count={2}>종료된 투표</SectionHeader>
        {useAgenda(state =>
          state.agendas
            .filter(isTerminatedAgenda)
            .map(agenda => <AgendaCard agenda={agenda}></AgendaCard>),
        )}
      </Box>
    </Box>
  );
};
