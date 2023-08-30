import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { CloseIcon } from "@/assets";
import { Box, Text } from "@/components/atoms";

interface Props extends PropsWithChildren {
  title: string;
  width?: Size;
  height?: Size;
}

const Container = styled.dialog<{ w: Size; h: Size }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 15px;
  width: ${props => size(props.w)};
  height: ${props => size(props.h)};
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: none;
  border-radius: 10px;
  &::backdrop {
    background-color: ${props => props.theme.colors.grayTrans};
  }
`;

const InnerContainer = styled.div`
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: relative;
  display: flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.gray100};
  cursor: pointer;
`;

export const Modal: React.FC<Props> = ({
  title,
  children,
  width = "hug",
  height = "hug",
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.close();
      ref.current.showModal();
    }
  }, []);

  return (
    <Container w={width} h={height} ref={ref}>
      <Box w="fill" dir="row" align="center" justify="space-between">
        <Text variant="title1">{title}</Text>
        <Link
          to=".."
          relative="path"
          replace
          style={{ textDecoration: "none" }}
        >
          <CloseButton>
            <CloseIcon />
          </CloseButton>
        </Link>
      </Box>
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
};

type Size = number | "hug" | "fill";
const size = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};
