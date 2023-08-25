import { createBrowserRouter } from "react-router-dom";
import { protect } from "@/utils/routes";
import { PageLayout } from "@/components/templates";
import {
  CreateAgendaModal,
  CreateUserTagModal,
  EditAgendaModal,
  EditUserTagModal,
  EditTemplateModal,
  OngoingAgendaModal,
  TerminatedAgendaModal,
  CreateTemplateModal,
} from "@/components/organisms";
import {
  MainPage,
  LoginPage,
  AdminAgendaPage,
  AdminUserPage,
  AdminSettingPage,
} from "@/components/pages";

export default createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      {
        path: "/admin",
        children: [
          {
            path: "agendas",
            element: <AdminAgendaPage />,
            children: [
              {
                path: "create",
                element: <CreateAgendaModal />,
              },
              {
                path: "edit",
                element: <EditAgendaModal />,
              },
              {
                path: "ongoing",
                element: <OngoingAgendaModal />,
              },
              {
                path: "terminated",
                element: <TerminatedAgendaModal />,
              },
            ],
          },
          { path: "users", element: <AdminUserPage /> },
          {
            path: "settings",
            element: <AdminSettingPage />,
            children: [
              { path: "edittag", element: <EditUserTagModal /> },
              { path: "createtag", element: <CreateUserTagModal /> },
              {
                path: "templateEdit",
                element: <EditTemplateModal />,
              },
              {
                path: "templateCreate",
                element: <CreateTemplateModal />,
              },
            ],
          },
        ],
        ...protect({ to: "/", when: user => !user?.isAdmin }),
      },
    ],
    ...protect({ to: "/login", when: user => !user }),
  },
  {
    path: "/login",
    element: <LoginPage />,
    ...protect({ to: "/", when: user => !!user }),
  },
]);
