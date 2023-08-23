import React, { useEffect } from "react";
import { Box } from "@/components/atoms";
import {
  AdminAgendaSection,
  AgendaSection,
  ChatSection,
  UserTable,
} from "@/components/organisms";
import { useAgenda } from "@/services/agenda";
import { User } from "biseo-interface/user";

export const MainPage: React.FC = () => {
  const { retrieveAgendas } = useAgenda(state => ({
    retrieveAgendas: state.retrieveAgendas,
  }));

  useEffect(() => {
    retrieveAgendas();
  }, []);

  return (
    <Box dir="row" padTop={10} padBottom={30} gap={20}>
      {/*<AgendaSection/>*/}
      {/*<ChatSection/>*/}
      <UserTable />
    </Box>
  );
};
