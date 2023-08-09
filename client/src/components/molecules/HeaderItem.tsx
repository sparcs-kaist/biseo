import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Text } from "@/components/atoms";

interface Props {
  name: string;
  path: string;
  selected?: boolean;
}

const Container = styled.div<{
  selected?: boolean;
}>(
  ({ selected = false, theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 80px;
    height: 100%;
    align-items: center;
    justify-content: center;
  `,
);

const Link = styled.a`
  text-decoration: none;
`;

const SelectIndicator = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: ${props => props.theme.colors.black};
  border-radius: 1px 1px 0 0;
`;

export const HeaderItem: React.FC<Props> = ({
  name,
  path,
  selected = false,
}) => (
  <Container selected={selected}>
    <Link href={`/${path}`}>
      <Text variant="title3" color={selected ? "black" : "gray500"}>
        {name}
      </Text>
    </Link>
    {selected ? <SelectIndicator /> : <></>}
  </Container>
);
