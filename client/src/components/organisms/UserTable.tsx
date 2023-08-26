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
} from "@/components/atoms";

import { useAdminUser } from "@/services/admin-user";
import { useUserTag } from "@/services/user-tag";

interface Props {
  userList?: number[];
  selectedUsers?: number[];
  setSelectedUsers?: (userIds: number[]) => void;
  editable?: boolean;
  filterBy?: "tag" | "voted";
}

export const UserTable: React.FC<Props> = ({
  userList,
  selectedUsers = [],
  setSelectedUsers = () => {},
  editable,
  filterBy,
}) => {
  const { users, retrieveUsers } = useAdminUser(state => ({
    users: state.adminUsers,
    retrieveUsers: state.retrieveAll,
  }));
  const { tags, retrieveTags } = useUserTag(state => ({
    tags: state.userTags,
    retrieveTags: state.retrieveAll,
  }));
  useEffect(() => {
    retrieveUsers();
    retrieveTags();
  }, []);

  const displayUsers = useMemo(
    () => (userList ? users.filter(user => userList.includes(user.id)) : users),
    [userList, users],
  );
  const [selectedTag, setSelectedTag] = useState("");

  const selectUser = (id: number) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(user => user !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const filteredUsers = useMemo(() => {
    if (selectedTag) {
      return displayUsers.filter(user =>
        user.tags.some(tag => tag === selectedTag),
      );
    }
    return displayUsers;
  }, [displayUsers, selectedTag]);

  return (
    <Box w="fill" gap={5}>
      {filterBy ? (
        <Box w="fill" dir="row" justify="flex-start">
          <SelectBox
            width={92}
            height={26}
            options={
              filterBy === "tag"
                ? tags.map(tag => tag.title)
                : filterBy === "voted"
                ? ["투표 완료자", "투표 미완료자"]
                : []
            }
            onChange={setSelectedTag}
          />
        </Box>
      ) : (
        <></>
      )}
      <Table w="fill" h={287}>
        <Header>
          <Row>
            {editable ? (
              <Cell w={27}>
                <CheckBox disabled />
              </Cell>
            ) : (
              <Cell w={0} />
            )}
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
              {editable ? (
                <Cell w={27}>
                  <CheckBox
                    checked={selectedUsers.includes(user.id)}
                    readOnly
                  />
                </Cell>
              ) : (
                <Cell w={0} />
              )}
              <Cell w={60}>{user.username}</Cell>
              <Cell w={100}>{user.displayName}</Cell>
              <Cell>
                {/* {user.isAdmin ? <UserTag>어드민</UserTag> : <></>} */}
                {user.tags.map(tag => (
                  <UserTag key={tag} tag={tag} />
                ))}
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Box>
  );
};
