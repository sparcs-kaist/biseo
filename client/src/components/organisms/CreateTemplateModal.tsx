import React, { useState } from "react";
import { Modal } from "@/components/molecules";
import { Button, Box, Text, BorderedBox } from "@/components/atoms";
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
    <Modal width={680} height={590} title="탬플릿 생성하기">
      <Box w={630} dir="row" justify="space-between">
        <Box w={300} dir="column" gap={20}>
          <Box dir="column" gap={8}>
            <Box dir="row">
              <Text variant="body" color="black">
                탬플릿 제목
              </Text>
              <Text variant="body" color="blue600">
                *
              </Text>
            </Box>
            <ModalInner.InputBox onClick={onChangeTemplateTitle} />
          </Box>

          <Box dir="column" gap={8}>
            <Box dir="row">
              <Text variant="body" color="black">
                투표 제목
              </Text>
              <Text variant="body" color="blue600">
                *
              </Text>
            </Box>
            <ModalInner.InputBox onClick={onChangeAgendaTitle} />
          </Box>

          <Box dir="column" gap={8}>
            <Box dir="row">
              <Text variant="body" color="black">
                투표 설명
              </Text>
              <Text variant="body" color="blue600">
                *
              </Text>
            </Box>
            <ModalInner.InputBox onClick={onChangeAgendaContent} />
          </Box>

          <Box dir="column" gap={8}>
            <Box dir="row">
              <Text variant="body" color="black">
                의결 문안
              </Text>
              <Text variant="body" color="blue600">
                *
              </Text>
            </Box>
            <ModalInner.InputBox onClick={onChangeAgendaResolution} />
          </Box>
        </Box>
        <Box w={300} h={313} dir="column" justify="space-between">
          <Box w={300} dir="column" gap={8}>
            <Box dir="row" gap={8}>
              <Text variant="body" color="black">
                투표 항목
              </Text>
              <Box w={20} h={20} round={5} bg="blue200">
                <Text variant="boldtitle4" color="blue600">
                  123
                </Text>
              </Box>
            </Box>
            <Box dir="column" gap={0}>
              <BorderedBox
                w={300}
                borderColor="gray200"
                borderSize={1}
                borderStyle="solid"
                roundTop={5}
                roundBot={0}
                bg="white"
                pad={10}
                gap={10}
              >
                {choiceState.map(choice => (
                  <BorderedBox
                    w={280}
                    h={32}
                    padVertical={6}
                    padHorizontal={12}
                    borderColor="gray200"
                    borderSize={1}
                    borderStyle="solid"
                    round={5}
                    justify="space-between"
                    dir="row"
                    align="center"
                  >
                    <Text variant="subtitle" color="gray500">
                      {choice}
                    </Text>
                    <Button
                      color="white"
                      w={13}
                      h={13}
                      padHorizontal={0}
                      onClick={() => deleteChoice(choice)}
                    >
                      <Text variant="subtitle" color="gray500">
                        쓰
                      </Text>
                    </Button>
                  </BorderedBox>
                ))}
              </BorderedBox>
              <BorderedBox
                w={300}
                h={38}
                borderColor="gray200"
                borderSize={1}
                borderStyle="solid"
                roundTop={0}
                roundBot={5}
                bg="gray100"
                padHorizontal={15}
                dir="row"
                justify="space-between"
                align="center"
              >
                <input
                  type="text"
                  placeholder="새로운 항목"
                  value={newChoiceState}
                  style={{ border: 0 }}
                  onChange={onNewChoiceState}
                />
                <Button
                  w={20}
                  h={20}
                  padHorizontal={0}
                  onClick={onNewChoiceSubmit}
                >
                  <Text variant="boldtitle4" color="blue600">
                    +
                  </Text>
                </Button>
              </BorderedBox>
            </Box>
          </Box>

          <Box dir="row" w={300} gap={10}>
            <Link to=".." relative="path" replace>
              <Button w={300} h={40} onClick={onTemplateUpdate}>
                <Text variant="boldtitle3" color="blue600">
                  탬플릿 생성하기
                </Text>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
