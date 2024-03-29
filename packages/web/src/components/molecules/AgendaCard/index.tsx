import React from "react";

import type { AdminAgenda } from "@biseo/interface/admin/agenda";
import type { Agenda } from "@biseo/interface/agenda";
import { Group } from "./Group";
import { List } from "./List";
import { EmptyAgendaCard } from "./EmptyAgendaCard";
import { OngoingAgendaCard } from "./OngoingAgendaCard";
import { PreparingAgendaCard } from "./PreparingAgendaCard";
import { TerminatedAgendaCard } from "./TerminatedAgendaCard";
import { AdminOngoingAgendaCard } from "./AdminOngoingAgendaCard";
import { AdminPreparingAgendaCard } from "./AdminPreparingAgendaCard";
import { AdminTerminatedAgendaCard } from "./AdminTerminatedAgendaCard";

interface Props {
  agenda: Agenda;
}

const Component: React.FC<Props> = ({ agenda }) => {
  if (agenda.status === "ongoing") return <OngoingAgendaCard agenda={agenda} />;
  if (agenda.status === "preparing")
    return <PreparingAgendaCard agenda={agenda} />;
  if (agenda.status === "terminated")
    return <TerminatedAgendaCard agenda={agenda} />;
  return null;
};

interface AdminProps {
  agenda: AdminAgenda;
}

const AdminAgendaCard: React.FC<AdminProps> = ({ agenda }) => {
  if (agenda.status === "ongoing")
    return <AdminOngoingAgendaCard agenda={agenda} />;
  if (agenda.status === "preparing")
    return <AdminPreparingAgendaCard agenda={agenda} />;
  if (agenda.status === "terminated")
    return <AdminTerminatedAgendaCard agenda={agenda} />;
  return null;
};

export const AgendaCard = Object.assign(Component, {
  Group,
  List,
  Empty: EmptyAgendaCard,
  Admin: AdminAgendaCard,
});
