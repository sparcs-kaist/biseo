import { Box, Tag } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";
import React from "react";

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
}) => (
  <Box w="fill" justify="space-between" dir="row" align="center">
    <Box gap={5} dir="row" align="center">
      <p css={[text.subtitle, text.black]}>투표 결과</p>
      {voted ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <p
          css={[text.option2, text.gray500]}
          onClick={e => {
            clickHandler(revealChoice);
            e.stopPropagation();
          }}
        >
          {!revealChoice ? "내 투표 보기" : "내 투표 가리기"}
        </p>
      ) : null}
    </Box>
    <Tag type={type ? "public" : "private"} />
  </Box>
);
