import React from "react";
import { Box } from "@/components/atoms";

export const AdminAgendaPage: React.FC = () => (
  <Box dir="row" padTop={20} padBottom={30} gap={20}>
    <Box w={300} h="fill">
      Section 1
    </Box>
    <Box w={300} h="fill">
      Section 2
    </Box>
    <Box w={300} h="fill">
      Section 3
    </Box>
  </Box>
);
