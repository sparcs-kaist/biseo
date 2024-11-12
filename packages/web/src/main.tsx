import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { enableMapSet } from "immer";
import { GoogleOAuthProvider } from "@react-oauth/google";

import router from "@biseo/web/router";
import { theme } from "@biseo/web/theme";

import "./index.css";

enableMapSet();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT!}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
