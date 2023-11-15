import { Box, Tag } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";
import React from "react";

interface Props {
  type: boolean;
}

export const VoteDetail: React.FC<Props> = ({ type }) => (
  <>
    {type ? (
      <>TODO</>
    ) : (
      <Box w="fill" justify="space-between" dir="row" align="center">
        <p css={[text.subtitle, text.black]}>투표 상세</p>
        <Tag type="anonymous" />
      </Box>
    )}
  </>
);
