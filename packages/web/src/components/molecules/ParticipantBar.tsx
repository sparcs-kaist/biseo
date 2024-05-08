import React from "react";
import styled from "@emotion/styled";
import type { Color } from "@biseo/web/theme";
import {
  w,
  h,
  row,
  column,
  gap,
  align,
  justify,
  center,
  bg,
  round,
  padding,
  text,
} from "@biseo/web/styles";

interface Props {
  total?: number;
  participant?: number;
}

const Background = styled.div<{
  percent: number;
  color: Color;
  borderColor: Color;
}>`
  width: 100%;
  height: 100%;

  border: 1px solid ${props => props.theme.colors[props.borderColor]};
  border-radius: 5px;

  background: linear-gradient(
    to right,
    ${props => props.theme.colors[props.color]} ${props => props.percent}%,
    #ffffff ${props => props.percent}%
  );
`;

export const ParticipantBar: React.FC<Props> = ({
  total = 0,
  participant = 0,
}) => (
  <div css={[w(300), h(59), gap(8), column]}>
    <div css={[w(75), h(20), gap(8), row, align.center]}>
      <p css={[text.body, text.black]}>투표 참여</p>
      <div css={[bg.blue200, round.md, center, w(20), h(20)]}>
        <h4 css={[text.boldtitle4, text.blue600]}>{participant}</h4>
      </div>
    </div>
    <div css={[w(300), h(30)]}>
      <Background
        percent={total ? (participant / total) * 100 : 0}
        color="blue300"
        borderColor="gray200"
      >
        <div
          css={[
            w("fill"),
            h("fill"),
            row,
            align.center,
            justify.between,
            padding.horizontal(13),
            padding.vertical(6),
          ]}
        >
          <p css={[text.option1, text.black]}>
            {total ? ((participant * 100) / total).toFixed(1) : 0}%
          </p>
          <p css={[text.option1, text.black]}>
            {participant}/{total}
          </p>
        </div>
      </Background>
    </div>
  </div>
);
