import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import type { AdminAgendaUpdate } from "@biseo/interface/admin/agenda";

import { Box, Button, SelectTemplateBox, Text } from "@/components/atoms";
import {
  AdminAgendaTagsSelect,
  Modal,
  ModalInner,
} from "@/components/molecules";
import { UserTable } from "@/components/organisms";

import { useAdminAgenda } from "@/services/admin-agenda";

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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [resolution, setResolution] = useState("");
  const [choices, setChoices] = useState(
    targetAgenda!.choices.map(choice => {
      return choice.name;
    }),
  );
  const [voters, setVoters] = useState<number[]>(
    targetAgenda!.voters.total.map(voters => {
      return voters.id;
    }),
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
    setChoices([...choices!, newchoice]);
  };
  const deleteChoice = (choice: string) => {
    setChoices(choices.filter(c => c !== choice));
  };

  return (
    <Modal title="투표 수정하기">
      <Box w={630} justify="space-between" padVertical={15} dir="row">
        <Box w={300} gap={20}>
          <Box gap={10}>
            <ModalInner title="템플릿 선택">
              <SelectTemplateBox width={300} height={38} onChange={() => {}}>
                탬플릿을 선택하세요
              </SelectTemplateBox>
            </ModalInner>
            <ModalInner title="투표 제목">
              <ModalInner.InputBox onClick={onChangeTitle}>
                {targetAgenda?.title}
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="투표 설명">
              <ModalInner.InputBox onClick={onChangeContent}>
                {targetAgenda?.content}
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="의결 문안">
              <ModalInner.InputBox onClick={onChangeResolution}>
                {targetAgenda?.resolution}
              </ModalInner.InputBox>
            </ModalInner>
          </Box>

          <ModalInner title="투표 항목" count={choices.length}>
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
          <ModalInner title="태그 선택">
            <SelectTemplateBox width={300} height={38} onChange={() => {}}>
              탬플릿을 선택하세요
            </SelectTemplateBox>
          </ModalInner>
          <ModalInner title="투표 대상" count={voters.length}>
            <UserTable
              selectedUsers={voters}
              setSelectedUsers={setVoters}
              editable
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
                to=".."
                relative="path"
                replace
                style={{ textDecoration: "none" }}
              >
                <Button
                  w={130}
                  h={38}
                  onClick={() =>
                    updateAgenda({
                      id: targetAgenda!.id,
                      title: title,
                      content: content,
                      resolution: resolution,
                      voters: {
                        total: voters,
                      },
                      choices: choices,
                    })
                  }
                >
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
                <Button
                  w={130}
                  h={38}
                  onClick={() => deleteAgenda(targetAgenda!.id)}
                >
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
