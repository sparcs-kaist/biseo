import React from "react";
import { Box } from "@/components/atoms";
import {
  AgendaEmpty,
  OngoingAgendaCard,
  SectionHeader,
  PreparingAgendaCard,
} from "@/components/molecules";
import { TerminatedAgendaCard } from "@/components/organisms";
import { useAgenda } from "@/services/agenda";
import {
  isOngoingAgenda,
  isTerminatedAgenda,
  isPreparingAgenda,
} from "@/utils/agenda";

export const AgendaSection: React.FC = () => {
  const { preparingAgendas, ongoingAgendas, terminatedAgendas } = useAgenda(
    state => ({
      preparingAgendas: state.agendas.filter(isPreparingAgenda),
      ongoingAgendas: state.agendas.filter(isOngoingAgenda),
      terminatedAgendas: state.agendas.filter(isTerminatedAgenda),
    }),
  );

  const preparingAgendaCards = preparingAgendas.map(agenda => (
    <PreparingAgendaCard key={agenda.id} agenda={agenda} />
  ));
  const ongoingAgendaCards = ongoingAgendas.map(agenda => (
    <OngoingAgendaCard key={agenda.id} agenda={agenda} />
  ));
  const terminatedAgendaCards = terminatedAgendas.map(agenda => (
    <TerminatedAgendaCard key={agenda.id} agenda={agenda} />
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
