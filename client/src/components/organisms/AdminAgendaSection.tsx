import React from "react";
import type {
  Agenda,
  OngoingAgenda,
  TerminatedAgenda,
} from "biseo-interface/agenda";

import { Box } from "@/components/atoms";
import { AdminOngoingAgendaCard, SectionHeader } from "@/components/molecules";
import { useAgenda } from "@/services/agenda";
import { AdminAgenda } from "biseo-interface/admin/agenda";
import { useAdminAgenda } from "@/services/admin-agenda";
import { AdminTerminatedAgendaCard } from "../molecules/AdminTerminatedAgnedaCard";
import { useNavigate } from "react-router-dom";

const isOngoingAgenda = (agenda: AdminAgenda) => {
  return agenda.status === "ongoing";
};
const isTerminatedAgenda = (agenda: AdminAgenda) => {
  return agenda.status === "terminated";
};
//const navigate = useNavigate();
export const AdminAgendaSection: React.FC = () => {
  const { ongoingAgendas } = useAdminAgenda(state => ({
    ongoingAgendas: state.adminAgendas.filter(isOngoingAgenda),
  }));
  const { terminatedAgendas } = useAdminAgenda(state => ({
    terminatedAgendas: state.adminAgendas.filter(isTerminatedAgenda),
  }));
  const ongoingAgendaCards = ongoingAgendas.map(agenda => (
    <AdminOngoingAgendaCard agenda={agenda} />
  ));
  const terminatedAgendaCards = terminatedAgendas.map(agenda => (
    <div
    // onClick={() => {
    //   navigate("termntated");
    // }}
    >
      <AdminTerminatedAgendaCard agenda={agenda} />
    </div>
  ));
  //const terminatedAgendaCards = terminatedAgendas.map(agenda => <></>);

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
          {terminatedAgendaCards}
          TODO
        </Box>
      </Box>
    </Box>
  );
};
