import React, { useEffect, useState, useMemo } from "react";
import { Modal, ModalInner } from "@/components/molecules";
import { Button, Box, Text } from "@/components/atoms";
import { UserTable } from "@/components/organisms";
import { useUserTagi } from "@/services/user-tag";
import { useAdminUser } from "@/services/admin-user";
import { Link } from "react-router-dom";

export const CreateUserTagModal: React.FC = () => {
  const [titleState, setTitleState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const { createTag } = useUserTagi(state => ({
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

  const filteredUsers = useMemo(() => {
    if (tagersState.length >= 0) {
      return users.filter(user => tagersState.includes(user.id) ? user.username : null);
    }
    return users;
  }, [users, tagersState]);

  return (
    <Modal title="태그 생성하기" width={680} height={431}>
      <Box w={630} dir="row" justify="space-between" padVertical={15}>
        <Box w={300} gap={20}>
          <ModalInner title="태그 제목" required>
            <ModalInner.InputBox onClick={onChangeTitle} value={titleState}>
              내용을 입력하세요
            </ModalInner.InputBox>
          </ModalInner>

          <ModalInner title="태그 설명" required>
            <ModalInner.InputBox
              onClick={onChangeDescription}
              value={descriptionState}
            >
              내용을 입력하세요
            </ModalInner.InputBox>
          </ModalInner>

          <Box w={300} h={101} dir="column" justify="space-between">
            <ModalInner title="태그 대상 보기" count={tagersState.length}>
              <Box
                gap={8}
                dir="row"
                justify="start"
                align="flex-start"
                wrap="wrap"
              >
                {filteredUsers.map(user => (
                  <ModalInner.TagChoice>{user.username}</ModalInner.TagChoice>
                ))}
              </Box>
            </ModalInner>
          </Box>
          <Box dir="row" w="fill" gap={10} justify="space-between">
            <Link to=".." relative="path" replace>
              <Button
                w={300}
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
          <ModalInner title="태그 대상" count={tagersState.length}>
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
