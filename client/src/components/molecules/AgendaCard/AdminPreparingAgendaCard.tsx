import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import type { AdminAgenda } from "@biseo/interface/admin/agenda";
import { Box, Text, Card, Divider, Button } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules/AgendaTag";
import { useAdminAgenda } from "@/services/admin-agenda";

const agendaTags = {
  public: true,
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

  const validated = useMemo(
    () =>
      agenda.title.length > 0 &&
      agenda.content.length > 0 &&
      agenda.resolution.length > 0 &&
      agenda.choices.length > 0 &&
      agenda.voters.total.length > 0,
    [agenda],
  );

  const startVote = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validated) {
      alert("투표 대상을 설정해주세요");
      // TODO: button 아래 card click으로 간주되어 edit modal로의 redirection 때문에 alert가 뜨지 않음
      return;
    }
    e.stopPropagation();
    start();
  };

  return (
    <Card onClick={openModal}>
      <Box gap={8} w="fill">
        <AgendaTag tags={agendaTags} admin />
        <Box gap={2}>
          <Text variant="title2" color="black">
            {agenda.title}
          </Text>
          <Text variant="subtitle" color="gray500">
            {agenda.content}
          </Text>
        </Box>
        <Divider />
        <Button onClick={startVote} disabled={!validated}>
          <Text variant="option1" color="blue600">
            투표 시작하기
          </Text>
        </Button>
      </Box>
    </Card>
  );
};
