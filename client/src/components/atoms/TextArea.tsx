import React, { useState } from "react";
import styled from "@emotion/styled";
import { Text } from "@/components/atoms";

export const Container = styled.p`
  width: 100%;
  outline: none;
`;

export const TextArea: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  return (
    <Container onInput={() => {}} contentEditable>
      {/* TODO: issue with text size */}
      <Text variant="body">{message}</Text>
    </Container>
  );
};
