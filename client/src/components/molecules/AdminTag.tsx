import React from "react";
import { Box, Tag } from "@/components/atoms";

interface Tags {
  user?: boolean;
  template?: boolean;
}

interface Props {
  options?: number;
  tags: Tags;
}

export const AdminTag: React.FC<Props> = ({ options, tags }) => {
  return (
    <Box dir="row" gap={8} align="center">
      {tags.user && <Tag type="user" />}
      {tags.template && <Tag type="template" options={options} />}
    </Box>
  );
};
