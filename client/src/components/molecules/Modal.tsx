import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { CloseIcon } from "@/assets";
import { Box, Text } from "@/components/atoms";

interface Props extends PropsWithChildren {
  title: string;
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

export const Modal: React.FC<Props> = ({ title, children }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.showModal();
  }, []);

  return (
    <Container ref={ref}>
      <Box w="fill" dir="row" align="center" justify="space-between">
        <Text variant="title1">{title}</Text>
        <Link to=".." relative="path" replace>
          <CloseButton>
            <CloseIcon />
          </CloseButton>
        </Link>
      </Box>
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
};
