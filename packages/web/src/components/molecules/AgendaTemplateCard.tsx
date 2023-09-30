import React from "react";
import { useNavigate } from "react-router-dom";

import type { AgendaTemplate } from "@biseo/interface/agenda/template";
import { Box, Text, Card, Divider } from "@biseo/web/components/atoms";
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
          <Text variant="title2" color="gray600">
            {template.templateName}
          </Text>
        </Box>
        <Divider />
        <Box w={340} gap={2}>
          <Text variant="title3" color="gray500">
            {template.title}
          </Text>
          <Text variant="subtitle" color="gray400">
            {template.content}
          </Text>
        </Box>
      </Box>
    </Card>
  );
};
