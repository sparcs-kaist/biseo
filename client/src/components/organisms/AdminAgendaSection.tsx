import React from "react";
import type { Agenda, OngoingAgenda } from "biseo-interface/agenda";

import { Box } from "@/components/atoms";
import { AdminOngoingAgendaCard, SectionHeader } from "@/components/molecules";
import { useAgenda } from "@/services/agenda";

const isOngoingAgenda = (agenda: Agenda): agenda is OngoingAgenda => {
  return agenda.status === "ongoing";
};

export const AdminAgendaSection: React.FC = () => {
  const { ongoingAgendas } = useAgenda(state => ({
    ongoingAgendas: state.agendas.filter(isOngoingAgenda),
  }));

  const ongoingAgendaCards = ongoingAgendas.map(agenda => (
    <AdminOngoingAgendaCard agenda={agenda} />
  ));
  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={300}>
        <SectionHeader count={3}>진행중인 투표</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          {ongoingAgendaCards}
        </Box>
      </Box>
      <Box dir="column" w={300}>
        <SectionHeader count={2}>종료된 투표</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          TODO
        </Box>
      </Box>
    </Box>
  );
};
