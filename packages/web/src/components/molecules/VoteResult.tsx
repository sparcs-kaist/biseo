import React from "react";
import { Tag } from "@biseo/web/components/atoms";
import { align, row, gap, text, justify, w } from "@biseo/web/styles";
import { css } from "@emotion/react";

interface Props {
  type?: boolean;
  clickHandler: (prev: boolean) => void;
  revealChoice: boolean;
  voted: boolean;
}

export const VoteResult: React.FC<Props> = ({
  type = false,
  clickHandler,
  revealChoice,
  voted,
}) => {
  const textButton = css`
    border: none;
    background-color: inherit;
    cursor: pointer;
  `;

  return (
    <div css={[w("fill"), justify.between, row, align.center]}>
      <div css={[gap(5), row, align.center]}>
        <h4 css={[text.subtitle, text.black]}>투표 결과</h4>
        {voted ? (
          <button
            type="button"
            css={[text.option2, text.gray400, textButton]}
            onClick={e => {
              clickHandler(revealChoice);
              e.stopPropagation();
            }}
          >
            {!revealChoice ? "내 투표 보기" : "내 투표 가리기"}
          </button>
        ) : null}
      </div>
      <Tag type={type ? "public" : "private"} />
    </div>
  );
};
