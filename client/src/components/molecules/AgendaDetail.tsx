import React from "react";
import { Box, Text } from "@/components/atoms";

interface Agenda {
  title: string;
  subtitle: string;
  content: string;
}

interface Props {
  agenda: Agenda;
}

export const AgendaDetail: React.FC<Props> = ({ agenda }) => {
  return (
    <>
      <Box w={260}>
        <Text variant="title2" color="black">
          {agenda.title}
        </Text>
        <Text variant="subtitle" color="gray500">
          {agenda.subtitle}
        </Text>
      </Box>
      <Box>
        <Text variant="subtitle" color="blue600">
          {agenda.content}
        </Text>
      </Box>
    </>
  );
};
