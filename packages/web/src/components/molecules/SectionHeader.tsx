import React, { type PropsWithChildren } from "react";
import { Box, Text } from "@biseo/web/components/atoms";

interface Props extends PropsWithChildren {
  count: number;
}

/**
 * @deprecated use AgendaCard.Group instead
 */
export const SectionHeader: React.FC<Props> = ({ count, children = null }) => (
  <Box dir="row" align="center" gap={8} padHorizontal={15} padVertical={11}>
    <Text variant="title2" color="black">
      {children}
    </Text>
    <Box bg="blue200" round={5} align="center" justify="center" w={20} h={20}>
      <Text color="blue600" variant="boldtitle4">
        {count}
      </Text>
    </Box>
  </Box>
);
