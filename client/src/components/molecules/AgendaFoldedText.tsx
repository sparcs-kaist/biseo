import React from "react";
import { Box, Text } from "@/components/atoms";

interface Agenda {
  title: string;
  subtitle: string;
}

interface Props {
  agenda: Agenda;
}

export const AgendaFolded: React.FC<Props> = ({ agenda }) => {
  return (
    <>
      <Box w={260} gap={2}>
        <Text variant="title2" color="black">
          {agenda.title}
        </Text>
        <Text variant="subtitle" color="gray500">
          {agenda.subtitle}
        </Text>
      </Box>
    </>
  );
};
