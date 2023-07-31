import React from "react";
import { Box, Text, Tag } from "@/components/atoms";

interface Tags {
  public: boolean;
  anonymous: boolean;
  votable: boolean;
}

interface Props {
  tags: Tags;
}

// TODO: 배경색 theme에 추가해서 변경하기
// TODO: 텍스트 확정해서 알맞게 변경하기
export const AgendaTag: React.FC<Props> = ({ tags }) => {
  return (
    <>
      <Box dir={"row"} gap={8} align={"center"}>
        <Tag bg="gray200">
          <Text variant="option1" color="gray600">
            {tags.public ? "공개" : "비공개"}
          </Text>
        </Tag>
        <Tag bg="purple200">
          <Text variant="option1" color="purple600">
            {tags.anonymous ? "기명" : "무기명"}
          </Text>
        </Tag>
        <Tag bg="blue200">
          <Text variant="option1" color="blue600">
            {tags.votable ? "투표 가능" : "투표 불가능"}
          </Text>
        </Tag>
      </Box>
    </>
  );
};
