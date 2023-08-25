import React, { useEffect, useState } from "react";
import { Modal, ModalInner } from "@/components/molecules";
import { Button, Box, Text } from "@/components/atoms";
import { UserTable } from "@/components/organisms";
import { useUserTag } from "@/services/user-tag";
import { useAdminUser } from "@/services/admin-user";
import { Link } from "react-router-dom";

export const CreateUserTagModal: React.FC = () => {
  const [titleState, setTitleState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const { createTag } = useUserTag(state => ({
    createTag: state.createTag,
  }));

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleState(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionState(e.target.value);
  };
  const [tagersState, setTagersState] = useState<number[]>([]);

  const { users, retrieveUsers } = useAdminUser(state => ({
    users: state.adminUsers,
    retrieveUsers: state.retrieveAll,
  }));

  // tagerState에 있는 number[]에 있는 유저들의 id와 같은 유저들의 이름을 하나씩 보여준다.

  return (
    <Modal title="태그 생성하기" width={680} height={431}>
      <Box w={630} justify="space-between" padVertical={15} dir="row">
        <Box w={300} gap={20} align="flex-start" self="stretch">
          <Box gap={10}>
            <ModalInner title="태그 제목 *">
              <ModalInner.InputBox onClick={onChangeTitle} value={titleState}>
                내용을 입력하세요
              </ModalInner.InputBox>
            </ModalInner>
            <ModalInner title="태그 설명 *">
              <ModalInner.InputBox
                onClick={onChangeDescription}
                value={descriptionState}
              >
                내용을 입력하세요
              </ModalInner.InputBox>
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
              </Box>
            </ModalInner>
          </Box>
          <Box dir="row" w="fill" gap={10} justify="space-between">
            <Link to=".." relative="path" replace>
              <Button
                h={42}
                onClick={() =>
                  createTag({
                    title: titleState,
                    description: descriptionState,
                    users: tagersState,
                  })
                }
              >
                <Text variant="boldtitle3" color="blue600">
                  태그 생성하기
                </Text>
              </Button>
            </Link>
          </Box>
        </Box>
        <Box w={300} h={354} gap={20}>
          <ModalInner title="태그 대상" count={3}>
            <UserTable
              setSelectedUsers={setTagersState}
              selectedUsers={tagersState}
              selected={selectedUsers}
              editable
            ></UserTable>
          </ModalInner>
        </Box>
      </Box>
    </Modal>
  );
};
