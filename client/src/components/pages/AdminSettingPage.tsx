import React, { useEffect } from "react";
import { Box } from "@/components/atoms";
import { AdminUserSection } from "@/components/organisms";
import { Link, Outlet } from "react-router-dom";
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
      <Link to="templateEdit">New! - 탬플릿 수정으로 갈 자는 나에게...</Link>
      <Link to="templateCreate">New! - 탬플릿 생성으로 갈 자는 나에게...</Link>
    </Box>
  );
};
