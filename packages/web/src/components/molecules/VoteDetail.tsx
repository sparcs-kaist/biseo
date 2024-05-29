import React from "react";
import { Tag } from "@biseo/web/components/atoms";
import { align, justify, row, w, text } from "@biseo/web/styles";

interface Props {
  type: boolean;
}

export const VoteDetail: React.FC<Props> = ({ type }) => (
  <>
    {type ? (
      <>TODO</>
    ) : (
      <div css={[w("fill"), justify.between, row, align.center]}>
        <h4 css={[text.subtitle, text.black]}>투표 상세</h4>
        <Tag type="anonymous" />
      </div>
    )}
  </>
);
