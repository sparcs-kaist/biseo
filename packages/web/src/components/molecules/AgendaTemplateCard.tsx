import React from "react";
import { useNavigate } from "react-router-dom";

import type { AgendaTemplate } from "@biseo/interface/agenda/template";
import { Box, Card, Divider } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";
import { AdminTag } from "./AdminTag";

const adminTags = {
  template: true,
  user: false,
};

interface Props {
  template: AgendaTemplate;
}

export const AgendaTemplateCard: React.FC<Props> = ({ template }) => {
  const navigate = useNavigate();
  const openModal = () => navigate(`templateEdit?templateId=${template.id}`);

  return (
    <Card onClick={openModal}>
      <Box gap={8} w="fill">
        <AdminTag tags={adminTags} suffix={template.choices.length} />
        <Box gap={11}>
          <p css={[text.title2, text.gray600]}>{template.templateName}</p>
        </Box>
        <Divider />
        <Box w={340} gap={2}>
          <p css={[text.title3, text.gray500]}>{template.title}</p>
          <p css={[text.subtitle, text.gray400]}>{template.content}</p>
        </Box>
      </Box>
    </Card>
  );
};
