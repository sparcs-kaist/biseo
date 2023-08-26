import React from "react";
import { Box } from "@/components/atoms";
import {
  SectionHeader,
  UserTagCards,
  AgendaTemplateCard,
  AddButtonCard,
} from "@/components/molecules";
import { useAgendaTemplate } from "@/services/agenda-template";
import { useNavigate } from "react-router-dom";
import { useUserTag } from "@/services/user-tag";

export const AdminSettingSection: React.FC = () => {
  const { templates } = useAgendaTemplate(state => ({
    templates: state.agendaTemplates,
  }));
  const { tags } = useUserTag(state => ({
    tags: state.userTags,
  }));

  const navigate = useNavigate();

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={templates.length}>투표 템플릿</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          <AddButtonCard
            content="새로운 템플릿"
            onClick={() => navigate("templateCreate")}
          />
          {templates.map(template => (
            <AgendaTemplateCard key={template.id} template={template} />
          ))}
        </Box>
      </Box>
      <Box dir="column" w={380}>
        <SectionHeader count={tags.length}>유저 태그</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          <AddButtonCard
            content="새로운 태그"
            onClick={() => navigate("tagCreate")}
          />
          {tags.map(usertag => (
            <UserTagCards key={usertag.id} tag={usertag} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
