import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Text } from "@biseo/web/components/atoms";
import { ModalInner, Modal } from "@biseo/web/components/molecules";
import { useAgendaTemplate } from "@biseo/web/services/agenda-template";

export const CreateTemplateModal: React.FC = () => {
  const [templateTitle, setTemplateTitle] = useState("");
  const [agendaTitle, setAgendaTitle] = useState("");
  const [agendaContent, setAgendaContent] = useState("");
  const [agendaResolution, setAgendaResolution] = useState("");
  const [agendaNewChoice, setAgendaNewChoice] = useState("");
  const [agendaChoice, setAgendaChoice] = useState<string[]>([]);

  const onChangeTemplateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateTitle(e.target.value);
  };
  const onChangeAgendaTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaTitle(e.target.value);
  };
  const onChangeAgendaContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAgendaContent(e.target.value);
  };
  const onChangeAgendaResolution = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaResolution(e.target.value);
  };
  const onNewChoiceState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgendaNewChoice(e.target.value);
  };
  const onNewChoiceSubmit = () => {
    if (agendaNewChoice.length > 0 && !agendaChoice.includes(agendaNewChoice)) {
      setAgendaChoice([...agendaChoice, agendaNewChoice]);
      setAgendaNewChoice("");
    }
  };
  const deleteChoice = (choice: string) => {
    setAgendaChoice(agendaChoice.filter(c => c !== choice));
  };

  const { createTemplate } = useAgendaTemplate(state => ({
    createTemplate: state.createTemplate,
  }));
  const onTemplateUpdate = () => {
    createTemplate({
      templateName: templateTitle,
      title: agendaTitle,
      content: agendaContent,
      resolution: agendaResolution,
      choices: agendaChoice,
    });
  };
  const validated = useMemo(
    () =>
      agendaTitle.length > 0 &&
      agendaContent.length > 0 &&
      agendaResolution.length > 0 &&
      agendaChoice.length > 0,
    [agendaTitle, agendaContent, agendaResolution, agendaChoice],
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
          <ModalInner title="투표 항목" count={agendaChoice.length}>
            <ModalInner.AddVoteOptionArea
              onClick={onNewChoiceState}
              onSubmit={onNewChoiceSubmit}
              value={agendaNewChoice}
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
          <Link
            to={validated ? ".." : "#"}
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
                템플릿 생성하기
              </Text>
            </Button>
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};
