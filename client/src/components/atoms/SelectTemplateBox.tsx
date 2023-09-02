import React, { PropsWithChildren } from "react";
import {
  PositionedDownArrowIcon,
  SelectWrapper,
  TemplateSelect,
} from "@/components/atoms/Label";
import { useAgendaTemplate } from "@/services/agenda-template";

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
        w={width}
        h={height}
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
