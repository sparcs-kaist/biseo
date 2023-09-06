import React, { useEffect } from "react";
import { AgendaSection, ChatSection } from "@/components/organisms";
import { useAgenda } from "@/services/agenda";
import { align, gap, justify, padding, row } from "@/styles";
import { w, h } from "@/styles/size";

export const MainPage: React.FC = () => {
  const { retrieveAgendas } = useAgenda(state => ({
    retrieveAgendas: state.retrieveAgendas,
  }));

  useEffect(() => {
    retrieveAgendas();
  }, []);

  return (
    <main
      css={[
        row,
        justify.center,
        align.stretch,
        w.fill,
        h.fill,
        padding.top(10),
        padding.bottom(30),
        gap(20),
      ]}
    >
      <AgendaSection />
      <ChatSection />
    </main>
  );
};
