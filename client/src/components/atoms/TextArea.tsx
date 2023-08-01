import React, { useState } from "react";
import styled from "@emotion/styled";
import { Text } from "@/components/atoms";

export const Container = styled(Text)`
  width: 100%;
  outline: none;
`;

export const TextArea: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  return (
    <Container variant="body" onInput={() => {}} contentEditable>
      {/* TODO: max char limit, emoticon and hyperlink */}
      {message}
    </Container>
  );
};
