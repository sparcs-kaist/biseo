import React from "react";
import { Card, Text } from "@biseo/web/components/atoms";
import { PlusIcon } from "@biseo/web/assets";

interface Props {
  content: string;
  onClick?: () => void;
}

export const AddButtonCard: React.FC<Props> = ({
  content,
  onClick = () => {},
}) => (
  <Card align="center" small clickable onClick={onClick}>
    <Text color="gray500" variant="body">
      <PlusIcon /> {content}
    </Text>
  </Card>
);
