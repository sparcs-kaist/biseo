import React from "react";
import { Box, Tag } from "@/components/atoms";

interface Tags {
  public: boolean;
  identified: boolean;
  votable: boolean;
}

interface Props {
  admin?: boolean;
  tags: Tags;
}

export const AgendaTag: React.FC<Props> = ({ admin = false, tags }) => (
  <Box dir="row" gap={8} align="center">
    <Tag type={tags.public ? "public" : "private"} />
    <Tag type={tags.identified ? "identified" : "anonymous"} />
    {tags.votable && !admin && <Tag type="votable" />}
  </Box>
);
