import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Box } from "@/components/atoms";

export const AdminAgendaPage: React.FC = () => (
  <Box dir="row" padTop={20} padBottom={30} gap={20}>
    <Box w={300} h="fill">
      Section 1<br />
      <Link to="create" replace>
        create
      </Link>
      <Link to="edit" replace>
        edit
      </Link>
      <Link to="ongoing" replace>
        ongoing
      </Link>
      <Link to="terminated" replace>
        terminated
      </Link>
    </Box>
    <Box w={300} h="fill">
      Section 2
    </Box>
    <Box w={300} h="fill">
      Section 3
    </Box>
    <Outlet />
  </Box>
);
