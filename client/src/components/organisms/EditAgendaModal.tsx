import React from "react";
import { Modal } from "@/components/molecules";
import { Button, Box, Text, BorderedBox } from "@/components/atoms";
import { ModalInner } from "../molecules/ModalInnerTextBox";

const voteOptions: string[] = ["찬성", "반대", "기권"];

export const EditAgendaModal: React.FC = () => (
  <Modal title="투표 수정하기">
    <Box w={630} justify="space-between" padVertical={15} dir="row">
      <Box w={300} gap={20}>
        <Box gap={10}>
          <ModalInner title="템플릿 선택">
            <ModalInner.TextBox>테스트 투표</ModalInner.TextBox>
          </ModalInner>
          <ModalInner title="투표 제목">
            <ModalInner.TextBox>내용을 입력하세요</ModalInner.TextBox>
          </ModalInner>
          <ModalInner title="투표 설명">
            <ModalInner.TextBox>내용을 입력하세요</ModalInner.TextBox>
          </ModalInner>
          <ModalInner title="의결 문안">
            <ModalInner.TextBox>내용을 입력하세요</ModalInner.TextBox>
          </ModalInner>
        </Box>

        <ModalInner title="투표 항목" count={1}>
          <ModalInner.AddVoteOptionArea>
            {voteOptions.map(opt => (
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
      <Box w={300} gap={20}>
        <ModalInner title="태그 선택">
          <ModalInner.TextBox>태그를 선택하세요</ModalInner.TextBox>
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
          ></BorderedBox>
        </ModalInner>
        <Box w="fill" gap={20}>
          <Box dir="row" w="fill" justify="space-between">
            <Box gap={20} dir="row" w="fill">
              <Text variant="body" color="black">
                투표 결과
              </Text>
              <Text variant="body" color="gray600">
                비공개
              </Text>
            </Box>
            <Box gap={20} dir="row" w="fill">
              <Text variant="body" color="black">
                투표 상세
              </Text>
              <Text variant="body" color="gray600">
                무기명
              </Text>
            </Box>
          </Box>
          <Box dir="row" w="fill" gap={10} justify="space-between">
            <Button h={38}>
              <Text variant="boldtitle3" color="blue600">
                투표 수정하기
              </Text>
            </Button>
            <Button h={38}>
              <Text variant="boldtitle3" color="blue600">
                투표 삭제하기
              </Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  </Modal>
);
