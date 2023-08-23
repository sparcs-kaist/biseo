import React from "react";
import { Text, Card } from "@/components/atoms";
import { AgendaStatus } from "biseo-interface/agenda";

const mention = {
  ongoing: "진행중인",
  terminated: "종료된",
  preparing: "예정된",
};

interface Props {
  agendaStatus: AgendaStatus;
}

const findMention = (agendaStatus: AgendaStatus) => {
  if (agendaStatus === "ongoing") return mention.ongoing;
  if (agendaStatus === "preparing") return mention.preparing;
  if (agendaStatus === "terminated") return mention.terminated;
  return "";
};

export const EmptyAgendaCard: React.FC<Props> = ({ agendaStatus }) => {
  return (
    <Card borderStyle="dashed" align="center">
      <Text variant="subtitle" color="gray500">
        {findMention(agendaStatus)} 투표가 없습니다.
      </Text>
    </Card>
  );
};
