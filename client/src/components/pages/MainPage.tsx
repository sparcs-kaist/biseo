import React, { useEffect } from "react";
import { Box } from "@/components/atoms";
import {
  AdminAgendaSection,
  AgendaSection,
  ChatSection,
} from "@/components/organisms";
import { useAgenda } from "@/services/agenda";
import { SelectBox } from "@/components/atoms/SelectBox";

export const MainPage: React.FC = () => {
  const { retrieveAgendas } = useAgenda(state => ({
    retrieveAgendas: state.retrieveAgendas,
  }));

  useEffect(() => {
    retrieveAgendas();
  }, []);

  return (
    <Box dir="row" padTop={10} padBottom={30} gap={20}>
      {/*<SelectBox width={300} options={["선택 옵션 1", "선택 옵션 2", "선택 옵션 3"]} />*/}
      <AgendaSection />
      <ChatSection />
    </Box>
  );
};
