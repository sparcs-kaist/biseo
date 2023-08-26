import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Box, Text } from "@/components/atoms";
import { Modal, ModalInner } from "@/components/molecules";
import { useAgendaTemplate } from "@/services/agenda-template";

export const EditTemplateModal: React.FC = () => {
  const location = useLocation();

  const modalParams = new URLSearchParams(location.search);
  const templateId = parseInt(modalParams.get("templateId") as string);

  const { targetTemplate } = useAgendaTemplate(state => ({
    targetTemplate: state.agendaTemplates.find(
      template => template.id === templateId,
    ),
  }));

  const agendaTitleFormated =
    targetTemplate != undefined ? targetTemplate.title : "";
  const templateTitleFormated =
    targetTemplate != undefined ? targetTemplate.templateName : "";
  const agendaContentFormated =
    targetTemplate != undefined ? targetTemplate.content : "";
  const agendaResolutionFormated =
    targetTemplate != undefined ? targetTemplate.resolution : "";
  const agendaChoicesFormated: string[] =
    targetTemplate != undefined ? targetTemplate.choices : [];

  const [templateTitle, setTemplateTitle] = useState(templateTitleFormated);
  const [agendaTitle, setAgendaTitle] = useState(agendaTitleFormated);
  const [agendaContent, setAgendaContent] = useState(agendaContentFormated);
  const [agendaNewChoice, setAgendaNewChoice] = useState("");
  const [agendaChoice, setAgendaChoice] = useState(agendaChoicesFormated);
  const [agendaResolution, setAgendaResolution] = useState(
    agendaResolutionFormated,
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
          <ModalInner title="투표 항목" count={1} required>
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
              <Text variant="boldtitle3" color="blue600">
                템플릿 수정하기
              </Text>
            </Button>
            <Link
              to={validated ? ".." : "#"}
              relative="path"
              replace
              style={{ textDecoration: "none" }}
            >
              <Button w={145} h={40} onClick={onTemplateDelete}>
                <Text variant="boldtitle3" color="blue600">
                  템플릿 삭제하기
                </Text>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
