export const colors = {
  white: "#FFFFFF",
  black: "#444444",
  white100: "#FAFBFC",
  gray100: "#FAFAFA",
  gray200: "#EEEEEE",
  gray300: "#D9D9D9",
  gray400: "#B6B6B6",
  gray500: "#8C8C8C",
  gray600: "#555555",
  grayTrans: "rgba(85, 85, 85, 0.1)",
  blue100: "#FAFCFF",
  blue200: "#E7F0FF",
  blue300: "#BFDCFF",
  blue400: "#6EABF4",
  blue500: "#2F80DE",
  blue600: "#065DAC",
  blue700: "#004B81",
  purple200: "#F6EEFE",
  purple600: "#9836EF",
  orange200: "#FDF7E6",
  orange600: "#FF9211",
  green200: "#E9F9EF",
  green600: "#008B1C",
} as const;

type ColorKeys = keyof typeof colors;
export type Color = (typeof colors)[ColorKeys];
export const mapColors = <T>(cb: (color: Color) => T) =>
  Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [key, cb(value)] as const),
  ) as Record<ColorKeys, T>;
