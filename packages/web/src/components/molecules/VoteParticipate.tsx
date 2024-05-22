import React, { useMemo, useState } from "react";
import { Tag } from "@biseo/web/components/atoms";
import { align, justify, row, w, text } from "@biseo/web/styles";

interface Props {
  voted: number;
  total: number;
}

export const VoteParticipate: React.FC<Props> = ({ voted, total }) => {
  const [hover, setHover] = useState(false);
  const participantInfo = useMemo(
    () =>
      hover
        ? `투표 참여자 ${voted}명 / 투표 대상자 ${total}명`
        : `${voted}/${total}`,
    [hover],
  );

  return (
    <div
      css={[w("fill"), justify.between, row, align.center]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h4 css={[text.subtitle, text.black]}>투표 참여</h4>
      <Tag type="participant" suffix={participantInfo} />
    </div>
  );
};
