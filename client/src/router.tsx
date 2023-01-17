import { createBrowserRouter } from "react-router-dom";
import { Main, Login, Admin } from "./pages";

export default createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/login", element: <Login /> },
  { path: "/admin", element: <Admin /> },
]);
