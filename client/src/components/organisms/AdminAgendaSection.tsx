import React from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Agenda, OngoingAgenda } from "biseo-interface/agenda";
import { PlusIcon } from "@/assets";

import { Box, Button, NewAgendaButton, Text } from "@/components/atoms";
import {
  AdminOngoingAgendaCard,
  AdminPreparingAgendaCard,
  SectionHeader,
} from "@/components/molecules";
import { AdminAgenda } from "biseo-interface/admin/agenda";
import { useAdminAgenda } from "@/services/admin-agenda";
import { CreateAgendaModal } from "./CreateAgendaModal";
import { EditAgendaModal } from "./EditAgendaModal";
import { AdminTerminatedAgendaCard } from "@/components/molecules/AdminTerminatedAgendaCard";


const isOngoingAgenda = (agenda: AdminAgenda) => {
  return agenda.status === "ongoing";
};

const isPreparingAgenda = (agenda: AdminAgenda) => {
  return agenda.status === "preparing";
};
const isTerminatedAgenda = (agenda: AdminAgenda) => {
  return agenda.status === "terminated";
};

export const AdminAgendaSection: React.FC = () => {
  const navigate = useNavigate();
  const openModal = () => navigate(`create`);

  const { preparingAgendas } = useAdminAgenda(state => ({
    preparingAgendas: state.adminAgendas.filter(isPreparingAgenda),
  }));
  const { ongoingAgendas } = useAdminAgenda(state => ({
    ongoingAgendas: state.adminAgendas.filter(isOngoingAgenda),
  }));
  const { terminatedAgendas } = useAdminAgenda(state => ({
    terminatedAgendas: state.adminAgendas.filter(isTerminatedAgenda),
  }));
  
  const ongoingAgendaCards = ongoingAgendas.map(agenda => (
    <AdminOngoingAgendaCard agenda={agenda} />
  ));
  const preparingAgendaCards = preparingAgendas.map(agenda => (
    <AdminPreparingAgendaCard agenda={agenda} />
  ));
  const terminatedAgendaCards = terminatedAgendas.map(agenda => (
    <AdminTerminatedAgendaCard agenda={agenda} />
  ));

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={300}>
        <SectionHeader count={3}>대기중인 투표</SectionHeader>

        <Box dir="column" w="fill" gap={15}>
          <Box dir="column" w="fill" gap={15}>
            <NewAgendaButton onClick={openModal}>
              <Text color="gray500" variant="body">
                <PlusIcon></PlusIcon> 새로운 투표
              </Text>
            </NewAgendaButton>
          </Box>
          {preparingAgendaCards}
        </Box>
      </Box>
      <Box dir="column" w={300}>
        <SectionHeader count={3}>진행중인 투표</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          {ongoingAgendaCards}
        </Box>
      </Box>
      <Box dir="column" w={300}>
        <SectionHeader count={2}>종료된 투표</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          {terminatedAgendaCards}
        </Box>
      </Box>
      {/* <EditAgendaModal /> */}
    </Box>
  );
};
