import React from "react";
import { Box } from "@/components/atoms";
import { AdminUserSection } from "../organisms/AdminUserSection";

export const AdminSettingPage: React.FC = () => (
  <Box dir="row" padTop={20} padBottom={30} gap={20}>
    <AdminUserSection />
  </Box>
);
