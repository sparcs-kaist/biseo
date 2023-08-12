import React, { useState } from "react";
import { Box, Text, Tag } from "@/components/atoms";

interface Props {
  type?: boolean;
  clickHandler: (prev: boolean) => void;
  revealChoice: boolean;
}

export const VoteResult: React.FC<Props> = ({
  type,
  clickHandler,
  revealChoice,
}) => {
  return (
    <Box w={260} justify="space-between" dir="row" align="center">
      <Box gap={5} dir="row" align="center">
        <Text variant="subtitle" color="black">
          투표 결과
        </Text>
        <Text
          variant="option2"
          color="gray500"
          onClick={e => {
            clickHandler(revealChoice);
            e.stopPropagation();
          }}
        >
          {!revealChoice ? "내 투표 보기" : "내 투표 가리기"}
        </Text>
      </Box>
      <Tag type={type ? "public" : "private"} />
    </Box>
  );
};