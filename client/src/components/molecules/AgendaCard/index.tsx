import React from "react";

import { Agenda } from "@biseo/interface/agenda";
import { List } from "./List";
import { EmptyAgendaCard } from "./EmptyAgendaCard";
import { OngoingAgendaCard } from "./OngoingAgendaCard";
import { PreparingAgendaCard } from "./PreparingAgendaCard";
import { TerminatedAgendaCard } from "./TerminatedAgendaCard";
import { AdminOngoingAgendaCard } from "./AdminOngoingAgendaCard";
import { AdminAgenda } from "@biseo/interface/admin/agenda";
import { AdminPreparingAgendaCard } from "./AdminPreparingAgendaCard";
import { AdminTerminatedAgendaCard } from "./AdminTerminatedAgendaCard";

interface Props {
  agenda: Agenda;
}

const Component: React.FC<Props> = ({ agenda }) => {
  if (agenda.status === "ongoing") return <OngoingAgendaCard agenda={agenda} />;
  else if (agenda.status === "preparing")
    return <PreparingAgendaCard agenda={agenda} />;
  else if (agenda.status === "terminated")
    return <TerminatedAgendaCard agenda={agenda} />;
  else return null;
};

interface AdminProps {
  agenda: AdminAgenda;
}

const AdminAgendaCard: React.FC<AdminProps> = ({ agenda }) => {
  if (agenda.status === "ongoing")
    return <AdminOngoingAgendaCard agenda={agenda} />;
  else if (agenda.status === "preparing")
    return <AdminPreparingAgendaCard agenda={agenda} />;
  else if (agenda.status === "terminated")
    return <AdminTerminatedAgendaCard agenda={agenda} />;
  else return null;
};

export const AgendaCard = Object.assign(Component, {
  List,
  Empty: EmptyAgendaCard,
  Admin: AdminAgendaCard,
});
