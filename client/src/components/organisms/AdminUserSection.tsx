import React from "react";
import { Box } from "@/components/atoms";
import {
  SectionHeader,
  UserTagCards,
  AgendaTemplateCards,
  AddButtonCard,
} from "@/components/molecules";
import { useAgendaTemplate } from "@/services/agenda-template";
import { useNavigate } from "react-router-dom";

export const AdminUserSection: React.FC = () => {
  const { templates } = useAgendaTemplate(state => ({
    templates: state.agendaTemplates,
  }));
  const navigate = useNavigate();

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={3}>투표 템플릿</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          <Box dir="column" w="fill" gap={15}>
            <AddButtonCard
              content="새로운 템플릿"
              onClick={() => navigate("templateCreate")}
            />
          </Box>
          {templates.map(template => (
            <AgendaTemplateCards
              id={template.id}
              templateTitle={template.templateName}
              title={template.title}
              content={template.content}
            />
          ))}
        </Box>
      </Box>
      <Box dir="column" w={380}>
        <SectionHeader count={4}>유저 태그</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          <Box dir="column" w="fill" gap={15}>
            <AddButtonCard content="새로운 태그" />
          </Box>
          <UserTagCards />
          <UserTagCards />
        </Box>
      </Box>
    </Box>
  );
};
