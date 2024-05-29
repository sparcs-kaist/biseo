import React from "react";
import { Tag } from "@biseo/web/components/atoms";
import { row, gap, align } from "@biseo/web/styles";

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
  <div css={[row, gap(8), align.center]}>
    <Tag type={tags.public ? "public" : "private"} />
    <Tag type={tags.identified ? "identified" : "anonymous"} />
    {tags.votable && !admin && <Tag type="votable" />}
  </div>
);
