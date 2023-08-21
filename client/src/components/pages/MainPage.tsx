import React, { useEffect } from "react";
import { Box } from "@/components/atoms";
import {
  AdminAgendaSection,
  AgendaSection,
  ChatSection,
} from "@/components/organisms";
import { useAgenda } from "@/services/agenda";

export const MainPage: React.FC = () => {
  const { retrieveAgendas } = useAgenda(state => ({
    retrieveAgendas: state.retrieveAgendas,
  }));

  useEffect(() => {
    retrieveAgendas();
  }, []);

  return (
    <Box dir="row" padTop={10} padBottom={30} gap={20}>
      <AgendaSection />
      <ChatSection />
    </Box>
  );
};
