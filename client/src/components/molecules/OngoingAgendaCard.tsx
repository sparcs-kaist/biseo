import React from "react";
import { Box, Card, Text, Choice, Button } from "@/components/atoms";
import { ReactComponent as SelectIcon } from "@/assets/select.svg";
import { theme } from "@/theme";

export const OngoingAgendaCard: React.FC = () => {
  return (
    <Card primary clickable>
      <Box gap={10}>
        <Box>
          <Text color="black" variant="title2">
            투표 제목이 위치할 자리입니다
          </Text>
          <Text color="gray500" variant="subtitle">
            투표 제목이 위치할 자리입니다
          </Text>
        </Box>
        <Box>
          <Text color="blue600" variant="body">
            의결문안이 위치할 자리입니다.
          </Text>
          <Box gap={6}>
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
