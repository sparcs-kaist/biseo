import React from "react";
import { Box, Text, Tag } from "@biseo/web/components/atoms";

interface Props {
  named: boolean;
}

export const VoteDetail: React.FC<Props> = ({ named }) => (
  <Box w="fill" justify="space-between" dir="row" align="center">
    <Text variant="subtitle" color="black">
      투표 상세
    </Text>
    <Tag type={named ? "identified" : "anonymous"} />
  </Box>
);
