import React, { ReactNode, useState } from "react";
import { AdminAgendaTagsSelect, Modal } from "@/components/molecules";
import { Button, Box, Text, BorderedBox, SelectText } from "@/components/atoms";
import { ModalInner } from "../molecules/ModalInnerTextBox";

import { useAdminAgenda } from "@/services/admin-agenda";
import { AdminAgendaCreate } from "@biseo/interface/admin/agenda";
import { useLocation } from "react-router-dom";
import { UserTable } from "./UserTable";
import { SelectTemplateBox } from "../atoms/SelectTemplateBox";
import { useAgendaTemplate } from "@/services/agenda-template";
import { AgendaTemplate } from "@biseo/interface/agenda/template";
import { Agenda } from "@biseo/interface/agenda";

export const CreateAgendaModal: React.FC = () => {
  const [agendaCreate, setAgendaCreate] = useState<AdminAgendaCreate>();
  const [titleState, setTitleState] = useState("");
  const [contentState, setContentState] = useState("");
  const [resolutionState, setResolutionState] = useState("");
  const [choicesState, setChoicesState] = useState<string[]>([]);
  const [newchoiceState, setNewchoiceState] = useState("");
  const [templateState, setTemplateState] = useState(0);
  const { createAgenda } = useAdminAgenda(state => ({
    createAgenda: state.createAgenda,
  }));

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleState(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentState(e.target.value);
  };
  const onChangeResolution = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResolutionState(e.target.value);
  };
  const onChangeChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewchoiceState(e.target.value);
  };
  const onSubmitChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoicesState([...choicesState, newchoiceState]);
    setNewchoiceState("");
  };
  const { findTemplate } = useAgendaTemplate(state => ({
    findTemplate: state.findTemplate,
  }));

  const emptyTemplate: AgendaTemplate = {
    id: 0,
    title: "",
    content: "",
    resolution: "",
    choices: [],
    templateName: "",
  };
  return (
    <Modal width={680} height={590} title="투표 생성하기">
      <Box w={630} justify="space-between" padVertical={15} dir="row">
        <Box w={300} gap={20}>
          <Box gap={10}>
            <ModalInner title="템플릿 선택">
              <SelectTemplateBox
                width={300}
                height={38}
                onChange={(templateId: number) => {
                  const targetTemplate = findTemplate(templateId);
                  if (targetTemplate != undefined) {
                    setTemplateState(templateId);
                    setTitleState(targetTemplate.title);
                    setContentState(targetTemplate.content);
                    setResolutionState(targetTemplate.resolution);
                    setChoicesState(targetTemplate.choices);
                  }
                }}
              >
                탬플릿을 선택하세요
              </SelectTemplateBox>
            </ModalInner>
            <ModalInner title="투표 제목">
              <ModalInner.InputBox onClick={onChangeTitle} value={titleState}>
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="투표 설명">
              <ModalInner.InputBox
                onClick={() => {} /*onChangeContent*/}
                value={contentState}
              >
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="의결 문안">
              <ModalInner.InputBox
                onClick={onChangeResolution}
                value={resolutionState}
              >
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>

            <ModalInner title="투표 항목" count={1}>
              <ModalInner.AddVoteOptionArea
                onClick={onChangeChoice}
                onSubmit={onSubmitChoice}
              >
                {choicesState.map(opt => (
                  <ModalInner.VoteChoice>{opt}</ModalInner.VoteChoice>
                ))}
              </ModalInner.AddVoteOptionArea>
            </ModalInner>
            <Box
              gap={10}
              bg="blue100"
              padVertical={12}
              padHorizontal={15}
              round={5}
            ></Box>
          </Box>
        </Box>
        <Box w={300} gap={20}>
          <ModalInner title="태그 선택">
            <SelectTemplateBox width={300} height={38} onChange={() => {}}>
              태그를 선택하세요
            </SelectTemplateBox>
          </ModalInner>
          <ModalInner title="투표 대상" count={3}>
            <BorderedBox
              borderColor="gray200"
              bg="white"
              w={298}
              h={277}
              borderSize={1}
              round={5}
              borderStyle="solid"
            >
              <UserTable editable />
            </BorderedBox>
          </ModalInner>
          <Box w={300} h={106} padHorizontal={13} padVertical={15} gap={10}>
            <Box dir="row" w={270} h={28} justify="space-between">
              <AdminAgendaTagsSelect />
            </Box>
            <Box dir="row" w="fill" gap={10} justify="space-between">
              <Button
                h={38}
                onClick={() =>
                  createAgenda({
                    title: titleState,
                    content: contentState,
                    resolution: resolutionState,
                    voters: {
                      total: [],
                    },
                    choices: choicesState.filter(word => word != ""),
                  })
                }
              >
                <Text variant="boldtitle3" color="blue600">
                  투표 생성하기
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
