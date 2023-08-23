import React from "react";
import { Card, Text } from "@/components/atoms";
import { PlusIcon } from "@/assets";

interface Props {
  content: string;
  onClick?: () => void;
}

export const AddButton: React.FC<Props> = ({ content, onClick }) => (
  <Card align="center" small clickable onClick={onClick}>
    <Text color="gray500" variant="body">
      <PlusIcon></PlusIcon> {content}
    </Text>
  </Card>
);