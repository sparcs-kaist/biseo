import React, { useEffect, useRef, type PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { CloseIcon } from "@/assets";
import { Box } from "@/components/atoms";
import { text } from "@/styles";

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

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.grayTrans};
`;

const Container = styled.div<{ w: Size; h: Size }>`
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
  background-color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 10px;
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
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const closeModal = () => navigate("..");

  useEffect(() => {
    // 첫번째 input 요소가 존재한다면 focus를 줍니다.
    modalRef.current?.querySelector("input")?.focus();

    // 모달 외부 요소의 스크롤을 방지합니다.
    document.body.style.overflow = "hidden";

    // 모달이 unmount될 때 body의 스크롤을 다시 허용합니다.
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <BackDrop onClick={closeModal}>
      <Container
        w={width}
        h={height}
        onClick={e => e.stopPropagation()}
        ref={modalRef}
      >
        <Box w="fill" dir="row" align="center" justify="space-between">
          <h1 css={[text.title1]}>{title}</h1>
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
    </BackDrop>
  );
};
