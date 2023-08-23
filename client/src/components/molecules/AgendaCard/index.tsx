import React from "react";

import { Agenda } from "biseo-interface/agenda";
import { List } from "./List";
import { EmptyAgendaCard } from "./EmptyAgendaCard";
import { OngoingAgendaCard } from "./OngoingAgendaCard";
import { PreparingAgendaCard } from "./PreparingAgendaCard";
import { TerminatedAgendaCard } from "./TerminatedAgendaCard";

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

export const AgendaCard = Object.assign(Component, {
  List,
  Empty: EmptyAgendaCard,
});
