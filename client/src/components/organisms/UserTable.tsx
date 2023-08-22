import React, { useEffect, useState } from "react";
import type { AdminUser } from "biseo-interface/admin/user";
import {
  Box,
  Header,
  Table,
  Cell,
  Row,
  CheckBox,
  UserTag,
} from "@/components/atoms";
import { useAdminUser } from "@/services/admin-user";

interface Props {
  userList?: AdminUser[];
  selected?: number[];
  editable?: boolean;
}

export const UserTable: React.FC<Props> = ({
  userList,
  selected = [],
  editable = false,
}) => {
  const { users, retrieveUsers } = useAdminUser(state => ({
    users: state.adminUsers,
    retrieveUsers: state.retrieveAll,
  }));

  const [displayUsers, setDisplayUsers] = useState(userList);
  useEffect(() => {
    retrieveUsers();
    if (!userList) {
      setDisplayUsers(users);
    }
  }, []);

  const [selectedUsers, setSelectedUsers] = useState(selected);
  const selectUser = (id: number) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(user => user !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  return (
    <Table>
      <Header>
        <Cell w={27} onClick={() => ({})}>
          <CheckBox disabled />
        </Cell>
        <Cell w={80}>이름</Cell>
        <Cell w={120}>닉네임</Cell>
        <Cell>태그</Cell>
      </Header>
      {displayUsers?.map(user => (
        <Row
          selected={selectedUsers.includes(user.id)}
          onClick={() => editable && selectUser(user.id)}
        >
          <Cell w={27} onClick={() => ({})}>
            <CheckBox checked={selectedUsers.includes(user.id)} />
          </Cell>
          <Cell w={80}>{user.username}</Cell>
          <Cell w={120}>{user.displayName}</Cell>
          <Cell>
            <Box dir="row" gap={5}>
              {user.isAdmin ? <UserTag>어드민</UserTag> : <></>}
              {user.tags.map((tag, id) => (
                <UserTag tag={tag.tag} />
              ))}
            </Box>
          </Cell>
        </Row>
      ))}
    </Table>
  );
};
