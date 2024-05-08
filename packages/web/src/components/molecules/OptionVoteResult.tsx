import React from "react";
import styled from "@emotion/styled";
import type { Color } from "@biseo/web/theme";
import { w, h, row, align, justify, padding, text } from "@biseo/web/styles";

interface Props {
  name: string;
  count: number;
  totalCount: number;
  userChoice?: boolean;
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

export const OptionVoteResult: React.FC<Props> = ({
  name,
  count,
  totalCount,
  userChoice = false,
}) => (
  <div css={[w("fill"), h(30)]}>
    <Background
      percent={(count / totalCount) * 100}
      color={userChoice ? "blue300" : "blue200"}
      borderColor={userChoice ? "blue300" : "gray200"}
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
        <p css={[text.option1, text[userChoice ? "blue500" : "gray500"]]}>
          {name}
        </p>
        <p css={[text.option1, text[userChoice ? "blue500" : "gray500"]]}>
          {count}
        </p>
      </div>
    </Background>
  </div>
);
