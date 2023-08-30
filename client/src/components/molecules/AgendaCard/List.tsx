import { Box } from "@/components/atoms";
import React, { PropsWithChildren } from "react";

export const List: React.FC<PropsWithChildren> = ({ children }) => (
  <Box dir="column" w="fill" gap={15}>
    {children}
  </Box>
);
