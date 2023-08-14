import React from "react";
import {
  Modal,
  ModalInnerTextBox,
  OptionVoteResult,
  ParticipantBar,
  TerminatedModalInner,
} from "@/components/molecules";
import { BorderedBox, Box, Table, Text, TextArea } from "../atoms";

export const TerminatedAgendaModal: React.FC = () => (
  <Modal title="종료된 투표">
    <Box h={498} w={630} justify="space-between" dir="row">
      <Box w={300} h={498} gap={20} dir="column">
        <Box w={300} gap={10}>
          <TerminatedModalInner.TextBoxWithTitle title="투표 제목">
            이혜원 회원의 승급 심사
          </TerminatedModalInner.TextBoxWithTitle>
          <TerminatedModalInner.TextBoxWithTitle title="투표 내용">
            이혜원 회원의 승급 심사입니다 참 재밌겠죠? 사실 안봐도 승급
            확정이긴합니다 이걸 왜 하냐고요
          </TerminatedModalInner.TextBoxWithTitle>
          <TerminatedModalInner.TextBoxWithTitle title="의결 문안">
            글쎄요
          </TerminatedModalInner.TextBoxWithTitle>
        </Box>
        <Box w={300} h={245} gap={10}>
          <TerminatedModalInner.ParticipantBar total={10} participant={6} />
          <Box w={300} h={177} dir="column" gap={8}>
            <TerminatedModalInner.OptionResultsBox>
              <TerminatedModalInner.OptionVoteResult
                name="찬성"
                count={5}
                totalCount={7}
                w={280}
              />
              <TerminatedModalInner.OptionVoteResult
                name="반대"
                count={1}
                totalCount={7}
                w={280}
              />
              <TerminatedModalInner.OptionVoteResult
                name="몰루"
                count={1}
                totalCount={7}
                w={280}
              />
            </TerminatedModalInner.OptionResultsBox>
          </Box>
        </Box>
      </Box>
      <Table></Table>
    </Box>
  </Modal>
);
