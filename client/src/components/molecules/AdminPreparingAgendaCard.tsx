import React, { useState } from "react";
import { Box, Text, Card, Divider, Button } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules";

import { AdminAgenda } from "biseo-interface/admin/agenda";

const _tags = {
  public: true,
  identified: true,
  votable: true,
};

interface Props {
  agenda: AdminAgenda;
}

export const AdminPreparingAgendaCard: React.FC<Props> = ({ agenda }) => {
  return (
    <Card round={5}>
      <Box gap={8} w="fill">
        <AgendaTag tags={_tags} admin />
        <Box gap={2}>
          <Text variant="title2" color="black">
            {agenda.title}
          </Text>
          <Text variant="subtitle" color="gray500">
            {agenda.content}
          </Text>
        </Box>
        <Divider />
        <Box dir="row" w="fill" gap={8} justify="space-between">
          <Button>
            <Text variant="option1" color="blue600">
              투표 시작하기
            </Text>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
