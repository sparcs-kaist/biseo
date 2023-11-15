import { Box, Button } from "@biseo/web/components/atoms";
import { Modal, ModalInner } from "@biseo/web/components/molecules";
import { useAdminUser } from "@biseo/web/services/admin-user";
import { useUserTag } from "@biseo/web/services/user-tag";
import { text } from "@biseo/web/styles";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { UserTable } from "./UserTable";

export const CreateUserTagModal: React.FC = () => {
  const { users } = useAdminUser(state => ({
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
      title,
      description,
      users: taggers,
    });
  };

  return (
    <Modal title="태그 생성하기" width={680} height={431}>
      <Box w={630} dir="row" justify="space-between">
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
              <ModalInner.TaggerBox>
                {filteredUsers.map(user => (
                  <ModalInner.TagChoice key={user.id}>
                    {user.username}
                  </ModalInner.TagChoice>
                ))}
              </ModalInner.TaggerBox>
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
                <p css={[text.boldtitle3, text.blue600]}>태그 생성하기</p>
              </Button>
            </Link>
          </Box>
        </Box>
        <Box w={300} h={354} gap={20}>
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
