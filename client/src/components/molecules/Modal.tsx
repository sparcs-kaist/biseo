import React, { type PropsWithChildren, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { CloseIcon } from "@/assets";
import { Box, Text } from "@/components/atoms";

type Size = number | "hug" | "fill";
const calcSize = (size: Size) => {
  if (size === "fill") return "100%";
  if (size === "hug") return "fit-content";
  return `${size}px`;
};

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
  width: ${props => calcSize(props.w)};
  height: ${props => calcSize(props.h)};
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
  children = null,
  width = "hug",
  height = "hug",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    dialogRef.current?.showModal();
    // 첫번째 input 요소에 focus를 줍니다. input 요소가 존재하지 않다면 CloseButton이 focus를 가집니다.
    dialogRef.current?.querySelector("input")?.focus();
  }, []);

  // backdrop 영역 클릭 시 모달을 닫습니다.
  const onDialogClick: React.MouseEventHandler<HTMLDialogElement> = e => {
    const { top, left, right, bottom } =
      e.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = e;
    const isInDialog =
      clientX > left && clientX < right && clientY > top && clientY < bottom;
    if (!isInDialog) navigate("..");
  };

  // Esc 키 입력 시 모달을 닫습니다.
  const onDialogCancel = () => navigate("..");

  return (
    <Container
      w={width}
      h={height}
      ref={dialogRef}
      onClick={onDialogClick}
      onCancel={onDialogCancel}
    >
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
