import React from "react";
import styled from "@emotion/styled";
import { AgendaStatus } from "@biseo/interface/agenda";
import { Text, Card } from "@/components/atoms";

const DashedCard = styled(Card)`
  border-style: dashed;
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
  <DashedCard align="center">
    <Text variant="subtitle" color="gray500">
      {mention[agendaStatus]} 투표가 없습니다.
    </Text>
  </DashedCard>
);
