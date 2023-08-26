import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@/components/atoms";
import { AdminSettingSection } from "@/components/organisms";
import { useAgendaTemplate } from "@/services/agenda-template";
import { useUserTag } from "@/services/user-tag";

export const AdminSettingPage: React.FC = () => {
  const { retrieveTemplates } = useAgendaTemplate(state => ({
    retrieveTemplates: state.retrieveAll,
  }));
  const { retrieveTags } = useUserTag(state => ({
    retrieveTags: state.retrieveAll,
  }));

  useEffect(() => {
    retrieveTemplates();
    retrieveTags();
  }, []);

  return (
    <Box
      dir="row"
      w="fill"
      h="fill"
      justify="center"
      padTop={20}
      padBottom={30}
      gap={20}
    >
      <AdminSettingSection />
      <Outlet />
    </Box>
  );
};
