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
import { User } from "@biseo/interface/user";
import { useUserTag } from "@/services/user-tag";

export const AdminUserSection: React.FC = () => {
  const { templates } = useAgendaTemplate(state => ({
    templates: state.agendaTemplates,
  }));
  const { usertags } = useUserTag(state => ({
    usertags: state.userTags,
  }));

  const navigate = useNavigate();

  return (
    <Box dir="row" gap={20}>
      <Box dir="column" w={380}>
        <SectionHeader count={3}>투표 템플릿</SectionHeader>
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
        <SectionHeader count={4}>유저 태그</SectionHeader>
        <Box dir="column" w="fill" gap={15}>
          <AddButtonCard
            content="새로운 태그"
            onClick={() => navigate("createtag")}
          />
          {usertags.map(usertag => (
            <UserTagCards key={usertag.id} tag={usertag} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
