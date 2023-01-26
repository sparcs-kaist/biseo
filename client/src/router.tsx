import { createBrowserRouter } from "react-router-dom";
import { Main, Login, Admin, Layout } from "./pages";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/admin", element: <Admin /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);
