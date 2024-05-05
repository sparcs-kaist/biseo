import React from "react";
import { Tag } from "@biseo/web/components/atoms";
import { row, align, gap } from "@biseo/web/styles";

interface Tags {
  user?: boolean;
  template?: boolean;
}

interface Props {
  suffix?: number | string;
  tags: Tags;
}

export const AdminTag: React.FC<Props> = ({ suffix = "", tags }) => (
  <div css={[row, gap(8), align.center]}>
    {tags.user && <Tag type="user" suffix={suffix} />}
    {tags.template && <Tag type="template" suffix={suffix} />}
  </div>
);
