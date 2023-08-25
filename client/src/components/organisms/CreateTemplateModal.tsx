import React, { useState } from "react";
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
    const index = choiceState.indexOf(choice);
    const list = choiceState;
    if (index > -1) {
      // only splice array whe n item is found
      list.splice(index, 1);
      setChoiceState(list); // 2nd parameter means remove one item only
    }
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

  return (
    <Modal title="템플릿 생성하기">
      <Box w={630} dir="row" justify="space-between">
        <Box w={300} dir="column" gap={20}>
          <ModalInner title="템플릿 제목" required>
            <ModalInner.InputBox onClick={onChangeTemplateTitle}>
              내용을 입력하세요
            </ModalInner.InputBox>
          </ModalInner>

          <ModalInner title="투표 제목" required>
            <ModalInner.InputBox onClick={onChangeAgendaTitle}>
              내용을 입력하세요
            </ModalInner.InputBox>
          </ModalInner>

          <ModalInner title="투표 설명" required>
            <ModalInner.TextAreaInputBox
              placeholder="내용을 입력하세요"
              onChange={onChangeAgendaContent}
            />
          </ModalInner>

          <ModalInner title="의결 문안" required>
            <ModalInner.InputBox onClick={onChangeAgendaResolution}>
              내용을 입력하세요
            </ModalInner.InputBox>
          </ModalInner>
        </Box>

        <Box w={300} h={313} dir="column" justify="space-between">
          <ModalInner title="투표 항목" count={1}>
            <ModalInner.AddVoteOptionArea
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
          <Link to=".." relative="path" replace>
            <Button w={300} h={40} onClick={onTemplateUpdate}>
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
