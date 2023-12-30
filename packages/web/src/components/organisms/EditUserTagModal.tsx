import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Box, Button } from "@biseo/web/components/atoms";
import { Modal, ModalInner } from "@biseo/web/components/molecules";
import { useAdminUser } from "@biseo/web/services/admin-user";
import { useUserTag } from "@biseo/web/services/user-tag";
import { text } from "@biseo/web/styles";
import { UserTable } from "./UserTable";

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
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      title,
      description,
      users: taggers,
    });
  };

  return (
    <Modal title="태그 수정하기" width={680} height={431}>
      <Box w={630} dir="row" justify="space-between">
        <Box w={300} dir="column" gap={20}>
          <ModalInner title="태그 제목" required>
            <ModalInner.InputBox value={title} onChange={onChangeTitle} />
          </ModalInner>

          <ModalInner title="태그 설명" required>
            <ModalInner.TextAreaInputBox
              value={description}
              onChange={onChangeDescription}
            />
          </ModalInner>

          <Box w={300} h={101} dir="column" justify="space-between">
            <ModalInner title="태그 대상 보기" count={taggers.length}>
              <ModalInner.TaggerBox>
                {filteredUsers
                  .sort((a, b) => (a.username < b.username ? -1 : 1))
                  .map(user => (
                    <ModalInner.TagChoice key={user.id}>
                      {user.username}
                    </ModalInner.TagChoice>
                  ))}
              </ModalInner.TaggerBox>
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
                <p css={[text.boldtitle3, text.blue600]}>태그 수정하기</p>
              </Button>
            </Link>
            <Link
              to=".."
              relative="path"
              replace
              style={{ textDecoration: "none" }}
            >
              <Button w={145} h={40} onClick={() => deleteTag(tagId)}>
                <p css={[text.boldtitle3, text.blue600]}>태그 삭제하기</p>
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
              filterBy="tag"
            />
          </ModalInner>
        </Box>
      </Box>
    </Modal>
  );
};
