import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Scroll } from "@biseo/web/components/atoms";
import {
  SectionHeader,
  UserTagCards,
  AgendaTemplateCard,
  AddButtonCard,
} from "@biseo/web/components/molecules";
import { useAgendaTemplate } from "@biseo/web/services/agenda-template";
import { useUserTag } from "@biseo/web/services/user-tag";

export const AdminSettingSection: React.FC = () => {
  const { templates } = useAgendaTemplate(state => ({
    templates: state.agendaTemplates,
  }));
  const { tags } = useUserTag(state => ({
    tags: state.userTags,
  }));

  const navigate = useNavigate();

  return (
    <Box dir="row" h="fill" gap={20}>
      <Box dir="column" w={380} h="fill">
        <SectionHeader count={templates.length}>투표 템플릿</SectionHeader>
        <Box dir="column" w="fill" h="fill" gap={15}>
          <AddButtonCard
            content="새로운 템플릿"
            onClick={() => navigate("templateCreate")}
          />
          <Box dir="column" h={600}>
            <Scroll>
              <Box dir="column" gap={15}>
                {templates.map(template => (
                  <AgendaTemplateCard key={template.id} template={template} />
                ))}
              </Box>
            </Scroll>
          </Box>
        </Box>
      </Box>

      <Box dir="column" w={380} h="fill">
        <SectionHeader count={tags.length}>유저 태그</SectionHeader>
        <Box dir="column" w="fill" h="fill" gap={15}>
          <AddButtonCard
            content="새로운 태그"
            onClick={() => navigate("tagCreate")}
          />
          <Box dir="column" h={600}>
            <Scroll>
              <Box dir="column" gap={15}>
                {tags.map(usertag => (
                  <UserTagCards key={usertag.id} tag={usertag} />
                ))}
              </Box>
            </Scroll>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
