export const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#444444",
    white100: "#FAFBFC",
    gray100: "#FAFAFA",
    gray200: "#EEEEEE",
    gray300: "#D9D9D9",
    gray400: "#B6B6B6",
    gray500: "#8C8C8C",
    gray600: "#555555",
    blue100: "#FAFCFF",
    blue200: "#E7F0FF",
    blue300: "#BFDCFF",
    blue400: "#6EABF4",
    blue500: "#2F80DE",
    blue600: "#065DAC",
    blue700: "#004B81",
    // added by ella_start
    purple200: "#F6EEFE", // purple-light
    purple600: "#9836EF", // purple
    orange200: "#FDF7E6", // orange-light
    orange600: "#FF9211", // orange
    green200: "#E9F9EF", // green-light
    green600: "#008B1C", // green
    // added by ella_end
  } as const,
} as const;

export type Theme = typeof theme;
export type Color = keyof Theme["colors"];
