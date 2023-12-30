import { Box, Tag } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";
import React, { useMemo, useState } from "react";

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
    <Box
      w="fill"
      justify="space-between"
      dir="row"
      align="center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p css={[text.subtitle, text.black]}>투표 참여</p>
      <Tag type="participant" suffix={participantInfo} />
    </Box>
  );
};
