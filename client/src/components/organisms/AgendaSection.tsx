import React from "react";
import { Box, Card } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import { AgendaCard } from "@/components/organisms";

export const AgendaSection: React.FC = () => {
  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={4}>진행중인 투표</SectionHeader>
        <Card></Card>
      </Box>
      <Box dir="column" w={300}>
        <SectionHeader count={2}>종료된 투표</SectionHeader>
        <AgendaCard></AgendaCard>
      </Box>
    </Box>
  );
};
