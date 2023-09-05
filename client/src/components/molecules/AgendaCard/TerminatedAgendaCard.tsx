import React, { useState, useMemo } from "react";

import type { TerminatedAgenda } from "@biseo/interface/agenda";
import { Box, Card, Divider, Text } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules/AgendaTag";
import { OptionVoteResult } from "@/components/molecules/OptionVoteResult";
import { VoteResult } from "@/components/molecules/VoteResult";
import { VoteDetail } from "@/components/molecules/VoteDetail";
import { VoteParticipate } from "@/components/molecules/VoteParticipate";

const agendaTags = {
  public: true,
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
      bold={enabled}
      clickable
      onClick={e => {
        setEnabled(value => !value);
        e.stopPropagation();
      }}
    >
      {enabled ? (
        <Box w="fill" gap={15}>
          <Box gap={2}>
            <Text variant="title2" color="black">
              {agenda.title}
            </Text>
            <Text variant="subtitle" color="gray500">
              {agenda.content}
            </Text>
          </Box>
          <Box>
            <Text variant="body" color="blue600">
              {agenda.resolution}
            </Text>
          </Box>
          <Divider />
          <VoteParticipate
            voted={agenda.voters.voted}
            total={agenda.voters.total}
          />
          <VoteResult
            type={agendaTags.public}
            clickHandler={switchRevealChoice}
            revealChoice={revealChoice}
            voted={agenda.user.voted != null}
          />
          <Box w="fill" gap={12}>
            {agenda.choices.map(choice => (
              <OptionVoteResult
                name={choice.name}
                count={choice.count}
                totalCount={totalCount}
                userChoice={revealChoice && agenda.user.voted === choice.id}
              />
            ))}
          </Box>
          <Divider />
          <VoteDetail type={agendaTags.identified} />
        </Box>
      ) : (
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
      )}
    </Card>
  );
};
