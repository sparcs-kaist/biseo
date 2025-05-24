/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import { Megaphone, ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  onToggle?: () => void;
  isNotice?: boolean;
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

// eslint-disable-next-line react/require-default-props
export const ChatHeader: React.FC<Props> = ({
  title,
  onToggle,
  isNotice = false,
}) => (
  <div css={containerStyle}>
    <Text variant="title2">{title}</Text>
    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
    <div css={iconStyle} onClick={onToggle}>
      {isNotice ? (
        <ArrowLeft size={20} color={colors.gray600} />
      ) : (
        <Megaphone size={20} color={colors.gray600} />
      )}
    </div>
  </div>
);
