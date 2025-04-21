import React from "react";
import { Divider } from "@biseo/web/components/atoms";
import {
  text,
  align,
  border,
  column,
  round,
  w,
  h,
  bg,
  gap,
  padding,
  justify,
  row,
  colors,
} from "@biseo/web/styles";
import { LogOut } from "lucide-react";
import { css } from "@emotion/react";

type Props = {
  displayName: string;
  onLogout: () => void;
};

const buttonStyle = css`
  ${w("fill")}
  ${h(32)}
  ${row}
  ${align.center}
  ${justify.start}
  ${padding.horizontal(16)}
  ${gap(8)}

  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    ${bg.gray100}
  }
`;

export const Profile: React.FC<Props> = ({ displayName, onLogout }) => (
  <div
    css={[align.center, { position: "absolute", right: "0px", zIndex: 1000 }]}
  >
    <div css={[h(5)]} />
    <div
      css={[border.gray300, round.md, w(130), column, align.center, bg.white]}
    >
      <div css={[round.md, w(130), h(32), row, justify.center, align.center]}>
        <div css={[text.body, text.gray600, "text-align: center"]}>
          {displayName}
        </div>
      </div>
      <Divider color="gray200" />
      <button type="button" onClick={onLogout} css={buttonStyle}>
        <LogOut size={14} color={colors.gray500} />
        <div css={[text.body, text.gray500]}>로그아웃</div>
      </button>
    </div>
  </div>
);
