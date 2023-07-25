import { createBrowserRouter } from "react-router-dom";
import { protect } from "@/utils/routes";
import { PageLayout } from "@/components/templates";
import { MainPage, LoginPage, AdminPage } from "@/components/pages";

export default createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      {
        path: "/admin",
        element: <AdminPage />,
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
