import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SectionHeader,
  UserTagCards,
  AgendaTemplateCard,
  AddButtonCard,
} from "@biseo/web/components/molecules";
import { useAgendaTemplate } from "@biseo/web/services/agenda-template";
import { useUserTag } from "@biseo/web/services/user-tag";
import { column, gap, h, row, w, scroll, scrollBar } from "@biseo/web/styles";

export const AdminSettingSection: React.FC = () => {
  const { templates } = useAgendaTemplate(state => ({
    templates: state.agendaTemplates,
  }));
  const { tags } = useUserTag(state => ({
    tags: state.userTags,
  }));

  const navigate = useNavigate();

  return (
    <div css={[row, h("fill"), gap(20)]}>
      <div css={[column, w(380), h("fill")]}>
        <SectionHeader count={templates.length}>투표 템플릿</SectionHeader>
        <div css={[column, w("fill"), h("fill"), gap(15)]}>
          <AddButtonCard
            content="새로운 템플릿"
            onClick={() => navigate("templateCreate")}
          />
          <div css={[column, h(600)]}>
            <div css={[scroll.y, scrollBar]}>
              <div css={[column, gap(15)]}>
                {templates.map(template => (
                  <AgendaTemplateCard key={template.id} template={template} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div css={[column, w(380), h("fill")]}>
        <SectionHeader count={tags.length}>유저 태그</SectionHeader>
        <div css={[column, w("fill"), h("fill"), gap(15)]}>
          <AddButtonCard
            content="새로운 태그"
            onClick={() => navigate("tagCreate")}
          />
          <div css={[column, h(600)]}>
            <div css={[scroll.y, scrollBar]}>
              <div css={[column, gap(15)]}>
                {tags.map(usertag => (
                  <UserTagCards key={usertag.id} tag={usertag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
