import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Box } from "@/components/atoms";
import { AdminAgendaSection } from "@/components/organisms";
import { useAgenda } from "@/services/agenda";
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
      {/* <Box w={300} h="fill">
        Section 1<br />
        <Link to="create" replace>
          create
        </Link>
        <Link to="edit" replace>
          editS
        </Link>
        <Link to="ongoing" replace>
          ongoing
        </Link>
        <Link to="terminated" replace>
          terminated
        </Link>
      </Box> */}
      <AdminAgendaSection />
      <Outlet />
    </Box>
  );
};
