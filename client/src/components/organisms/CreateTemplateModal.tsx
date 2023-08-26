import React, { useMemo, useState } from "react";
import { Modal } from "@/components/molecules";
import { Button, Box, Text } from "@/components/atoms";
import { ModalInner } from "@/components/molecules";
import { Link } from "react-router-dom";
import { useAgendaTemplate } from "@/services/agenda-template";

export const CreateTemplateModal: React.FC = () => {
  const [templateTitleState, setTemplateTitleState] = useState("");
  const [agendaTitleState, setAgendaTitleState] = useState("");
  const [agendaContentState, setAgendaContentState] = useState("");
  const [agendaResolutionState, setAgendaResolutionState] = useState("");
  const [newChoiceState, setNewChoiceState] = useState("");
  const [choiceState, setChoiceState] = useState<string[]>([]);

  const onChangeTemplateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateTitleState(e.target.value);
  };
  const onChangeAgendaTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaTitleState(e.target.value);
  };
  const onChangeAgendaContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    setChoiceState(choiceState.filter(c => c !== choice));
  };

  const { createTemplate } = useAgendaTemplate(state => ({
    createTemplate: state.createTemplate,
  }));
  const onTemplateUpdate = () => {
    createTemplate({
      templateName: templateTitleState,
      title: agendaTitleState,
      content: agendaContentState,
      resolution: agendaResolutionState,
      choices: choiceState,
    });
  };
  const validated = useMemo(
    () =>
      agendaTitleState.length > 0 &&
      agendaContentState.length > 0 &&
      agendaResolutionState.length > 0 &&
      choiceState.length > 0,
    [agendaTitleState, agendaContentState, agendaResolutionState, choiceState],
  );
  return (
    <Modal title="템플릿 생성하기">
      <Box w={630} dir="row" justify="space-between">
        <Box w={300} dir="column" gap={20}>
          <ModalInner title="템플릿 제목" required>
            <ModalInner.InputBox onChange={onChangeTemplateTitle} />
          </ModalInner>

          <ModalInner title="투표 제목" required>
            <ModalInner.InputBox onChange={onChangeAgendaTitle} />
          </ModalInner>

          <ModalInner title="투표 설명" required>
            <ModalInner.TextAreaInputBox onChange={onChangeAgendaContent} />
          </ModalInner>

          <ModalInner title="의결 문안" required>
            <ModalInner.InputBox onChange={onChangeAgendaResolution} />
          </ModalInner>
        </Box>

        <Box w={300} h={313} dir="column" justify="space-between">
          <ModalInner title="투표 항목" count={choiceState.length}>
            <ModalInner.AddVoteOptionArea
              onClick={onNewChoiceState}
              onSubmit={onNewChoiceSubmit}
              value={newChoiceState}
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
          <Link
            to=".."
            relative="path"
            replace
            style={{ textDecoration: "none" }}
          >
            <Button
              w={300}
              h={40}
              onClick={onTemplateUpdate}
              disabled={!validated}
            >
              <Text variant="boldtitle3" color="blue600">
                탬플릿 생성하기
              </Text>
            </Button>
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};
