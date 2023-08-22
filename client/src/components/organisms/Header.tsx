import React from "react";
import styled from "@emotion/styled";
import { LogoIcon } from "@/assets";
import { Box } from "@/components/atoms";
import { HeaderItem, LogOutButton } from "@/components/molecules";
import { useAuth } from "@/services/auth";
import { useNavigate } from "react-router-dom";

const adminPathList = [
  { name: "유저 모드", path: "" },
  { name: "투표 관리", path: "admin/agendas" },
  { name: "유저 관리", path: "admin/users" },
  { name: "설정", path: "admin/settings" },
];

const Container = styled.header`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 60px;
  padding: 0 50px;
  padding-top: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.gray300};
`;

export const Header: React.FC = () => {
  const { displayName, logout } = useAuth(state => ({
    displayName: state.userInfo?.displayName,
    logout: state.logout,
  }));

  const navigate = useNavigate();

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
        {useAuth().userInfo?.isAdmin ? (
          adminPathList.map((item, index) => (
            <HeaderItem
              key={index}
              name={item.name}
              path={item.path}
              selected={window.location.pathname === "/" + item.path}
            />
          ))
        ) : (
          <></>
        )}
      </Box>
      <LogOutButton
        displayName={displayName == undefined ? "SPARCS ANON" : displayName}
        onClick={() => handleLogout()}
      />
    </Container>
  );
};
