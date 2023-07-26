import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  border-top: solid 1px ${props => props.theme.colors.gray200};
`;

export const ChatInput: React.FC = () => {
  return <Container>room for input</Container>;
};
