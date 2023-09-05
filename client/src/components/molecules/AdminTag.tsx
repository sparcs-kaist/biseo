import React from "react";
import { Box, Tag } from "@/components/atoms";

interface Tags {
  user?: boolean;
  template?: boolean;
}

interface Props {
  suffix?: number | string;
  tags: Tags;
}

export const AdminTag: React.FC<Props> = ({ suffix = "", tags }) => (
  <Box dir="row" gap={8} align="center">
    {tags.user && <Tag type="user" suffix={suffix} />}
    {tags.template && <Tag type="template" suffix={suffix} />}
  </Box>
);
