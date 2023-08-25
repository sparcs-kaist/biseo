import React, { useEffect, useMemo, useState } from "react";
import { Modal, ModalInner } from "@/components/molecules";
import { Button, Box, Text } from "@/components/atoms";
import { UserTable } from "@/components/organisms";
import { Link, useLocation } from "react-router-dom";
import { useUserTag } from "@/services/user-tag";
import { useAdminUser } from "@/services/admin-user";

export const EditUserTagModal: React.FC = () => {
  const location = useLocation();
  const modalParams = new URLSearchParams(location.search);
  const tagId = parseInt(modalParams.get("tagId") as string);

  const { targetTag } = useUserTag(state => ({
    targetTag: state.userTags.find(tag => tag.id === tagId),
  }));

  const { users, retrieveUsers } = useAdminUser(state => ({
    users: state.adminUsers,
    retrieveUsers: state.retrieveAll,
  }));
  useEffect(() => {
    retrieveUsers();
  }, []);

  const tagTitleOrigin = targetTag != undefined ? targetTag.title : "";
  const tagDescriptionOrigin = targetTag != undefined ? targetTag.description : "";
  const taggedUserIds = targetTag?.users || [];

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [taggers, setTaggers] = useState<number[]>([]);
  const [tagTitle, setTagTitle] = useState(tagTitleOrigin);
  const [tagDescription, setTagDescription] =
    useState(tagDescriptionOrigin);

  const onChangeTagTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagTitle(e.target.value);
  };
  const onChangeTagDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagDescription(e.target.value);
  };

  const { deleteTag, updateTag } = useUserTag(state => ({
    deleteTag: state.deleteTag,
    updateTag: state.updateTag,
  }));

  const onTagUpdate = () => {
    updateTag({
      id: tagId,
      title: tagTitle,
      description: tagDescription,
      users: taggers,
    });
  };

  const onTagDelete = () => {
    deleteTag(tagId);
  };

  const filteredUsers = useMemo(() => {
    if (taggers.length >= 0) {
      return users.filter(user =>
        taggers.includes(user.id) ? user.username : null,
      );
    }
    return users;
  }, [users, taggers]);

  return (
    <Modal title="태그 수정하기" width={680} height={431}>
      <Box w={630} dir="row" justify="space-between" padVertical={15}>
        <Box w={300} dir="column" gap={20}>
          <ModalInner title="태그 제목" required>
            <ModalInner.InputBox onClick={onChangeTagTitle}>
              {tagTitle}
            </ModalInner.InputBox>
          </ModalInner>

          <ModalInner title="태그 설명" required>
            <ModalInner.InputBox onClick={onChangeTagDescription}>
              {tagDescription}
            </ModalInner.InputBox>
          </ModalInner>

          <Box w={300} h={101} dir="column" justify="space-between">
            <ModalInner title="태그 대상 보기" count={taggers.length}>
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
              <Button w={145} h={40} onClick={onTagUpdate}>
                <Text variant="boldtitle3" color="blue600">
                  태그 수정하기
                </Text>
              </Button>
            </Link>
            <Link to=".." relative="path" replace>
              <Button w={145} h={40} onClick={onTagDelete}>
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
              selected={taggedUserIds ? taggedUserIds : selectedUsers}
              editable
            ></UserTable>
          </ModalInner>
        </Box>
      </Box>
    </Modal>
  );
};
