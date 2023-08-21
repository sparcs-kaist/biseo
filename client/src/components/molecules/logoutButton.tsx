import React from "react";
import { Box, Text } from "@/components/atoms";
import { useAuth } from "@/services/auth";
import { useNavigate } from "react-router-dom";

interface Props {
  displayName: string;
}

export const LogOutButton: React.FC<Props> = ({ displayName }) => {
  const navigate = useNavigate();
  const logout = () => {
    logoutAuth();
    console.log("hek");
    //navigate("/login");
  };
  const { logoutAuth } = useAuth(state => ({
    logoutAuth: state.logout,
  }));
  return (
    <Box
      bg="blue200"
      h={28}
      align="center"
      padVertical={1}
      padHorizontal={10}
      justify="center"
      round={5}
      onClick={logout}
    >
      <Text variant="boldtitle3" color="blue600">
        {displayName}
      </Text>
    </Box>
  );
};
