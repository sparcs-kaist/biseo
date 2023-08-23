import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Card, Divider, Button } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules";

import type { AdminAgenda } from "@biseo/interface/admin/agenda";
import { useAdminAgenda } from "@/services/admin-agenda";

const _tags = {
  public: false,
  identified: false,
  votable: true,
};

interface Props {
  agenda: AdminAgenda;
}

export const AdminPreparingAgendaCard: React.FC<Props> = ({ agenda }) => {
  const navigate = useNavigate();
  const openModal = () => navigate(`edit?agendaId=${agenda.id}`);

  const { startAgenda } = useAdminAgenda(state => ({
    startAgenda: state.statusUpdate,
  }));

  const start = () => {
    startAgenda(agenda.id, "ongoing");
  };

  return (
    <Card onClick={openModal}>
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
          <Button
            onClick={e => {
              e.stopPropagation();
              start();
            }}
          >
            <Text variant="option1" color="blue600">
              투표 시작하기
            </Text>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
