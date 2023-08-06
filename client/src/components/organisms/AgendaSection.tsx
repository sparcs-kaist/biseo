import React from "react";
import { Box, Card } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import { AgendaCard } from "@/components/organisms";
import { useAgenda } from "@/services/agenda";
import type { Agenda, TerminatedAgenda } from "biseo-interface/agenda";

const isTerminatedAgenda = (agenda: Agenda): agenda is TerminatedAgenda => {
  return agenda.status === "terminated";
};

export const AgendaSection: React.FC = () => {
  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={4}>진행중인 투표</SectionHeader>
        <Card></Card>
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
