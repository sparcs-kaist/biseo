import React, { useState } from "react";
import { Modal } from "@/components/molecules";
import { Button, Box, Text, BorderedBox } from "@/components/atoms";
import { ModalInner } from "../molecules/ModalInnerTextBox";
import { Link, useLocation } from "react-router-dom";
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

  const agendaTitle = targetTemplate != undefined ? targetTemplate.title : "";
  const templateTitle =
    targetTemplate != undefined ? targetTemplate.templateName : "";
  const agendaContent =
    targetTemplate != undefined ? targetTemplate.content : "";
  const agendaResolution =
    targetTemplate != undefined ? targetTemplate.resolution : "";
  const agendaChoices: string[] =
    targetTemplate != undefined ? targetTemplate.choices : [];

  const [templateTitleState, setTemplateTitleState] = useState(templateTitle);
  const [agendaTitleState, setAgendaTitleState] = useState(agendaTitle);
  const [agendaContentState, setAgendaContentState] = useState(agendaContent);
  const [newChoiceState, setNewChoiceState] = useState("");
  const [choiceState, setChoiceState] = useState(agendaChoices);
  const [agendaResolutionState, setAgendaResolutionState] =
    useState(agendaResolution);

  const onChangeTemplateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateTitleState(e.target.value);
  };
  const onChangeAgendaTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaTitleState(e.target.value);
  };
  const onChangeAgendaContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaContentState(e.target.value);
  };
  const onChangeAgendaResolution = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaResolutionState(e.target.value);
  };
  const onNewChoiceState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChoiceState(e.target.value);
  };
  const onNewChoiceSubmit = () => {
    if (!choiceState.includes(newChoiceState)) {
      setChoiceState([...choiceState, newChoiceState]);
      setNewChoiceState("");
    }
  };
  const deleteChoice = (choice: string) => {
    const index = choiceState.indexOf(choice);
    const list = choiceState;
    if (index > -1) {
      // only splice array whe n item is found
      list.splice(index, 1);
      setChoiceState(list); // 2nd parameter means remove one item only
    }
  };
  const { deleteTemplate, updateTemplate } = useAgendaTemplate(state => ({
    deleteTemplate: state.deleteTemplate,
    updateTemplate: state.updateTemplate,
  }));

  const onTemplateUpdate = () => {
    updateTemplate({
      id: templateId,
      templateName: templateTitleState,
      title: agendaTitleState,
      content: agendaContentState,
      resolution: agendaResolutionState,
      choices: choiceState,
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
              value={templateTitleState}
              onChange={onChangeTemplateTitle}
            />
          </ModalInner>

          <ModalInner title="투표 제목" required>
            <ModalInner.InputBox
              value={agendaTitleState}
              onChange={onChangeAgendaTitle}
            />
          </ModalInner>

          <ModalInner title="투표 설명" required>
            <ModalInner.InputBox
              value={agendaContentState}
              onChange={onChangeAgendaContent}
            />
          </ModalInner>

          <ModalInner title="의결 문안" required>
            <ModalInner.InputBox
              value={agendaResolutionState}
              onChange={onChangeAgendaResolution}
            />
          </ModalInner>
        </Box>

        <Box w={300} h={313} dir="column" justify="space-between">
          <ModalInner title="투표 항목" count={choiceState.length}>
            <ModalInner.AddVoteOptionArea
              value={newChoiceState}
              onClick={onNewChoiceState}
              onSubmit={onNewChoiceSubmit}
            >
              {choiceState.map(opt => (
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
            <Button w={145} h={40} onClick={onTemplateUpdate}>
              <Text variant="boldtitle3" color="blue600">
                탬플릿 수정하기
              </Text>
            </Button>
            <Link to=".." relative="path" replace>
              <Button w={145} h={40} onClick={onTemplateDelete}>
                <Text variant="boldtitle3" color="blue600">
                  탬플릿 삭제하기
                </Text>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
