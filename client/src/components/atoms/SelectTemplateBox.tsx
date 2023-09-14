import React, { type PropsWithChildren } from "react";
import { w, h } from "@/styles";
import { useAgendaTemplate } from "@/services/agenda-template";
import {
  PositionedDownArrowIcon,
  SelectWrapper,
  TemplateSelect,
} from "./Label";

interface Props extends PropsWithChildren {
  width: number;
  height: number;
  onChange: (selectedValue: number) => void; // new prop
}

export const SelectTemplateBox: React.FC<Props> = ({
  children = null,
  width,
  height,
  onChange,
}) => {
  const { templates } = useAgendaTemplate(state => ({
    templates: state.agendaTemplates,
  }));
  return (
    <SelectWrapper>
      <TemplateSelect
        css={[w(width), h(height)]}
        onChange={e => onChange(parseInt(e.target.value))}
        defaultValue={0}
      >
        <option value={0}>{children}</option>
        {templates.map(template => (
          <option key={template.id} value={template.id}>
            {template.templateName}
          </option>
        ))}
      </TemplateSelect>
      <PositionedDownArrowIcon />
    </SelectWrapper>
  );
};
