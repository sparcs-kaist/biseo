import React, { useState, useMemo } from "react";
import { Box, Card, Divider } from "@/components/atoms";
import {
  AgendaFoldedText,
  AgendaTag,
  AgendaDetail,
  OptionVoteResult,
  VoteResult,
  VoteDetail,
} from "@/components/molecules";

import type { PreparingAgenda } from "biseo-interface/agenda";

const _tags = {
  public: false,
  identified: false,
  votable: true,
};

interface Props {
  agenda: PreparingAgenda;
}

export const PreparingAgendaCard: React.FC<Props> = ({ agenda }) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [revealChoice, setRevealChoice] = useState<boolean>(false);
  const switchRevealChoice = (prev: boolean) => {
    setRevealChoice(!prev);
  };
  return (
    <Card primary={false} bold={enabled} round={5}>
      {
        <Box gap={8}>
          <AgendaTag
            tags={{
              public: _tags.public,
              identified: _tags.identified,
              votable: agenda.user.votable,
            }}
          />
          <AgendaFoldedText title={agenda.title} subtitle={agenda.content} />
        </Box>
      }
    </Card>
  );
};
