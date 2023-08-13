import React from "react";
import {
  Modal,
  ModalInnerTextBox,
  OptionVoteResult,
  ParticipantBar,
} from "@/components/molecules";
import { BorderedBox, Box, Table, Text, TextArea } from "../atoms";

export const TerminatedAgendaModal: React.FC = () => (
  <Modal title="종료된 투표">
    <Box h={498} w={630} justify="space-between" dir="row">
      <Box w={300} h={498} gap={20} dir="column">
        <Box w={300} gap={10}>
          <ModalInnerTextBox
            title="투표 제목"
            content="이혜원 회원의 승급 심사"
          />
          <ModalInnerTextBox
            title="투표 내용"
            content="이혜원 회원의 승급 심사입니다 참 재밌겠죠? 사실 안봐도 승급 확정이긴합니다 이걸 왜 하냐고요?"
          />
          <ModalInnerTextBox title="의결 문안" content="글쎄요" />
        </Box>
        <Box w={300} h={245} gap={10}>
          <ParticipantBar total={10} participant={7} />
          <Box w={300} h={177} dir="column" gap={8}>
            <Text variant="body" color="black">
              투표 결과
            </Text>
            <BorderedBox
              w={300}
              borderColor="gray200"
              borderSize={1}
              borderStyle="solid"
              round={5}
              pad={10}
              gap={10}
              dir="column"
            >
              <OptionVoteResult name="찬성" count={5} totalCount={7} w={280} />
              <OptionVoteResult name="반대" count={2} totalCount={7} w={280} />
            </BorderedBox>
          </Box>
        </Box>
      </Box>
      <Table></Table>
    </Box>
  </Modal>
);
