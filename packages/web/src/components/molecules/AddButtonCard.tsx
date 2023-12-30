import { PlusIcon } from "@biseo/web/assets";
import { Card } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";
import React from "react";

interface Props {
  content: string;
  onClick?: () => void;
}

export const AddButtonCard: React.FC<Props> = ({
  content,
  onClick = () => {},
}) => (
  <Card align="center" small clickable onClick={onClick}>
    <p css={[text.body, text.gray500]}>
      <PlusIcon /> {content}
    </p>
  </Card>
);
