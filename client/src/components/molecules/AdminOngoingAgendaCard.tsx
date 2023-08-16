import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Card,
  Divider,
  ProgressBar,
  Button,
} from "@/components/atoms";
import { AgendaTag } from "@/components/molecules";

import { AdminAgenda } from "biseo-interface/admin/agenda";
import { useAdminAgenda } from "@/services/admin-agenda";

const _tags = {
  public: false,
  identified: false,
  votable: true,
};

interface Props {
  agenda: AdminAgenda;
}

export const AdminOngoingAgendaCard: React.FC<Props> = ({ agenda }) => {
  const navigate = useNavigate();

  const openModal = () => navigate(`ongoing?agendaId=${agenda.id}`);

  const { remindAgenda, terminateAgenda } = useAdminAgenda(state => ({
    remindAgenda: state.remindAgenda,
    terminateAgenda: state.statusUpdate,
  }));

  const remind = () => {
    remindAgenda(agenda.id);
  };
  const terminate = () => {
    terminateAgenda(agenda.id, "terminated");
  };

  return (
    <Card round={5} onClick={openModal}>
      <Box gap={8} w="fill">
        <AgendaTag tags={_tags} admin />
        <Box>
          <Text variant="title2" color="black">
            {agenda.title}
          </Text>
          <Text variant="subtitle" color="gray500">
            {agenda.content}
          </Text>
        </Box>
        <Box dir="row" w="fill" align="center" justify="space-between">
          <ProgressBar
            max={agenda.voters.total.length}
            value={agenda.voters.voted.length}
          />
          <Text variant="option1" color="gray500">
            투표참여 {agenda.voters.voted.length}/{agenda.voters.total.length}
          </Text>
        </Box>
        <Divider />
        <Box dir="row" w="fill" gap={8} justify="space-between">
          <Button
            onClick={e => {
              e.stopPropagation();
              remind();
            }}
          >
            <Text variant="option1" color="blue600">
              투표 독촉하기
            </Text>
          </Button>
          <Button
            onClick={e => {
              e.stopPropagation();
              terminate();
            }}
          >
            <Text variant="option1" color="blue600">
              투표 종료하기
            </Text>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
