import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AdminAgendaSection } from "@biseo/web/components/organisms";
import { useAdminAgenda } from "@biseo/web/services/admin-agenda";
import { useAgendaTemplate } from "@biseo/web/services/agenda-template";
import {
  justify,
  padding,
  row,
  w,
  gap,
  scroll,
  scrollBar,
} from "@biseo/web/styles";

export const AdminAgendaPage: React.FC = () => {
  const { retrieveAgendas } = useAdminAgenda(state => ({
    retrieveAgendas: state.retrieveAll,
  }));
  const { retrieveTemplates } = useAgendaTemplate(state => ({
    retrieveTemplates: state.retrieveAll,
  }));
  useEffect(() => {
    retrieveAgendas();
    retrieveTemplates();
  }, []);

  return (
    <div css={[scroll.y, scrollBar]}>
      <div
        css={[
          row,
          w("fill"),
          justify.center,
          padding.top(20),
          padding.bottom(30),
          gap(20),
        ]}
      >
        <AdminAgendaSection />
        <Outlet />
      </div>
    </div>
  );
};
