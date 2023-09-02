import React from "react";
import type { PreparingAgenda } from "@biseo/interface/agenda";
import { Box, Card, Text } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules/AgendaTag";

const agendaTags = {
  public: true,
  identified: false,
  votable: true,
};

interface Props {
  agenda: PreparingAgenda;
}

export const PreparingAgendaCard: React.FC<Props> = ({ agenda }) => (
  <Card>
    <Box gap={8}>
      <AgendaTag
        tags={{
          public: agendaTags.public,
          identified: agendaTags.identified,
          votable: agenda.user.votable,
        }}
      />
      <Box gap={2}>
        <Text variant="title2" color="black">
          {agenda.title}
        </Text>
        <Text variant="subtitle" color="gray500">
          {agenda.content}
        </Text>
      </Box>
    </Box>
  </Card>
);
