import React from "react";
import { useNavigate } from "react-router-dom";

import type { UserTag as IUserTag } from "@biseo/interface/user/tag";
import { Box, Card, UserTag } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";
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
    <Card primary={false} round={5} onClick={openModal}>
      <Box gap={8}>
        <Box gap={8} dir="row">
          <AdminTag tags={adminTags} suffix={tag.users.length} />
          <UserTag>{tag.title}</UserTag>
        </Box>
        <Box w={340}>
          <p css={[text.title2, text.gray600]}>{tag.description}</p>
        </Box>
      </Box>
    </Card>
  );
};
