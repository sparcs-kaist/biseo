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

import type { TerminatedAgenda } from "biseo-interface/agenda";

const _tags = {
  public: false,
  identified: false,
  votable: true,
};

interface Props {
  agenda: TerminatedAgenda;
}

export const TerminatedAgendaCard: React.FC<Props> = ({ agenda }) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [revealChoice, setRevealChoice] = useState<boolean>(false);
  const switchRevealChoice = (prev: boolean) => {
    setRevealChoice(!prev);
  };
  const totalCount: number = useMemo(
    () => agenda.choices.reduce((acc, c) => acc + c.count, 0),
    [agenda.choices],
  );
  return (
    <Card
      primary={false}
      bold={enabled}
      clickable
      onClick={e => {
        setEnabled(enabled => !enabled);
        e.stopPropagation();
      }}
      round={5}
    >
      {enabled ? (
        <Box gap={15}>
          <AgendaDetail
            title={agenda.title}
            content={agenda.content}
            resolution={agenda.resolution}
          />
          <Divider />
          <VoteResult
            type={_tags.public}
            clickHandler={switchRevealChoice}
            revealChoice={revealChoice}
          />
          <Box gap={12}>
            {agenda.choices.map(choice => (
              <OptionVoteResult
                name={choice.name}
                count={choice.count}
                totalCount={totalCount}
                userChoice={revealChoice && agenda.user.voted == choice.id}
              />
            ))}
          </Box>
          <Divider />
          <VoteDetail type={_tags.identified} />
        </Box>
      ) : (
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
      )}
    </Card>
  );
};
