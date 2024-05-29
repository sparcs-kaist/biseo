import React from "react";
import { useNavigate } from "react-router-dom";

import type { UserTag as IUserTag } from "@biseo/interface/user/tag";
import { Card, UserTag } from "@biseo/web/components/atoms";
import { row, gap, w, text } from "@biseo/web/styles";
import { AdminTag } from "./AdminTag";

const adminTags = {
  user: true,
  template: false,
};

interface Props {
  tag: IUserTag;
}

export const UserTagCards: React.FC<Props> = ({ tag }) => {
  const navigate = useNavigate();
  const openModal = () => navigate(`tagEdit?tagId=${tag.id}`);
  return (
    <Card primary={false} round={5} onClick={openModal} clickable>
      <div css={[gap(8)]}>
        <div css={[row, gap(8)]}>
          <AdminTag tags={adminTags} suffix={tag.users.length} />
          <UserTag>{tag.title}</UserTag>
        </div>
        <div css={[w(340)]}>
          <h2 css={[text.title2, text.gray600]}>{tag.description}</h2>
        </div>
      </div>
    </Card>
  );
};
