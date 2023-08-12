import React, { useState } from "react";
import {
  Box,
  Text,
  Card,
  Divider,
  ProgressBar,
  Button,
} from "@/components/atoms";
import { AgendaTag } from "@/components/molecules";

import type { OngoingAgenda } from "biseo-interface/agenda";

const _tags = {
  public: false,
  identified: false,
  votable: true,
};

interface Props {
  agenda: OngoingAgenda;
}

export const AdminOngoingAgendaCard: React.FC<Props> = ({ agenda }) => {
  return (
    <Card round={5}>
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
          <ProgressBar max={agenda.voters.total} value={agenda.voters.voted} />
          <Text variant="option1" color="gray500">
            투표참여 {agenda.voters.voted}/{agenda.voters.total}
          </Text>
        </Box>
        <Divider />
        <Box dir="row" w="fill" gap={8} justify="space-between">
          <Button>
            <Text variant="option1" color="blue600">
              투표 독촉하기
            </Text>
          </Button>
          <Button>
            <Text variant="option1" color="blue600">
              투표 종료하기
            </Text>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
