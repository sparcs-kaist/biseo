import React, { useState } from "react";
import { Box, Card, Divider } from "@/components/atoms";
import {
  AgendaFoldedText,
  AgendaTag,
  AgendaDetail,
  // ChoiceGraph,
  // ChoicePercentage,
  OptionVoteResult,
  VoteResult,
  VoteDetail,
} from "@/components/molecules";

import type { Color } from "@/theme";

const _agenda = {
  title: "투표 제목이 위치할 자리입니다.",
  subtitle: "투표 설명이 위치할 자리입니다.",
  content: "의결문안이 위치할 자리입니다.",
};

const _tags = {
  public: false,
  identified: false,
  votable: true,
};
const _choices: { name: string; count: number; color: Color }[] = [
  { name: "찬성", count: 10, color: "blue400" },
  { name: "반대", count: 10, color: "blue300" },
];

export const AgendaCard: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <Card
      primary
      clickable
      onClick={() => setEnabled(enabled => !enabled)}
      round={5}
    >
      {enabled ? (
        <Box gap={15}>
          <AgendaDetail
            title={_agenda.title}
            subtitle={_agenda.subtitle}
            content={_agenda.content}
          />
          <Divider />
          <VoteResult type={_tags.public} />
          <Box gap={12}>
            {_choices.map(choice => (
              <OptionVoteResult name={choice.name} count={choice.count} />
            ))}
          </Box>
          <Divider />
          <VoteDetail type={_tags.identified} />
        </Box>
      ) : (
        <Box gap={8}>
          <AgendaTag tags={_tags} />
          <AgendaFoldedText title={_agenda.title} subtitle={_agenda.subtitle} />
        </Box>
      )}
    </Card>
  );
};
