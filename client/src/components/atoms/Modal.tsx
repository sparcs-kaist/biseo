import React, { PropsWithChildren, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { CloseIcon } from "@/assets";
import { Box, Text } from "@/components/atoms";

interface Props extends PropsWithChildren {
  title: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

const Container = styled.dialog`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 15px;
  width: 680px;
  max-height: 597px;
  padding: 20px 25px;
  overflow-y: hidden;
  border: none;
  border-radius: 10px;
  &::backdrop {
    background-color: ${props => props.theme.colors.grayTrans};
  }
`;

const InnerContainer = styled.div`
  overflow-y: scroll;
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

export const Modal: React.FC<Props> = ({ title, show, setShow, children }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) show ? ref.current.showModal() : ref.current.close();
  }, [show]);

  useEffect(() => {
    const listener = () => setShow(false);
    ref.current?.addEventListener("close", listener);
    return () => ref.current?.removeEventListener("close", listener);
  }, [setShow]);

  return (
    <Container ref={ref}>
      <Box w="fill" dir="row" align="center" justify="space-between">
        <Text variant="title1">{title}</Text>
        <CloseButton onClick={() => setShow(false)}>
          <CloseIcon />
        </CloseButton>
      </Box>
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
};
