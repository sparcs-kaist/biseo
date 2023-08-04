import React from "react";
import { Box, Text, Tag } from "@/components/atoms";

interface Props {
  type: boolean;
}

export const VoteDetail: React.FC<Props> = ({ type }) => {
  return (
    <>
      {type ? (
        <>TODO</>
      ) : (
        <Box w={260} justify="space-between" dir="row">
          <Text variant="subtitle" color="black">
            투표 상세
          </Text>
          <Tag type="anonymous" />
        </Box>
      )}
    </>
  );
};
