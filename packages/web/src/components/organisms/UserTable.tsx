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
  Scroll,
} from "@biseo/web/components/atoms";

import { useAdminUser } from "@biseo/web/services/admin-user";
import { useUserTag } from "@biseo/web/services/user-tag";

interface Props {
  userList?: number[];
  selectedUsers?: number[];
  setSelectedUsers?: (userIds: number[]) => void;
  editable?: boolean;
  filterBy?: "tag" | "voted";
}

export const UserTable: React.FC<Props> = ({
  userList = [],
  selectedUsers = [],
  setSelectedUsers = () => {},
  editable = false,
  filterBy = undefined,
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
    () =>
      (userList.length > 0
        ? users.filter(user => userList.includes(user.id))
        : users
      ).sort((a, b) => (a.username < b.username ? -1 : 1)),
    [userList, users],
  );
  const [selectedFilterOption, setSelectedFilterOption] = useState("");

  const selectUser = (id: number) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(user => user !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const filteredUsers = useMemo(() => {
    if (filterBy === "tag" && selectedFilterOption) {
      return displayUsers.filter(user =>
        user.tags.some(tag => tag === selectedFilterOption),
      );
    }
    if (filterBy === "voted") {
      if (selectedFilterOption === "투표 완료자")
        return displayUsers.filter(user => selectedUsers.includes(user.id));
      if (selectedFilterOption === "투표 미완료자")
        return displayUsers.filter(user => !selectedUsers.includes(user.id));
    }
    return displayUsers;
  }, [displayUsers, selectedFilterOption]);

  const allSelected = useMemo(
    () =>
      filteredUsers.filter(user => selectedUsers.includes(user.id)).length ===
      filteredUsers.length,
    [filteredUsers, selectedUsers],
  );
  const toggleHeaderCheckbox = () => {
    if (allSelected) {
      setSelectedFilterOption("");
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  return (
    <Box w="fill" gap={5}>
      {filterBy ? (
        <Box w="fill" dir="row" justify="flex-start">
          <SelectBox
            width={92}
            height={26}
            options={(() => {
              switch (filterBy) {
                case "tag":
                  return ["전체보기", ...tags.map(tag => tag.title)];
                case "voted":
                  return ["전체보기", "투표 완료자", "투표 미완료자"];
                default:
                  return ["전체보기"];
              }
            })()}
            onChange={setSelectedFilterOption}
          />
        </Box>
      ) : null}
      <Table w="fill" h={287}>
        <Header>
          <Row>
            {editable ? (
              <Cell w={27}>
                <CheckBox
                  checked={allSelected}
                  onChange={toggleHeaderCheckbox}
                />
              </Cell>
            ) : (
              <Cell w={0} />
            )}
            <Cell w={60}>이름</Cell>
            <Cell w={100}>닉네임</Cell>
            <Cell scroll>태그</Cell>
          </Row>
        </Header>
        <Scroll>
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
                <Cell w={60}>{user.displayName}</Cell>
                <Cell w={100}>{user.username}</Cell>
                <Cell>
                  {/* {user.isAdmin ? <UserTag>어드민</UserTag> : <></>} */}
                  {user.tags.map(tag => (
                    <UserTag key={tag} tag={tag} />
                  ))}
                </Cell>
              </Row>
            ))}
          </Body>
        </Scroll>
      </Table>
    </Box>
  );
};
