import React from "react";
import { Box, Text, Tag } from "@/components/atoms";

interface Tags {
  hidden: boolean;
  anonymous: boolean;
  votable: boolean;
}

interface Props {
  tags: Tags;
}

// TODO: 텍스트 확정해서 알맞게 변경하기
export const AgendaTag: React.FC<Props> = ({ tags }) => {
  return (
    <Box dir="row" gap={8} align="center">
      <Tag type={tags.hidden ? "hidden" : "_hidden"} />
      <Tag type={tags.anonymous ? "anonymous" : "_anonymous"} />
      <Tag type={tags.votable ? "votable" : "empty"} />
    </Box>
  );
};
