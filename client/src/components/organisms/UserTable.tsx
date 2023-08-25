import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Body,
  Header,
  Table,
  Cell,
  Row,
  CheckBox,
  UserTag,
  SelectBox,
  BorderedBox,
} from "@/components/atoms";
import { useAdminUser } from "@/services/admin-user";
import { useUserTag } from "@/services/user-tag";

interface Props {
  selectedUsers: number[];
  setSelectedUsers?: (userIds: number[]) => void;
  selected?: number[];
  editable?: boolean;
}

export const UserTable: React.FC<Props> = ({
  selectedUsers,
  setSelectedUsers = () => {},
  selected = [],
  editable,
}) => {
  const { users, retrieveUsers } = useAdminUser(state => ({
    users: state.adminUsers,
    retrieveUsers: state.retrieveAll,
  }));
  const { tags, retrieveTags } = useUserTag(state => ({
    tags: state.userTags,
    retrieveTags: state.retrieveAll,
  }));
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    retrieveUsers();
    retrieveTags();
  }, []);

  useEffect(() => {
    setSelectedUsers(selected);
  }, [selected]);

  const selectUser = (id: number) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(user => user !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const filteredUsers = useMemo(() => {
    if (selectedTag) {
      return users.filter(user => user.tags.some(tag => tag === selectedTag));
    }
    return users;
  }, [users, selectedTag]);

  return (
    <Box w="fill" gap={5}>
      <Box w="fill" dir="row" justify="start">
        <SelectBox
          width={92}
          height={26}
          options={tags.map(tag => ({ id: tag.id, name: tag.title }))}
          onChange={setSelectedTag}
        />
      </Box>
      <Table w="fill" h={287}>
        <Header>
          <Row>
            <Cell w={27}>
              <CheckBox disabled />
            </Cell>
            <Cell w={60}>이름</Cell>
            <Cell w={100}>닉네임</Cell>
            <Cell scroll>태그</Cell>
          </Row>
        </Header>
        <Body>
          {filteredUsers.map(user => (
            <Row
              key={user.id}
              selected={selectedUsers.includes(user.id)}
              onClick={() => {
                if (editable) {
                  selectUser(user.id);
                }
              }}
            >
              <Cell w={27}>
                <CheckBox checked={selectedUsers.includes(user.id)} readOnly />
              </Cell>
              <Cell w={60}>{user.username}</Cell>
              <Cell w={100}>{user.displayName}</Cell>
              <Cell>
                {/* {user.isAdmin ? <UserTag>어드민</UserTag> : <></>} */}
                {user.tags.map(tag => (
                  <UserTag
                    key={tags.filter(userTag => tag === userTag.title)[0].id}
                    tag={tag}
                  />
                ))}
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Box>
  );
};
