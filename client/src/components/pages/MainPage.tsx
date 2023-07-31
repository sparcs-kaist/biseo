import React from "react";
import { Box } from "@/components/atoms";
import { AgendaFoldedTest, AgendaSection, ChatSection } from "@/components/organisms";

export const MainPage: React.FC = () => (
  <Box dir="row" padTop={10} padBottom={30} gap={20}>
    <AgendaFoldedTest />
  </Box>
);
