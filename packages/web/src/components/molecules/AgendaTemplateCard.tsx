import React from "react";
import { useNavigate } from "react-router-dom";

import type { AgendaTemplate } from "@biseo/interface/agenda/template";
import { Card, Divider } from "@biseo/web/components/atoms";
import { w, gap, text, column } from "@biseo/web/styles";
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
    <Card clickable onClick={openModal}>
      <div css={[column, gap(8), w("fill")]}>
        <AdminTag tags={adminTags} suffix={template.choices.length} />
        <div css={gap(11)}>
          <h2 css={[text.title2, text.gray600]}>{template.templateName}</h2>
        </div>
        <Divider />
        <div css={[w(340), gap(2)]}>
          <h3 css={[text.title3, text.gray500]}>{template.title}</h3>
          <h4 css={[text.subtitle, text.gray400]}>{template.content}</h4>
        </div>
      </div>
    </Card>
  );
};
