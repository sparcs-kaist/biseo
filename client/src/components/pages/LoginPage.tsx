import React, { FormEvent, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import { LogoLargeIcon } from "@/assets";
import { useAuth } from "@/services/auth";
import { useInput } from "@/common/hooks";
import styled from "@emotion/styled";
import { theme } from "@/theme";
import { Box, Text } from "@/components/atoms";

export const LoginPage: React.FC = () => {
  const { login, isLoggedIn } = useAuth(state => ({
    login: state.login,
    isLoggedIn: !!state.userInfo,
  }));

  const { input: username } = useInput();
  const { input: password } = useInput();

  const easeMotion = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
    },
  };

  const handleLogin = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      login(username.value, password.value)
        .then(() => console.log("Login success!"))
        .catch(err => alert(err));
    },
    [username.value, password.value],
  );

  if (isLoggedIn) return <Navigate to="/" replace={true} />;

  return (
    <Page>
      <Box dir="column" align="center">
        <LogoLargeIcon width={116} />
        <LoginTitle {...easeMotion}>쉽고 빠른 의사결정은, Biseo</LoginTitle>
      </Box>

      <form onSubmit={handleLogin}>
        <Box dir="column" gap={12}>
          <InputContainer
            type="text"
            placeholder="아이디를 입력하세요"
            {...username}
          />
          <InputContainer
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...password}
          />

          <LoginButton>
            <Text variant="body" color="blue600">
              로그인
            </Text>
          </LoginButton>
        </Box>
      </form>
    </Page>
  );
};

const Page = styled.div`
  width: 100vw;
  height: 100vh;

  box-sizing: border-box;
  padding-bottom: 80px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 22px;
`;

const LoginTitle = styled(motion.div)`
  font-size: 35px;
  font-weight: 700;
  color: ${theme.colors["black"]};
`;

const InputContainer = styled.input`
  width: 320px;
  height: 45px;

  box-sizing: border-box;
  padding: 9px 14px;

  border: 1px solid ${theme.colors["gray300"]};
  border-radius: 5px;
  outline: none;
  font-size: 13px;

  &:hover {
    border: 1px solid ${theme.colors["gray400"]};
  }

  &:focus {
    border: 1px solid ${theme.colors["blue300"]};
    box-shadow: 0px 0px 0px 3px ${theme.colors["blue200"]};
  }
  &::placeholder {
    font-size: 13px;
    color: ${theme.colors["gray300"]};
  }
`;

const LoginButton = styled.button`
  width: 320px;
  height: 45px;

  background-color: ${theme.colors["blue200"]};
  border: none;
  border-radius: 5px;
  outline: none;

  &:hover {
    background-color: ${theme.colors["blue300"]};
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.2s;
`;
