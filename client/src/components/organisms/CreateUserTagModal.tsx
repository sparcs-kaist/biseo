import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import { Button, Box, Text } from "@/components/atoms";
import { Modal, ModalInner } from "@/components/molecules";
import { UserTable } from "@/components/organisms";

import { useAdminUser } from "@/services/admin-user";
import { useUserTag } from "@/services/user-tag";

export const CreateUserTagModal: React.FC = () => {
  const { users, retrieveUsers } = useAdminUser(state => ({
    users: state.adminUsers,
    retrieveUsers: state.retrieveAll,
  }));
  const { createTag } = useUserTag(state => ({
    createTag: state.createTag,
  }));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taggers, setTaggers] = useState<number[]>([]);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const filteredUsers = useMemo(() => {
    if (taggers.length >= 0) {
      return users.filter(user =>
        taggers.includes(user.id) ? user.username : null,
      );
    }
    return users;
  }, [users, taggers]);

  const validated = useMemo(
    () => title.length > 0 && description.length > 0,
    [title, description],
  );

  const onSubmit = () => {
    if (!validated) return;
    createTag({
      title: title,
      description: description,
      users: taggers,
    });
  };

  return (
    <Modal title="태그 생성하기" width={680} height={431}>
      <Box w={630} dir="row" justify="space-between" padVertical={15}>
        <Box w={300} gap={20}>
          <ModalInner title="태그 제목" required>
            <ModalInner.InputBox onChange={onChangeTitle} value={title} />
          </ModalInner>

          <ModalInner title="태그 설명" required>
            <ModalInner.InputBox
              onChange={onChangeDescription}
              value={description}
            />
          </ModalInner>

          <Box w={300} h={101} dir="column" justify="space-between">
            <ModalInner title="태그 대상 보기" count={taggers.length}>
              <Box
                gap={8}
                dir="row"
                justify="flex-start"
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
            <Link
              to={validated ? ".." : "#"}
              relative="path"
              replace
              style={{ textDecoration: "none" }}
            >
              <Button w={300} h={42} onClick={onSubmit} disabled={!validated}>
                <Text variant="boldtitle3" color="blue600">
                  태그 생성하기
                </Text>
              </Button>
            </Link>
          </Box>
        </Box>
        <Box w={300} h={354} gap={20}>
          <ModalInner title="태그 대상" count={taggers.length}>
            <UserTable
              setSelectedUsers={setTaggers}
              selectedUsers={taggers}
              selected={selectedUsers}
              editable
            ></UserTable>
          </ModalInner>
        </Box>
      </Box>
    </Modal>
  );
};
