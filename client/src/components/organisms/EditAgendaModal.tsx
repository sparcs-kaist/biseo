import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
import { useAdminUser } from "@/services/admin-user";
import { useAgendaTemplate } from "@/services/agenda-template";

export const EditAgendaModal: React.FC = () => {
  const location = useLocation();
  const modalParams = new URLSearchParams(location.search);
  const agendaId = parseInt(modalParams.get("agendaId") as string);

  const { targetAgenda, updateAgenda, deleteAgenda } = useAdminAgenda(
    state => ({
      targetAgenda: state.adminAgendas.find(
        agenda => agenda.id === agendaId && agenda.status === "preparing",
      ),
      updateAgenda: state.updateAgenda,
      deleteAgenda: state.deleteAgenda,
    }),
  );
  const { users, retrieveUsers } = useAdminUser(state => ({
    users: state.adminUsers,
    retrieveUsers: state.retrieveAll,
  }));
  useEffect(() => {
    retrieveUsers();
  }, []);

  const [title, setTitle] = useState(targetAgenda?.title || "");
  const [content, setContent] = useState(targetAgenda?.content || "");
  const [resolution, setResolution] = useState(targetAgenda?.resolution || "");
  const [template, setTemplate] = useState(0);
  const [choices, setChoices] = useState(
    targetAgenda?.choices.map(choice => {
      return choice.name;
    }) || [],
  );
  const [voters, setVoters] = useState(
    targetAgenda?.voters.total.map(voters => {
      return voters.id;
    }) || [],
  );
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const onChangeResolution = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResolution(e.target.value);
  };

  const [newchoice, setNewchoice] = useState("");
  const onChangeChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewchoice(e.target.value);
  };
  const addChoice = () => {
    if (newchoice.length > 0 && !choices.includes(newchoice)) {
      setChoices([...choices, newchoice]);
      setNewchoice("");
    }
  };
  const deleteChoice = (choice: string) => {
    setChoices(choices.filter(c => c !== choice));
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const applySelectedTags = () => {
    const tagIsSelected = (tag: string) => selectedTags.includes(tag);
    const selected = users.filter(user => user.tags.some(tagIsSelected));
    setVoters(selected.map(user => user.id));
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
  const { findTemplate } = useAgendaTemplate(state => ({
    findTemplate: state.findTemplate,
  }));
  const applyTemplate = (templateId: number) => {
    if (templateId === 0) {
      setTemplate(0);
      setTitle("");
      setContent("");
      setResolution("");
      setChoices([]);
    }
    const targetTemplate = findTemplate(templateId);
    if (targetTemplate !== undefined) {
      setTemplate(templateId);
      setTitle(targetTemplate.title);
      setContent(targetTemplate.content);
      setResolution(targetTemplate.resolution);
      setChoices(targetTemplate.choices);
    }
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
    updateAgenda({
      id: agendaId,
      title: title,
      content: content,
      resolution: resolution,
      voters: {
        total: voters,
      },
      choices: choices,
    });
  };

  return (
    <Modal title="투표 수정하기">
      <Box w={630} justify="space-between" padVertical={15} dir="row">
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
              <ModalInner.InputBox value={title} onChange={onChangeTitle} />
            </ModalInner>
            <ModalInner title="투표 설명" required>
              <ModalInner.InputBox value={content} onChange={onChangeContent} />
            </ModalInner>
            <ModalInner title="의결 문안" required>
              <ModalInner.InputBox
                value={resolution}
                onChange={onChangeResolution}
              />
            </ModalInner>
          </Box>

          <ModalInner title="투표 항목" count={choices.length} required>
            <ModalInner.AddVoteOptionArea
              value={newchoice}
              onClick={onChangeChoice}
              onSubmit={addChoice}
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
              selectedUsers={voters}
              setSelectedUsers={setVoters}
              editable
              filterBy="tag"
            />
          </ModalInner>
          <Box
            w={270}
            gap={10}
            bg="blue100"
            padVertical={12}
            padHorizontal={15}
            round={5}
          >
            <AdminAgendaTagsSelect />
            <Box dir="row" w="fill" gap={10} justify="space-between">
              <Link
                to={validated ? ".." : `?agendaId=${agendaId}`}
                relative="path"
                replace
                style={{ textDecoration: "none" }}
              >
                <Button w={130} h={38} onClick={onSubmit} disabled={!validated}>
                  <Text variant="boldtitle3" color="blue600">
                    투표 수정하기
                  </Text>
                </Button>
              </Link>
              <Link
                to=".."
                relative="path"
                replace
                style={{ textDecoration: "none" }}
              >
                <Button w={130} h={38} onClick={() => deleteAgenda(agendaId)}>
                  <Text variant="boldtitle3" color="blue600">
                    투표 삭제하기
                  </Text>
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
