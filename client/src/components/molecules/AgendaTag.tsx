import React from "react";
import { Box, Text, Tag } from "@/components/atoms";

interface Tags {
  public: boolean;
  identified: boolean;
  votable: boolean;
}

interface Props {
  tags: Tags;
}

export const AgendaTag: React.FC<Props> = ({ tags }) => {
  return (
    <Box dir="row" gap={8} align="center">
      <Tag type={tags.public ? "public" : "private"} />
      <Tag type={tags.identified ? "identified" : "anonymous"} />
      {tags.votable && <Tag type="votable" />}
    </Box>
  );
};
