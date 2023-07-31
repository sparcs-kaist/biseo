import React from "react";
import { Card, Box, Text } from "@/components/atoms";
import { AgendaFoldedText, AgendaTag } from "@/components/molecules";

import type { Color } from "@/theme";

const _agenda = {
  title: "투표 제목이 위치할 자리입니다.",
  subtitle: "투표 설명이 위치할 자리입니다.",
};

const _tags = {
  public: false,
  anonymous: false,
  votable: true,
};


// Card component에서 clickable인지 확인하기
export const AgendaFoldedCard: React.FC = () => {
  return (
    <Card primary={false}>
      <Box gap={8}>
        <AgendaTag tags={_tags} />
        <AgendaFoldedText agenda={_agenda} />
      </Box>
    </Card>
  );
};
