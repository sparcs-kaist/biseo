import React from "react";
import { Modal, TerminatedModalInner } from "@/components/molecules";
import { Box, Header, Table, Cell, Row } from "../atoms";
import { useLocation } from "react-router-dom";
import { useAdminAgenda } from "@/services/admin-agenda";

export const TerminatedAgendaModal: React.FC = () => {
  const location = useLocation();
  // location.state로 접근해서 필요한 데이터 사용
  console.log(location.state);
  const modalParams = new URLSearchParams(location.search);
  const agendaId = parseInt(modalParams.get("agendaId") as string);

  const { targetAgenda } = useAdminAgenda(state => ({
    targetAgenda: state.adminAgendas.find(
      agenda => agenda.id === agendaId && agenda.status === "terminated",
    ),
  }));
  const totalChoiceCount =
    targetAgenda == undefined
      ? 0
      : targetAgenda?.choices
          .map(choice => choice.count)
          .reduce((prev, current) => prev + current, 0);
  const totalVoterCount =
    targetAgenda?.voters.voted.length == undefined
      ? 0
      : targetAgenda?.voters.voted.length;
  const totalVotableCount =
    targetAgenda?.voters.total.length == undefined
      ? 0
      : targetAgenda?.voters.total.length;

  return (
    <Modal title="종료된 투표">
      <Box h={498} w={630} justify="space-between" dir="row">
        <Box w={300} h={498} gap={20} dir="column">
          <Box w={300} gap={10}>
            <TerminatedModalInner.TextBoxWithTitle title="투표 제목">
              {targetAgenda?.title}
            </TerminatedModalInner.TextBoxWithTitle>
            <TerminatedModalInner.TextBoxWithTitle title="투표 내용">
              {targetAgenda?.content}
            </TerminatedModalInner.TextBoxWithTitle>
            <TerminatedModalInner.TextBoxWithTitle title="의결 문안">
              {targetAgenda?.resolution}
            </TerminatedModalInner.TextBoxWithTitle>
          </Box>
          <Box w={300} h={245} gap={10}>
            <TerminatedModalInner.ParticipantBar
              total={totalVotableCount}
              participant={totalVoterCount}
            />
            <Box w={300} h={177} dir="column" gap={8}>
              <TerminatedModalInner.OptionResultsBox>
                {targetAgenda?.choices.map(choice => (
                  <TerminatedModalInner.OptionVoteResult
                    name={choice.name}
                    count={choice.count}
                    totalCount={totalChoiceCount}
                    w={280}
                  />
                ))}
              </TerminatedModalInner.OptionResultsBox>
            </Box>
          </Box>
        </Box>
        <Table>
          <Header>
            <Cell w={27} onClick={() => ({})}>
              ㅁ
            </Cell>
            <Cell w={55}>이름</Cell>
            <Cell w={80}>닉네임</Cell>
            <Cell>태그</Cell>
          </Header>
          {targetAgenda?.voters.total.map(user => (
            <Row>
              <Cell w={27} onClick={() => ({})}>
                ㅁ
              </Cell>
              <Cell w={55}>{user.username}</Cell>
              <Cell w={80}>{user.displayName}</Cell>
              <Cell>태그</Cell>
            </Row>
          ))}
        </Table>
      </Box>
    </Modal>
  );
};
