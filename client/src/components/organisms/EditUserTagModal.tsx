import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Box, Button, Text } from "@/components/atoms";
import { Modal, ModalInner } from "@/components/molecules";
import { UserTable } from "@/components/organisms";

import { useAdminUser } from "@/services/admin-user";
import { useUserTag } from "@/services/user-tag";

export const EditUserTagModal: React.FC = () => {
  const location = useLocation();
  const modalParams = new URLSearchParams(location.search);
  const tagId = parseInt(modalParams.get("tagId") as string);

  const { users, retrieveUsers } = useAdminUser(state => ({
    users: state.adminUsers,
    retrieveUsers: state.retrieveAll,
  }));
  const { targetTag, deleteTag, updateTag } = useUserTag(state => ({
    targetTag: state.userTags.find(tag => tag.id === tagId),
    deleteTag: state.deleteTag,
    updateTag: state.updateTag,
  }));
  useEffect(() => {
    retrieveUsers();
  }, []);

  const [title, setTitle] = useState(targetTag?.title || "");
  const [description, setDescription] = useState(targetTag?.description || "");
  const [taggers, setTaggers] = useState(targetTag?.users || []);
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

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
    updateTag({
      id: tagId,
      title: title,
      description: description,
      users: taggers,
    });
  };

  return (
    <Modal title="태그 수정하기" width={680} height={431}>
      <Box w={630} dir="row" justify="space-between" padVertical={15}>
        <Box w={300} dir="column" gap={20}>
          <ModalInner title="태그 제목" required>
            <ModalInner.InputBox value={title} onChange={onChangeTitle} />
          </ModalInner>

          <ModalInner title="태그 설명" required>
            <ModalInner.InputBox
              value={description}
              onChange={onChangeDescription}
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
              to={validated ? ".." : `?tagId=${tagId}`}
              relative="path"
              replace
              style={{ textDecoration: "none" }}
            >
              <Button w={145} h={40} onClick={onSubmit} disabled={!validated}>
                <Text variant="boldtitle3" color="blue600">
                  태그 수정하기
                </Text>
              </Button>
            </Link>
            <Link
              to=".."
              relative="path"
              replace
              style={{ textDecoration: "none" }}
            >
              <Button w={145} h={40} onClick={() => deleteTag(tagId)}>
                <Text variant="boldtitle3" color="blue600">
                  태그 삭제하기
                </Text>
              </Button>
            </Link>
          </Box>
        </Box>
        <Box w={300} gap={20}>
          <ModalInner title="태그 대상" count={taggers.length}>
            <UserTable
              setSelectedUsers={setTaggers}
              selectedUsers={taggers}
              editable
            ></UserTable>
          </ModalInner>
        </Box>
      </Box>
    </Modal>
  );
};
