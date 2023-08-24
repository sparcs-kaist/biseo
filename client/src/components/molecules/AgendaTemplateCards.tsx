import React from "react";
import { Box, Text, Card, Divider } from "@/components/atoms";
import { AdminTag } from "@/components/molecules";
import { useAgendaTemplate } from "@/services/agenda-template";
import { useNavigate } from "react-router-dom";

const _tags = {
  template: true,
  user: false,
};

interface props {
  id: number;
  templateTitle: string;
  title: string;
  content: string;
}

export const AgendaTemplateCards: React.FC<props> = ({
  id,
  templateTitle,
  title,
  content,
}) => {
  const navigate = useNavigate();
  const openModal = () => navigate(`templateEdit?templateId=${id}`);
  return (
    <Card round={5} onClick={openModal}>
      <Box gap={8} w="fill">
        <AdminTag tags={_tags} suffix={3} />
        <Box gap={11}>
          <Text variant="title2" color="gray600">
            {templateTitle}
          </Text>
        </Box>
        <Divider />

        <Box w={340} gap={2}>
          <Text variant="title3" color="gray500">
            {title}
          </Text>
          <Text variant="subtitle" color="gray400">
            {content}
          </Text>
        </Box>
      </Box>
    </Card>
  );
};
