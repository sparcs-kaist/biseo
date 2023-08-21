import React from "react";
import {
  Agenda,
  OngoingAgenda,
  PreparingAgenda,
  TerminatedAgenda,
} from "biseo-interface/agenda";

import { Box } from "@/components/atoms";
import {
  AgendaEmpty,
  OngoingAgendaCard,
  SectionHeader,
} from "@/components/molecules";
import { TerminatedAgendaCard } from "@/components/organisms";
import { useAgenda } from "@/services/agenda";
import { PreparingAgendaCard } from "../molecules/PreparingAgendaCard";

const isTerminatedAgenda = (agenda: Agenda): agenda is TerminatedAgenda => {
  return agenda.status === "terminated";
};

const isOngoingAgenda = (agenda: Agenda): agenda is OngoingAgenda => {
  return agenda.status === "ongoing";
}; // TODO : move to utils

const preparingAgenda = (agenda: Agenda): agenda is PreparingAgenda => {
  return agenda.status === "preparing";
}; // TODO : move to utils

export const AgendaSection: React.FC = () => {
  const { ongoingAgendas, terminatedAgendas, preparingAgendas } = useAgenda(
    state => ({
      ongoingAgendas: state.agendas.filter(isOngoingAgenda),
      terminatedAgendas: state.agendas.filter(isTerminatedAgenda),
      preparingAgendas: state.agendas.filter(preparingAgenda),
    }),
  );
  const ongoingAgendaCards = ongoingAgendas.map(agenda => (
    <OngoingAgendaCard key={agenda.id} agenda={agenda} />
  ));
  const terminatedAgendaCards = terminatedAgendas.map(agenda => (
    <TerminatedAgendaCard key={agenda.id} agenda={agenda} />
  ));
  const preparingAgendaCards = preparingAgendas.map(agenda => (
    <PreparingAgendaCard agenda={agenda} />
  ));

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={ongoingAgendaCards.length}>
          진행중인 투표
        </SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          {ongoingAgendaCards.length != 0 ? (
            ongoingAgendaCards
          ) : (
            <AgendaEmpty agendaType="ongoing" />
          )}
        </Box>
        <SectionHeader count={preparingAgendaCards.length}>
          예정된 투표
        </SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          {preparingAgendaCards.length != 0 ? (
            preparingAgendaCards
          ) : (
            <AgendaEmpty agendaType="preparing" />
          )}
        </Box>
      </Box>
      <Box dir="column" w={300}>
        <SectionHeader count={terminatedAgendaCards.length}>
          종료된 투표
        </SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          {terminatedAgendaCards.length != 0 ? (
            terminatedAgendaCards
          ) : (
            <AgendaEmpty agendaType="terminated" />
          )}
        </Box>
      </Box>
    </Box>
  );
};
