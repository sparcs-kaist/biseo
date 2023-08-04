import React from "react";
import { Box, Text, Tag } from "@/components/atoms";

interface Props {
  type?: boolean;
}

export const VoteResult: React.FC<Props> = ({ type }) => {
  return (
    <Box w={260} justify="space-between" dir="row">
      <Box gap={5} dir="row">
        <Text variant="subtitle" color="black">
          투표 결과
        </Text>
        <Text variant="option2" color="gray500">
          내 투표 보기
        </Text>
      </Box>
      <Tag type={type ? "public" : "private"} />
    </Box>
  );
};
