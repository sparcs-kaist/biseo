import React from "react";
import { Box, Card } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { OngoingAgendaCard } from "../molecules/OngoingAgendaCard";
import { Agenda, OngoingAgenda } from "biseo-interface/agenda";
import { useAgenda } from "@/services/agenda";

const isOngoingAgenda = (agenda: Agenda): agenda is OngoingAgenda => {
  return agenda.status === "ongoing";
};

export const AgendaSection: React.FC = () => {
  const { ongoingAgendas } = useAgenda(state => ({
    ongoingAgendas: state.agendas.filter(isOngoingAgenda),
  }));

  const ongolingAgendaCards = ongoingAgendas.map((agenda, id) => (
    <OngoingAgendaCard key={id} agenda={agenda}></OngoingAgendaCard>
  ));

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={4}>진행중인 투표</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          {ongolingAgendaCards}
        </Box>
      </Box>
      <Box dir="column" w={300}>
        <SectionHeader count={2}>종료된 투표</SectionHeader>
        <Card>qwer</Card>
      </Box>
    </Box>
  );
};
