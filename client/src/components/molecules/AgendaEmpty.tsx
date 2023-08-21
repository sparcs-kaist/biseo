import React, { useState } from "react";
import {
  Box,
  Text,
  Card,
  Divider,
  Button,
  BorderedBox,
} from "@/components/atoms";
import { AgendaTag } from "@/components/molecules";

import { AdminAgenda } from "biseo-interface/admin/agenda";

const mention = {
  ongoing: "진행중인",
  terminated: "종료된",
  preparing: "예정된",
};

interface Props {
  agendaType: "ongoing" | "termingated" | "preparing";
}

const findMention = (agendaType: string) => {
  if (agendaType == "ongoing") return mention.ongoing;
  if (agendaType == "terminated") return mention.terminated;
  else return mention.preparing;
};

export const AdminPreparingAgendaCard: React.FC<Props> = ({ agendaType }) => {
  return (
    <BorderedBox
      w={300}
      h={52}
      borderColor="gray300"
      borderStyle="dashed"
      borderSize={1}
    >
      <Text variant="subtitle" color="gray500">
        {findMention(agendaType)} 투표가 없습니다.
      </Text>
    </BorderedBox>
  );
};
