/// <reference types="@emotion/react/types/css-prop" />

import "@emotion/react";
import type { Theme as CustomTheme } from "@biseo/web/theme";

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}
