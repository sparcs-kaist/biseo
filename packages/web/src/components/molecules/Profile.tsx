import React from "react";
import { Button, Divider } from "@biseo/web/components/atoms";
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
} from "@biseo/web/styles";

type Props = {
  displayName: string;
  onLogout: () => void;
};

export const Profile: React.FC<Props> = ({ displayName, onLogout }) => (
  <div
    css={[
      border.gray200,
      round.md,
      w(100),
      column,
      align.center,
      gap(4),
      padding.vertical(5),
      bg.white,
      "box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.06)",
      {
        position: "absolute",
        top: "80%",
        left: "96.2%",
        transform: "translateX(-100%)",
        zIndex: 1000,
      },
    ]}
  >
    <div
      css={[
        round.md,
        w(100),
        h(18),
        padding.horizontal(8),
        justify.between,
        align.center,
      ]}
    >
      <div css={[text.option2, text.gray600, "text-align: center"]}>
        {displayName}
      </div>
    </div>
    <Divider />
    <Button w={90} h={20} padHorizontal={8} onClick={onLogout}>
      <div css={[text.option2, text.blue600]}>로그아웃</div>
    </Button>
  </div>
);
