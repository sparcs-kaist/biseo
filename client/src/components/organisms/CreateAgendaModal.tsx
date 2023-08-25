import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  SelectTagBox,
  SelectTemplateBox,
  Text,
} from "@/components/atoms";
import {
  AdminAgendaTagsSelect,
  Modal,
  ModalInner,
} from "@/components/molecules";
import { UserTable } from "@/components/organisms";

import { useAdminAgenda } from "@/services/admin-agenda";
import { useAgendaTemplate } from "@/services/agenda-template";
import { useAdminUser } from "@/services/admin-user";

export const CreateAgendaModal: React.FC = () => {
  const { createAgenda } = useAdminAgenda(state => ({
    createAgenda: state.createAgenda,
  }));
  const { findTemplate } = useAgendaTemplate(state => ({
    findTemplate: state.findTemplate,
  }));
  const { users } = useAdminUser(state => ({
    users: state.adminUsers,
  }));
  useEffect(() => {}, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [resolution, setResolution] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [voters, setVoters] = useState<number[]>([]);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const onChangeResolution = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResolution(e.target.value);
  };

  const [template, setTemplate] = useState(0);
  const applyTemplate = (templateId: number) => {
    const targetTemplate = findTemplate(templateId);
    if (targetTemplate != undefined) {
      setTemplate(templateId);
      setTitle(targetTemplate.title);
      setContent(targetTemplate.content);
      setResolution(targetTemplate.resolution);
      setChoices(targetTemplate.choices);
    }
  };

  const [newchoice, setNewchoice] = useState("");
  const onChangeChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewchoice(e.target.value);
  };
  const addChoice = () => {
    if (!choices.includes(newchoice)) {
      setChoices([...choices, newchoice]);
      setNewchoice("");
    }
  };
  const deleteChoice = (choice: string) => {
    setChoices(choices.filter(c => c !== choice));
  };

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

  const validated = useMemo(
    () =>
      title.length > 0 &&
      content.length > 0 &&
      resolution.length > 0 &&
      choices.length > 0,
    [title, content, resolution, choices],
  );

  const onSubmit = () => {
    if (!validated) return;
    createAgenda({
      title: title,
      content: content,
      resolution: resolution,
      voters: {
        total: voters,
      },
      choices: choices.filter(word => word != ""),
    });
  };

  return (
    <Modal title="투표 생성하기">
      <Box w={630} justify="space-between" dir="row">
        <Box w={300} gap={20}>
          <Box gap={10}>
            <ModalInner
              title="템플릿 선택"
              buttonOnClick={() => applyTemplate(template)}
              buttonText="템플릿 적용"
            >
              <SelectTemplateBox
                width={300}
                height={38}
                onChange={(templateId: number) => {
                  setTemplate(templateId);
                }}
              >
                템플릿을 선택하세요
              </SelectTemplateBox>
            </ModalInner>
            <ModalInner title="투표 제목" required>
              <ModalInner.InputBox onClick={onChangeTitle} value={title}>
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="투표 설명" required>
              <ModalInner.TextAreaInputBox
                placeholder="내용을 입력하세요"
                value={content}
                onChange={onChangeContent}
              />
            </ModalInner>
            <ModalInner title="의결 문안" required>
              <ModalInner.InputBox
                onClick={onChangeResolution}
                value={resolution}
              >
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>

            <ModalInner title="투표 항목" count={choices.length} required>
              <ModalInner.AddVoteOptionArea
                onClick={onChangeChoice}
                onSubmit={addChoice}
                value={newchoice}
              >
                {choices.map(opt => (
                  <ModalInner.VoteChoice
                    key={opt}
                    onClick={() => deleteChoice(opt)}
                  >
                    {opt}
                  </ModalInner.VoteChoice>
                ))}
              </ModalInner.AddVoteOptionArea>
            </ModalInner>
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
          <ModalInner title="투표 대상" count={voters.length}>
            <UserTable
              setSelectedUsers={setVoters}
              selectedUsers={voters}
              selected={selectedUsers}
              editable
            />
          </ModalInner>
          <Box
            w={300}
            h={106}
            gap={10}
            align="center"
            justify="center"
            bg="blue100"
          >
            <Box dir="row" w={270} h={28} justify="space-between">
              <AdminAgendaTagsSelect />
            </Box>
            <Link
              to=".."
              relative="path"
              replace
              style={{ textDecoration: "none" }}
            >
              <Button w={270} h={38} onClick={onSubmit} disabled={!validated}>
                <Text variant="boldtitle3" color="blue600">
                  투표 생성하기
                </Text>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
