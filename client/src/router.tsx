import { createBrowserRouter } from "react-router-dom";
import { protect } from "@/utils/routes";
import { Main, Login, Admin, Layout } from "./pages";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      {
        path: "/admin",
        element: <Admin />,
        ...protect({ to: "/", when: user => !user?.isAdmin }),
      },
    ],
    ...protect({ to: "/login", when: user => !user }),
  },
  {
    path: "/login",
    element: <Login />,
    ...protect({ to: "/", when: user => !!user }),
  },
]);
