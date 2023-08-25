import React from "react";
import { Modal, ModalInner } from "@/components/molecules";
import { Button, Box, Text } from "@/components/atoms";
import { UserTable } from "@/components/organisms";

export const EditUserTagModal: React.FC = () => {
  return (
    <Modal title="태그 수정하기" width={680} height={431}>
      <Box w={630} justify="space-between" padVertical={15} dir="row">
        <Box w={300} gap={20} align="flex-start" self="stretch">
          <Box gap={10}>
            <ModalInner title="태그 제목 *">
              {/*<ModalInner.InputBox> */}
              <ModalInner.TextBox>정회원</ModalInner.TextBox>
              {/*</ModalInner.TextBox> */}
            </ModalInner>
            <ModalInner title="태그 설명 *">
              {/*<ModalInner.InputBox> */}
              <ModalInner.TextBox>
                2022년도 기준 정회원 승급 심사 템플릿 입니다.
              </ModalInner.TextBox>
              {/*</ModalInner.TextBox> */}
            </ModalInner>
            <ModalInner title="태그 대상 보기" count={4}>
              <Box gap={8} dir="row">
                <ModalInner.TagChoice>
                    이혜원
                </ModalInner.TagChoice>
                <ModalInner.TagChoice>
                    김민주
                </ModalInner.TagChoice>
                <ModalInner.TagChoice>
                    장하준
                </ModalInner.TagChoice>
                <ModalInner.TagChoice>
                    김지연
                </ModalInner.TagChoice>
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
            <UserTable selectedUsers={[]}></UserTable>
          </ModalInner>
        </Box>
      </Box>
    </Modal>
  );
};
