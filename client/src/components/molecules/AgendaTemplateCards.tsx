import React from "react";
import { Box, Text, Card, Divider, Button } from "@/components/atoms";
import { AgendaTag } from "@/components/molecules";

const _tags = {
  public: true,
  identified: true,
  votable: true,
};



export const AgendaTemplateCards: React.FC = () => {
  return (
    <Card round={5}>
      <Box gap={8} w="fill">
        <AgendaTag tags={_tags} admin />
        <Box gap={11}>
          <Text variant="title2" color="gray600">
            😎 정회원 승급 심사 템플릿
          </Text>
        </Box>
        <Divider />

        <Box w={340} gap={2}>
          <Text variant="title3" color="gray500">
            [본명] 준회원의 정회원 승급심사
          </Text>
          <Text variant="subtitle" color="gray400">
            [본명] 준회원의 [n]번째 정회원 승급심사입니다.
          </Text>
        </Box>
      </Box>
    </Card>
  );
};
