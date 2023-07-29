import React from "react";
import { Box, Text } from "@/components/atoms";

interface Props {
  anonymous: boolean;
}

export const VoteDetail: React.FC<Props> = ({ anonymous }) => {
  return (
    <>
      {anonymous ? (
        <Box w={260} justify="space-between" dir="row">
          <Text variant="subtitle" color="black">
            투표 상세
          </Text>
          <Text variant="option1" color="gray500">
            무기명
          </Text>
        </Box>
      ) : (
        <>TODO</>
      )}
    </>
  );
};
