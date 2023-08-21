import React, { useEffect } from "react";
import { Header, Table, Cell, Row } from "@/components/atoms";
import { useAdminUser } from "@/services/admin-user";

export const UserTable: React.FC = () => {
  const { users, retrieveUsers } = useAdminUser(state => ({
    users: state.adminUsers,
    retrieveUsers: state.retrieveAll,
  }));

  useEffect(() => {
    retrieveUsers();
  }, []);

  return (
    <Table>
      <Header>
        <Cell w={27} onClick={() => ({})}>
          ㅁ
        </Cell>
        <Cell w={55}>이름</Cell>
        <Cell w={80}>닉네임</Cell>
        <Cell>태그</Cell>
      </Header>
      {users?.map(user => (
        <Row>
          <Cell w={27} onClick={() => ({})}>
            ㅁ
          </Cell>
          <Cell w={55}>{user.username}</Cell>
          <Cell w={80}>{user.displayName}</Cell>
          <Cell>태그</Cell>
        </Row>
      ))}
    </Table>
  );
};
