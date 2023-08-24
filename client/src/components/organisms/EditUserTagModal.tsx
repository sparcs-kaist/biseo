import React from "react";
import { Modal } from "@/components/molecules";
import { Button, Box, Text, UserTagBox } from "@/components/atoms";
import { UserTable } from "@/components/organisms";
import { ModalInner } from "../molecules/ModalInnerTextBox";

export const EditUserTagModal: React.FC = () => {
  return (
    <Modal title="태그 수정하기">
      <Box w={630} justify="space-between" padVertical={15} dir="row">
        <Box w={300} gap={20}>
          <Box gap={10}>
            <ModalInner title="태그 제목">
              {/*<ModalInner.InputBox> */}
              <ModalInner.TextBox>정회원</ModalInner.TextBox>
              {/*</ModalInner.TextBox> */}
            </ModalInner>
            <ModalInner title="태그 설명">
              {/*<ModalInner.InputBox> */}
              <ModalInner.TextBox>
                2022년도 기준 정회원 승급 심사 템플릿 입니다.
              </ModalInner.TextBox>
              {/*</ModalInner.TextBox> */}
            </ModalInner>
            <ModalInner title="태그 대상 보기" count={4}>
              {/* TODO: TextBox이 아니라 알맞은 component 만들어서 넣기*/}
              <Box gap={8} dir="row">
                <UserTagBox h={30}>
                    이혜원
                </UserTagBox>
                <UserTagBox h={30}>
                    김민주
                </UserTagBox>
                <UserTagBox h={30}>
                    장하준
                </UserTagBox>
                <UserTagBox h={30}>
                    김지연
                </UserTagBox>
              </Box>
            </ModalInner>
          </Box>
          <Box dir="row" w="fill" gap={10} justify="space-between">
            <Button h={40}>
              <Text variant="boldtitle3" color="blue600">
                태그 수정하기
              </Text>
            </Button>
            <Button h={40}>
              <Text variant="boldtitle3" color="blue600">
                태그 삭제하기
              </Text>
            </Button>
          </Box>
        </Box>
        <Box w={300} gap={20}>
          <ModalInner title="태그 대상" count={3}>
            <UserTable></UserTable>
          </ModalInner>
        </Box>
      </Box>
    </Modal>
  );
};
