import { bg, center, h, padding, round, text, w } from "@biseo/web/styles";
import { css } from "@emotion/react";

export interface Props {
  label: string;
  position: "top" | "bottom";
}

const BubbleStyle = css`
  ${w("hug")}
  ${h(24)}

  ${center}
  ${padding.horizontal(10)}
  ${bg.black}
  ${round.md}

  ${text.option2}
  ${text.white}

  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);

  white-space: nowrap;
`;

export const Bubble: React.FC<Props> = ({ label, position }: Props) => (
  <div css={[BubbleStyle, position === "top" ? "bottom: 26px" : "top :26px"]}>
    {label}
  </div>
);
