import { colors } from "@biseo/web/styles";
import styled from "@emotion/styled";
import React, { type PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  tag?: string;
}

const Container = styled.div`
  display: flex;
  height: 18px;
  justify-content: center;
  align-items: center;

  font-weight: 500;

  padding: 3px 6px;
  font-size: 9px;
  color: ${colors.gray500};
  background-color: ${colors.white};
  border: solid 1px ${colors.gray200};
  border-radius: 5px;
`;

export const UserTag: React.FC<Props> = ({
  tag = undefined,
  children = null,
}) => <Container>{tag || children}</Container>;
