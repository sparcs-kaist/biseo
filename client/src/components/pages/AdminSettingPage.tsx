import React from "react";
import { Box } from "@/components/atoms";

export const AdminSettingPage: React.FC = () => (
  <Box dir="row" padTop={20} padBottom={30} gap={20}>
    <Box w={380} h="fill">
      Section 1
    </Box>
    <Box w={380} h="fill">
      Section 2
    </Box>
  </Box>
);
