import React from "react";
import { Box, Card, Divider } from "@/components/atoms";
import {
  AgendaDetail,
  ChoiceGraph,
  ChoicePercentage,
  VoteDetail,
} from "@/components/molecules";

import type { Color } from "@/theme";

const _agenda = {
  title: "투표 제목이 위치할 자리입니다.",
  subtitle: "투표 설명이 위치할 자리입니다.",
  content: "의결문안이 위치할 자리입니다.",
};

const _choices: {
  choices: { name: string; count: number }[];
  colors: Color[];
} = {
  choices: [
    { name: "찬성", count: 10 },
    { name: "반대", count: 10 },
  ],
  colors: ["blue400", "blue300"],
};

const __choices: { name: string; count: number; color: Color }[] = [
  { name: "찬성", count: 10, color: "blue400" },
  { name: "반대", count: 10, color: "blue300" },
];

export const AgendaCard: React.FC = () => {
  return (
    <Card>
      <Box gap={15}>
        <AgendaDetail agenda={_agenda} />
        <Divider />
        <ChoiceGraph choices={_choices.choices} colors={_choices.colors} />
        <Box gap={12}>
          {__choices.map(choice => (
            <ChoicePercentage
              choice={choice}
              total={__choices.reduce((acc, choice) => acc + choice.count, 0)}
            />
          ))}
        </Box>
        <Divider />
        <VoteDetail anonymous={true} />
      </Box>
    </Card>
  );
};
