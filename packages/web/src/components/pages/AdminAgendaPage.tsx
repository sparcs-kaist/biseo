import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, Scroll } from "@biseo/web/components/atoms";
import { AdminAgendaSection } from "@biseo/web/components/organisms";
import { useAdminAgenda } from "@biseo/web/services/admin-agenda";
import { useAgendaTemplate } from "@biseo/web/services/agenda-template";

export const AdminAgendaPage: React.FC = () => {
  const { retrieveAgendas } = useAdminAgenda(state => ({
    retrieveAgendas: state.retrieveAll,
  }));
  const { retrieveTemplates } = useAgendaTemplate(state => ({
    retrieveTemplates: state.retrieveAll,
  }));
  useEffect(() => {
    retrieveAgendas();
    retrieveTemplates();
  }, []);

  return (
    <Scroll>
      <Box
        dir="row"
        w="fill"
        justify="center"
        padTop={20}
        padBottom={30}
        gap={20}
      >
        <AdminAgendaSection />
        <Outlet />
      </Box>
    </Scroll>
  );
};
