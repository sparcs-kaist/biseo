import React from "react";

import type { AgendaStatus } from "@biseo/interface/agenda";

import { Card } from "@/components/atoms";

import { css } from "@emotion/react";
import { text, center } from "@/styles";

const dashedBorder = css`
  border-style: dashed;
`;
const noBackground = css`
  background: none;
`;

const mention: Record<AgendaStatus, string> = {
  ongoing: "진행중인",
  terminated: "종료된",
  preparing: "예정된",
};

interface Props {
  agendaStatus: AgendaStatus;
}

export const EmptyAgendaCard: React.FC<Props> = ({ agendaStatus }) => (
  <Card css={[center, dashedBorder, noBackground]}>
    <p css={[text.subtitle, text.gray500]}>
      {mention[agendaStatus]} 투표가 없습니다.
    </p>
  </Card>
);
