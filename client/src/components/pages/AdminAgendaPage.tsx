import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@/components/atoms";
import { AdminAgendaSection } from "@/components/organisms";
import { useAdminAgenda } from "@/services/admin-agenda";

export const AdminAgendaPage: React.FC = () => {
  const { retrieveAgendas } = useAdminAgenda(state => ({
    retrieveAgendas: state.retrieveAll,
  }));

  useEffect(() => {
    retrieveAgendas();
  }, []);

  return (
    <Box dir="row" padTop={20} padBottom={30} gap={20}>
      <AdminAgendaSection />
      <Outlet />
    </Box>
  );
};
