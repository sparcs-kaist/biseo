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
  <GoogleOAuthProvider clientId="630761439137-ouv559b1su1h52t0jqau3g41ok2cf3p0.apps.googleusercontent.com">
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
