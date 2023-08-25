import React, { useState } from "react";
import { Modal, ModalInner } from "@/components/molecules";
import { Button, Box, Text } from "@/components/atoms";
import { UserTable } from "@/components/organisms";
import { useUserTag } from "@/services/user-tag";

export const CreateUserTagModal: React.FC = () => {
  return (
    <Modal title="태그 생성하기" width={680} height={431}>
      <Box w={630} justify="space-between" padVertical={15} dir="row">
        <Box w={300} gap={20} align="flex-start" self="stretch">
          <Box gap={10}>
            <ModalInner title="태그 제목 *">
              {/*<ModalInner.InputBox> */}
              <ModalInner.TextBox>내용을 입력하세요</ModalInner.TextBox>
              {/*</ModalInner.TextBox> */}
            </ModalInner>
            <ModalInner title="태그 설명 *">
              {/*<ModalInner.InputBox> */}
              <ModalInner.TextBox>내용을 입력하세요</ModalInner.TextBox>
              {/*</ModalInner.TextBox> */}
            </ModalInner>

            <ModalInner title="태그 대상 보기" count={1}>
              <Box
                gap={8}
                dir="row"
                justify="start"
                align="flex-start"
                wrap="wrap"
              >
                <ModalInner.TagChoice>이혜원</ModalInner.TagChoice>
                <ModalInner.TagChoice>김지연</ModalInner.TagChoice>
                <ModalInner.TagChoice>장하준</ModalInner.TagChoice>
                <ModalInner.TagChoice>김민주</ModalInner.TagChoice>
                <ModalInner.TagChoice>이지윤</ModalInner.TagChoice>
                <ModalInner.TagChoice>권순호</ModalInner.TagChoice>
                <ModalInner.TagChoice>방동효</ModalInner.TagChoice>
                <ModalInner.TagChoice>기민준</ModalInner.TagChoice>
              </Box>
            </ModalInner>
          </Box>
          <Box dir="row" w="fill" gap={10} justify="space-between">
            <Button h={42}>
              <Text variant="boldtitle3" color="blue600">
                태그 생성하기
              </Text>
            </Button>
          </Box>
        </Box>
        <Box w={300} h={354} gap={20}>
          <ModalInner title="태그 대상" count={3}>
            <UserTable selectedUsers={[]}></UserTable>
          </ModalInner>
        </Box>
      </Box>
    </Modal>
  );
};
