import React from "react";
import { Box, Card, Text, Choice, Button } from "@/components/atoms";
import { ReactComponent as SelectIcon } from "@/assets/select.svg";
import { theme } from "@/theme";
import { OngoingAgenda } from "biseo-interface/agenda";

type OngoingAgendaProps = {
  agenda: OngoingAgenda;
};

export const OngoingAgendaCard: React.FC<OngoingAgendaProps> = ({ agenda }) => {
  return (
    <Card primary>
      <Box dir="column" gap={10}>
        <Box>
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
          <Box dir="column" gap={6}>
            <Choice chosen>
              <Box dir="row" gap={10}>
                <SelectIcon stroke={theme.colors.blue600}></SelectIcon>
                <Text color="white" variant="body">
                  투표항목 1
                </Text>
              </Box>
            </Choice>
            <Choice>
              <Box dir="row" gap={10}>
                <SelectIcon stroke={theme.colors.gray500}></SelectIcon>
                <Text color="gray500" variant="body">
                  투표항목 2
                </Text>
              </Box>
            </Choice>
            <Choice>
              <Box dir="row" gap={10}>
                <SelectIcon stroke={theme.colors.gray500}></SelectIcon>
                <Text color="gray500" variant="body">
                  투표항목 3
                </Text>
              </Box>
            </Choice>
          </Box>
        </Box>
        <Box dir="row" justify="end" w="fill">
          <Button>
            <Text variant="option1" color="blue600">
              투표하기
            </Text>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
