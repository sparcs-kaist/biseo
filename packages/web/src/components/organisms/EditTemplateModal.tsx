import { Box, Button } from "@biseo/web/components/atoms";
import { Modal, ModalInner } from "@biseo/web/components/molecules";
import { useAgendaTemplate } from "@biseo/web/services/agenda-template";
import { text } from "@biseo/web/styles";
import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const EditTemplateModal: React.FC = () => {
  const location = useLocation();

  const modalParams = new URLSearchParams(location.search);
  const templateId = parseInt(modalParams.get("templateId") as string);

  const { targetTemplate } = useAgendaTemplate(state => ({
    targetTemplate: state.agendaTemplates.find(
      template => template.id === templateId,
    ),
  }));

  const agendaTitleFormatted =
    targetTemplate !== undefined ? targetTemplate.title : "";
  const templateTitleFormatted =
    targetTemplate !== undefined ? targetTemplate.templateName : "";
  const agendaContentFormatted =
    targetTemplate !== undefined ? targetTemplate.content : "";
  const agendaResolutionFormatted =
    targetTemplate !== undefined ? targetTemplate.resolution : "";
  const agendaChoicesFormatted: string[] =
    targetTemplate !== undefined ? targetTemplate.choices : [];

  const [templateTitle, setTemplateTitle] = useState(templateTitleFormatted);
  const [agendaTitle, setAgendaTitle] = useState(agendaTitleFormatted);
  const [agendaContent, setAgendaContent] = useState(agendaContentFormatted);
  const [agendaNewChoice, setAgendaNewChoice] = useState("");
  const [agendaChoice, setAgendaChoice] = useState(agendaChoicesFormatted);
  const [agendaResolution, setAgendaResolution] = useState(
    agendaResolutionFormatted,
  );

  const onChangeTemplateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateTitle(e.target.value);
  };
  const onChangeAgendaTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaTitle(e.target.value);
  };
  const onChangeAgendaContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaContent(e.target.value);
  };
  const onChangeAgendaResolution = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaResolution(e.target.value);
  };
  const onNewChoiceState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaNewChoice(e.target.value);
  };
  const onNewChoiceSubmit = () => {
    if (!agendaChoice.includes(agendaNewChoice)) {
      setAgendaChoice([...agendaChoice, agendaNewChoice]);
      setAgendaNewChoice("");
    }
  };
  const validated = useMemo(
    () =>
      agendaTitle.length > 0 &&
      agendaContent.length > 0 &&
      agendaResolution.length > 0 &&
      agendaChoice.length > 0,
    [agendaTitle, agendaContent, agendaResolution, agendaChoice],
  );
  const deleteChoice = (choice: string) => {
    const index = agendaChoice.indexOf(choice);
    const list = agendaChoice;
    if (index > -1) {
      // only splice array whe n item is found
      list.splice(index, 1);
      setAgendaChoice(list); // 2nd parameter means remove one item only
    }
  };
  const { deleteTemplate, updateTemplate } = useAgendaTemplate(state => ({
    deleteTemplate: state.deleteTemplate,
    updateTemplate: state.updateTemplate,
  }));

  const onTemplateUpdate = () => {
    updateTemplate({
      id: templateId,
      templateName: templateTitle,
      title: agendaTitle,
      content: agendaContent,
      resolution: agendaResolution,
      choices: agendaChoice,
    });
  };

  const onTemplateDelete = () => {
    deleteTemplate(templateId);
  };

  return (
    <Modal title="템플릿 수정하기">
      <Box w={630} dir="row" justify="space-between">
        <Box w={300} dir="column" gap={20}>
          <ModalInner title="템플릿 제목" required>
            <ModalInner.InputBox
              onChange={onChangeTemplateTitle}
              value={templateTitle}
            />
          </ModalInner>

          <ModalInner title="투표 제목" required>
            <ModalInner.InputBox
              onChange={onChangeAgendaTitle}
              value={agendaTitle}
            />
          </ModalInner>

          <ModalInner title="투표 설명" required>
            <ModalInner.InputBox
              onChange={onChangeAgendaContent}
              value={agendaContent}
            />
          </ModalInner>

          <ModalInner title="의결 문안" required>
            <ModalInner.InputBox
              onChange={onChangeAgendaResolution}
              value={agendaResolution}
            />
          </ModalInner>
        </Box>

        <Box w={300} h={313} dir="column" justify="space-between">
          <ModalInner title="투표 항목" count={agendaChoice.length}>
            <ModalInner.AddVoteOptionArea
              value={agendaNewChoice}
              onClick={onNewChoiceState}
              onSubmit={onNewChoiceSubmit}
            >
              {agendaChoice.map(opt => (
                <ModalInner.VoteChoice
                  key={opt}
                  onClick={() => deleteChoice(opt)}
                >
                  {opt}
                </ModalInner.VoteChoice>
              ))}
            </ModalInner.AddVoteOptionArea>
          </ModalInner>

          <Box dir="row" w={300} gap={10}>
            <Button
              w={145}
              h={40}
              onClick={onTemplateUpdate}
              disabled={!validated}
            >
              <p css={[text.boldtitle3, text.blue600]}>템플릿 수정하기</p>
            </Button>
            <Link
              to={validated ? ".." : "#"}
              relative="path"
              replace
              style={{ textDecoration: "none" }}
            >
              <Button w={145} h={40} onClick={onTemplateDelete}>
                <p css={[text.boldtitle3, text.blue600]}>템플릿 삭제하기</p>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
