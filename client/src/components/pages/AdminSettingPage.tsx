import React, { useEffect } from "react";
import { Box } from "@/components/atoms";
import { AdminUserSection } from "@/components/organisms";
import { Outlet } from "react-router-dom";
import { useAgendaTemplate } from "@/services/agenda-template";

export const AdminSettingPage: React.FC = () => {
  const { retrieveTemplates } = useAgendaTemplate(state => ({
    retrieveTemplates: state.retrieveAll,
  }));

  useEffect(() => {
    retrieveTemplates();
  }, []);

  return (
    <Box dir="row" padTop={20} padBottom={30} gap={20}>
      <AdminUserSection />
      <Outlet />
    </Box>
  );
};
