import React from "react";
import { Box, Card, Text } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules";

import type { PreparingAgenda } from "@biseo/interface/agenda";

const _tags = {
  public: true,
  identified: false,
  votable: true,
};

interface Props {
  agenda: PreparingAgenda;
}

export const PreparingAgendaCard: React.FC<Props> = ({ agenda }) => {
  return (
    <Card>
      <Box gap={8}>
        <AgendaTag
          tags={{
            public: _tags.public,
            identified: _tags.identified,
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
};
