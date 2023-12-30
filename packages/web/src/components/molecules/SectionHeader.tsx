import { Box } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";
import React, { type PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  count: number;
}

/**
 * @deprecated use AgendaCard.Group instead
 */
export const SectionHeader: React.FC<Props> = ({ count, children = null }) => (
  <Box dir="row" align="center" gap={8} padHorizontal={15} padVertical={11}>
    <p css={[text.title2, text.black]}>{children}</p>
    <Box bg="blue200" round={5} align="center" justify="center" w={20} h={20}>
      <p css={[text.body, text.blue600]}>{count}</p>
    </Box>
  </Box>
);
