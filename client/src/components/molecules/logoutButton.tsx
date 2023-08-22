import React from "react";
import { Box, Text } from "@/components/atoms";
import { useAuth } from "@/services/auth";
import { useNavigate } from "react-router-dom";

interface Props {
  displayName: string;
  onClick: () => void;
}

export const LogOutButton: React.FC<Props> = ({ displayName, onClick }) => {
  return (
    <Box
      bg="blue200"
      h={28}
      align="center"
      padVertical={1}
      padHorizontal={10}
      justify="center"
      round={5}
      onClick={onClick}
    >
      <Text variant="boldtitle3" color="blue600">
        {displayName}
      </Text>
    </Box>
  );
};
