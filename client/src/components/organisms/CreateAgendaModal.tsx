import React from "react";
import { Cell, Header, Row, Table } from "@/components/atoms";
import { Modal } from "@/components/molecules";

export const CreateAgendaModal: React.FC = () => (
  <Modal title="투표 생성하기">
    <Table>
      <Header>
        <Cell w={27}>ㅁ</Cell>
        <Cell w={55}>이름</Cell>
        <Cell w={80}>닉네임</Cell>
        <Cell>태그</Cell>
      </Header>
      <Row selected={true}>
        <Cell w={27}>ㅁ</Cell>
        <Cell w={55}>이지윤</Cell>
        <Cell w={80}>dora</Cell>
        <Cell>바보</Cell>
      </Row>
      <Row>
        <Cell w={27}>ㅁ</Cell>
        <Cell w={55}>이지윤</Cell>
        <Cell w={80}>dora</Cell>
        <Cell>감자</Cell>
      </Row>
    </Table>
  </Modal>
);
