import React from "react";
import { Text } from "@biseo/web/components/atoms";
import { css } from "@emotion/react";
import {
  align,
  bg,
  colors,
  h,
  justify,
  padding,
  row,
  w,
} from "@biseo/web/styles";
import { Megaphone } from "lucide-react";

interface Props {
  title: string;
}

const containerStyle = css`
  ${row}
  ${w("fill")}
  ${bg.gray100}
  ${padding.horizontal(20)}
  ${align.center}
  ${justify.between}
  position: relative;
  min-height: 42px;
`;

const iconStyle = css`
  ${row}
  ${align.center}
  ${justify.center}

  ${w(24)}
  ${h(24)}

  border-radius: 4px;
  cursor: pointer;

  &:hover {
    ${bg.gray200}
  }
`;

export const ChatHeader: React.FC<Props> = ({ title }) => (
  <div css={containerStyle}>
    <Text variant="title2">{title}</Text>
    <div css={iconStyle}>
      <Megaphone size={20} color={colors.gray400} />
    </div>
  </div>
);
