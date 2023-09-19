import React from "react";

import type { AgendaStatus } from "@biseo/interface/agenda";

import { Card } from "@/components/atoms";

import { css } from "@emotion/react";
import { text, center } from "@/styles";
import { agendaStatusNames } from "@/constants/phrases";

const dashedBorder = css`
  border-style: dashed;
`;
const noBackground = css`
  background: none;
`;

interface Props {
  agendaStatus: AgendaStatus;
}

export const EmptyAgendaCard: React.FC<Props> = ({ agendaStatus }) => (
  <Card css={[center, dashedBorder, noBackground]}>
    <p css={[text.subtitle, text.gray500]}>
      {agendaStatusNames[agendaStatus]}가 없습니다.
    </p>
  </Card>
);
