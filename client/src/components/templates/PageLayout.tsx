import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@/components/atoms";
import { Header } from "@/components/organisms";

export const PageLayout: React.FC = () => (
  <>
    <Header />
    <Box align="center" justify="center" w="fill">
      <Outlet />
    </Box>
  </>
);
