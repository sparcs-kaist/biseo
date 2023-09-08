import React, { type PropsWithChildren } from "react";
import { Box } from "@/components/atoms";

/**
 * @deprecated use AgendaCard.Group instead
 */
export const List: React.FC<PropsWithChildren> = ({ children = null }) => (
  <Box dir="column" w="fill" gap={15}>
    {children}
  </Box>
);
