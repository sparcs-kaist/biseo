import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AdminSettingSection } from "@biseo/web/components/organisms";
import { useAgendaTemplate } from "@biseo/web/services/agenda-template";
import { useUserTag } from "@biseo/web/services/user-tag";
import { justify, padding, row, w, h, gap } from "@biseo/web/styles";

export const AdminSettingPage: React.FC = () => {
  const { retrieveTemplates } = useAgendaTemplate(state => ({
    retrieveTemplates: state.retrieveAll,
  }));
  const { retrieveTags } = useUserTag(state => ({
    retrieveTags: state.retrieveAll,
  }));

  useEffect(() => {
    retrieveTemplates();
    retrieveTags();
  }, []);

  return (
    <div
      css={[
        row,
        w("fill"),
        h("fill"),
        justify.center,
        padding.top(20),
        padding.bottom(30),
        gap(20),
      ]}
    >
      <AdminSettingSection />
      <Outlet />
    </div>
  );
};
