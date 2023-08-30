import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";

interface Props extends PropsWithChildren {
  tag?: string;
}

const Container = styled.div`
  display: flex;
  height: 18px;
  padding: 3px 6px;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  font-weight: 500;
  color: ${props => props.theme.colors.gray500};
  background-color: ${props => props.theme.colors.white};
  border: solid 1px ${props => props.theme.colors.gray200};
  border-radius: 5px;
`;

export const UserTag: React.FC<Props> = ({ tag, children }) => (
  <Container>{tag ? tag : children}</Container>
);
