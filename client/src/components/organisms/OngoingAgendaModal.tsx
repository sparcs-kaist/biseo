import React from "react";
import { AdminAgendaTags, Modal } from "@/components/molecules";
import { Button, Box, Text } from "@/components/atoms";
import { ModalInner } from "../molecules/ModalInnerTextBox";
import { ParticipantBar } from "../molecules/ParticipantBar";

const voteOptions: string[] = ["찬성!", "찬성?", "찬성.."];

export const OngoingAgendaModal: React.FC = () => (
  <Modal title="진행 중인 투표">
    <Box w={630} justify="space-between" dir="row">
      <Box w={300} gap={20}>
        <Box gap={10}>
          <ModalInner title="투표 제목">
            <ModalInner.TextBox>✏️ 테스트 투표 ✏️</ModalInner.TextBox>
          </ModalInner>
          <ModalInner title="투표 설명">
            <ModalInner.TextBox>테스트 입니당.</ModalInner.TextBox>
          </ModalInner>
          <ModalInner title="의결문안">
            <ModalInner.TextBox>테스트를 진행한다.</ModalInner.TextBox>
          </ModalInner>
        </Box>
        <ModalInner title="투표 항목" count={3}>
          <ModalInner.VoteOptions>
            {voteOptions.map(opt => (
              <ModalInner.VoteOption>{opt}</ModalInner.VoteOption>
            ))}
          </ModalInner.VoteOptions>
          {/* this approach could be better
          <ModalInner.VoteOptions options={voteOptions}/>
          */}
        </ModalInner>
        <Box
          gap={10}
          bg="blue100"
          padVertical={12}
          padHorizontal={15}
          round={5}
        >
          <AdminAgendaTags />
          <Box dir="row" w="fill" gap={10} justify="space-between">
            <Button h={38}>
              <Text variant="boldtitle3" color="blue600">
                투표 독촉하기
              </Text>
            </Button>
            <Button h={38}>
              <Text variant="boldtitle3" color="blue600">
                투표 종료하기
              </Text>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box w={300} gap={20}>
        <ParticipantBar total={20} participant={10}></ParticipantBar>
      </Box>
    </Box>
  </Modal>
);
