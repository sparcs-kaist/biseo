import React, { PropsWithChildren } from "react";
import type { UserTag as UserTagType } from "biseo-interface/admin/user";
import styled from "@emotion/styled";

interface Props extends PropsWithChildren {
  tag?: UserTagType;
}

const Container = styled.div`
  font-size: 9px;
  font-weight: 500;
  color: ${props => props.theme.colors.gray500};
  background-color: ${props => props.theme.colors.white};
  border: solid 1px ${props => props.theme.colors.gray200};
  border-radius: 5px;
  padding: 3px 6px;
`;

const convertToTagName = (tag: UserTagType) =>
  tag.type === "regular" ? "정회원" : tag.type === "associate" ? "준회원" : "";

export const UserTag: React.FC<Props> = ({ tag, children }) => (
  <Container>{tag ? convertToTagName(tag) : children}</Container>
);
