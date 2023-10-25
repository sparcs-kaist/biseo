import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@biseo/web/assets";
import { Box, Button, Text } from "@biseo/web/components/atoms";
import { HeaderItem } from "@biseo/web/components/molecules";
import { useAuth } from "@biseo/web/services/auth";

const adminPathList = [
  { name: "유저 모드", path: "" },
  { name: "투표 관리", path: "admin/agendas" },
  // { name: "유저 관리", path: "admin/users" },
  { name: "설정", path: "admin/settings" },
];

const Container = styled.header`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 60px;
  padding: 0 50px;
  padding-top: 5px;
  border-bottom: 1px solid ${props => props.theme.colors.gray300};
`;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { displayName, logout } = useAuth(state => ({
    displayName: state.userInfo?.displayName,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Container>
      <Box h="fill" dir="row" align="center">
        <LogoIcon />
      </Box>
      <Box w="fill" h="fill" dir="row" align="center" justify="center">
        {useAuth().userInfo?.isAdmin
          ? adminPathList.map(item => (
              <HeaderItem
                key={item.path}
                name={item.name}
                path={item.path}
                selected={
                  item.path === ""
                    ? window.location.pathname === `/${item.path}`
                    : window.location.pathname.startsWith(`/${item.path}`)
                }
              />
            ))
          : null}
      </Box>
      <Button h={28} w={28} onClick={handleLogout}>
        <Text variant="boldtitle3" color="blue600">
          {displayName === undefined
            ? "?"
            : displayName.slice(0, 1).toUpperCase()}
        </Text>
      </Button>
    </Container>
  );
};
