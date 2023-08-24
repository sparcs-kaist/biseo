import React from "react";
import { Box, Text, Card, Divider } from "@/components/atoms";
import { AdminTag } from "@/components/molecules";
import { useNavigate } from "react-router-dom";
import type { AgendaTemplate } from "biseo-interface/agenda/template";

const _tags = {
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
        <AdminTag tags={_tags} suffix={3} />
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
