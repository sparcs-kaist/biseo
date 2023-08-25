import React, { useState } from "react";
import type { AdminAgendaUpdate } from "@biseo/interface/admin/agenda";
import { AdminAgendaTagsSelect, Modal } from "@/components/molecules";
import { Box, Button, SelectTemplateBox, Text } from "@/components/atoms";
import { ModalInner } from "@/components/molecules";
import { Link, useLocation } from "react-router-dom";
import { UserTable } from "@/components/organisms";

import { useAdminAgenda } from "@/services/admin-agenda";

export const EditAgendaModal: React.FC = () => {
  const [agendaUpdate, setAgendaUpdate] = useState<AdminAgendaUpdate>();
  const [titleState, setTitleState] = useState("");
  const [contentState, setContentState] = useState("");
  const [resolutionState, setResolutionState] = useState("");

  const [newchoiceState, setNewchoiceState] = useState("");
  const location = useLocation();

  const modalParams = new URLSearchParams(location.search);
  const agendaId = parseInt(modalParams.get("agendaId") as string);

  const { targetAgenda } = useAdminAgenda(state => ({
    targetAgenda: state.adminAgendas.find(
      agenda => agenda.id === agendaId && agenda.status === "preparing",
    ),
  }));
  const [choicesState, setChoicesState] = useState(
    targetAgenda!.choices.map(choice => {
      return choice.name;
    }),
  );
  const [votersState, setVotersState] = useState<number[]>(
    targetAgenda!.voters.total.map(voters => {
      return voters.id;
    }),
  );

  const { updateAgenda } = useAdminAgenda(state => ({
    updateAgenda: state.updateAgenda,
  }));
  const { deleteAgenda } = useAdminAgenda(state => ({
    deleteAgenda: state.deleteAgenda,
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
  const onSubmitChoice = () => {
    setChoicesState([...choicesState!, newchoiceState]);
  };

  const update = (AgendaParam: AdminAgendaUpdate) => {
    targetAgenda &&
      updateAgenda({
        id: AgendaParam.id,
        title: AgendaParam.title,
        content: AgendaParam.content,
        resolution: AgendaParam.resolution,
        voters: {
          total: AgendaParam.voters.total,
        },
        choices: AgendaParam.choices,
      });
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

          <ModalInner title="투표 항목" count={1}>
            <ModalInner.AddVoteOptionArea
              value={newchoiceState}
              onClick={onChangeChoice}
              onSubmit={onSubmitChoice}
            >
              {choicesState.map(opt => (
                <ModalInner.VoteChoice>{opt}</ModalInner.VoteChoice>
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
          <ModalInner title="투표 대상" count={votersState.length}>
            <UserTable
              selectedUsers={votersState}
              setSelectedUsers={setVotersState}
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
                      title: titleState,
                      content: contentState,
                      resolution: resolutionState,
                      voters: {
                        total: votersState,
                      },
                      choices: choicesState,
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
