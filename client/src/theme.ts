export const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#444444",
    white100: "#FAFBFC",
    gray100: "#FAFAFA",
    gray200: "#EEEEEE",
    gray300: "#D9D9D9",
    gray400: "#8C8C8C",
    gray500: "#555555",
    blue100: "#FAFCFF",
    blue200: "#E7F0FF",
    blue300: "#BFDCFF",
    blue400: "#6EABF4",
    blue500: "#0066AE",
    blue600: "#004B81",
  } as const,
} as const;

export type Theme = typeof theme;
export type Color = keyof Theme["colors"];
