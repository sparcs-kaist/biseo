import styled from "@emotion/styled";
import React, { type PropsWithChildren } from "react";

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
  color: ${props => props.colors.gray500};
  background-color: ${props => props.colors.white};
  border: solid 1px ${props => props.colors.gray200};
  border-radius: 5px;
`;

export const UserTag: React.FC<Props> = ({
  tag = undefined,
  children = null,
}) => <Container>{tag || children}</Container>;
