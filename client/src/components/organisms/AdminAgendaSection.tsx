import React from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@/components/atoms";
import {
  AdminOngoingAgendaCard,
  AdminPreparingAgendaCard,
  SectionHeader,
  AddButton,
  AdminTerminatedAgendaCard,
} from "@/components/molecules";
import { useAdminAgenda } from "@/services/admin-agenda";
import {
  isOngoingAgenda,
  isPreparingAgenda,
  isTerminatedAgenda,
} from "@/utils/agenda";

export const AdminAgendaSection: React.FC = () => {
  const navigate = useNavigate();
  const openModal = () => navigate(`create`);

  const { preparingAgendas, ongoingAgendas, terminatedAgendas } =
    useAdminAgenda(state => ({
      ongoingAgendas: state.adminAgendas.filter(isOngoingAgenda),
      terminatedAgendas: state.adminAgendas.filter(isTerminatedAgenda),
      preparingAgendas: state.adminAgendas.filter(isPreparingAgenda),
    }));

  const preparingAgendaCards = preparingAgendas.map(agenda => (
    <AdminPreparingAgendaCard key={agenda.id} agenda={agenda} />
  ));
  const ongoingAgendaCards = ongoingAgendas.map(agenda => (
    <AdminOngoingAgendaCard key={agenda.id} agenda={agenda} />
  ));
  const terminatedAgendaCards = terminatedAgendas.map(agenda => (
    <AdminTerminatedAgendaCard key={agenda.id} agenda={agenda} />
  ));

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={300}>
        <SectionHeader count={preparingAgendaCards.length}>
          예정된 투표
        </SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          <Box dir="column" w="fill" gap={15}>
            <AddButton content="새로운 투표" onClick={openModal} />
          </Box>
          {preparingAgendaCards}
        </Box>
      </Box>
      <Box dir="column" w={300}>
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
