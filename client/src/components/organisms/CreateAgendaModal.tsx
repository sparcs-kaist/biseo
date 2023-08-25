import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Text,
  SelectTagBox,
  SelectTemplateBox,
} from "@/components/atoms";
import {
  AdminAgendaTagsSelect,
  Modal,
  ModalInner,
} from "@/components/molecules";
import { UserTable } from "@/components/organisms";

import { useAgendaTemplate } from "@/services/agenda-template";
import { useAdminAgenda } from "@/services/admin-agenda";
import { useAdminUser } from "@/services/admin-user";
import { useUserTag } from "@/services/user-tag";

import type { AgendaTemplate } from "@biseo/interface/agenda/template";

export const CreateAgendaModal: React.FC = () => {
  const [titleState, setTitleState] = useState("");
  const [contentState, setContentState] = useState("");
  const [resolutionState, setResolutionState] = useState("");

  const [choicesState, setChoicesState] = useState<string[]>([]);
  const [votersState, setVotersState] = useState<number[]>([]);
  const [newchoiceState, setNewchoiceState] = useState("");
  const [templateState, setTemplateState] = useState(0);
  const { createAgenda } = useAdminAgenda(state => ({
    createAgenda: state.createAgenda,
  }));
  const { tags, retrieveTags } = useUserTag(state => ({
    tags: state.userTags,
    retrieveTags: state.retrieveAll,
  }));
  const { users, retrieveUsers } = useAdminUser(state => ({
    users: state.adminUsers,
    retrieveUsers: state.retrieveAll,
  }));
  useEffect(() => {
    retrieveTags();
    retrieveUsers();
  }, []);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleState(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const applySelectedTags = () => {
    const tagIsSelected = (tag: string) => selectedTags.includes(tag);
    const selected = users.filter(user => user.tags.some(tagIsSelected));
    setSelectedUsers(selected.map(user => user.id));
  };

  const onChangeSelectedTags = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = e.target;
    const optionNum = options.length;

    const selected = [];
    for (var i = 0; i < optionNum; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setSelectedTags(selected);
  };

  return (
    <Modal width={680} height={590} title="투표 생성하기">
      <Box w={630} justify="space-between" dir="row">
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
                템플릿을 선택하세요
              </SelectTemplateBox>
            </ModalInner>
            <ModalInner title="투표 제목">
              <ModalInner.InputBox onClick={onChangeTitle} value={titleState}>
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="투표 설명">
              <ModalInner.TextAreaInputBox
                placeholder="내용을 입력하세요"
                value={contentState}
                onChange={onChangeContent}
              />
            </ModalInner>
            <ModalInner title="의결 문안">
              <ModalInner.InputBox
                onClick={onChangeResolution}
                value={resolutionState}
              >
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>

            <ModalInner title="투표 항목" count={choicesState.length}>
              <ModalInner.AddVoteOptionArea
                onClick={onChangeChoice}
                onSubmit={onSubmitChoice}
              >
                {choicesState.map(opt => (
                  <ModalInner.VoteChoice key={opt}>{opt}</ModalInner.VoteChoice>
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
          <ModalInner
            title="태그 선택"
            buttonText="선택된 태그 적용하기"
            buttonOnClick={applySelectedTags}
          >
            <SelectTagBox
              selected={selectedTags}
              onChange={onChangeSelectedTags}
            />
          </ModalInner>
          <ModalInner title="투표 대상" count={3}>
            <UserTable
              setSelectedUsers={setVotersState}
              selectedUsers={votersState}
              selected={selectedUsers}
              editable
            />
          </ModalInner>
          <Box w={300} h={106} gap={10}>
            <Box dir="row" w={270} h={28} justify="space-between">
              <AdminAgendaTagsSelect />
            </Box>
            <Button
              h={38}
              onClick={() =>
                createAgenda({
                  title: titleState,
                  content: contentState,
                  resolution: resolutionState,
                  voters: {
                    total: votersState,
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
    </Modal>
  );
};
