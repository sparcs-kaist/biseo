import React, { type FormEvent, useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import { LogoLargeIcon } from "@biseo/web/assets";
import LandingImg from "@biseo/web/assets/landing.png";
import { useAuth } from "@biseo/web/services/auth";

import { useInput } from "@biseo/web/common/hooks";
import { theme } from "@biseo/web/theme";
import { Box, Text } from "@biseo/web/components/atoms";
import { text } from "@biseo/web/styles";

const Page = styled.div`
  width: 100vw;
  height: 100vh;

  box-sizing: border-box;
  padding-bottom: 90px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 22px;
  overflow: hidden;
`;

const LoginTitle = styled(motion.div)`
  font-size: 35px;
  font-weight: 700;
  color: ${theme.colors.black};
`;

const InputContainer = styled.input`
  width: 320px;
  height: 45px;

  box-sizing: border-box;
  padding: 9px 14px;

  border: 1px solid ${theme.colors.gray300};
  border-radius: 5px;
  outline: none;

  ${text.subtitle}

  &:hover {
    border: 1px solid ${theme.colors.gray400};
  }

  &:focus {
    border: 1px solid ${theme.colors.blue300};
    box-shadow: 0px 0px 0px 3px ${theme.colors.blue200};
  }
  &::placeholder {
    font-size: 13px;
    color: ${theme.colors.gray300};
  }
`;

const LoginButton = styled.button`
  width: 320px;
  height: 45px;

  background-color: ${theme.colors.blue200};
  border: none;
  border-radius: 5px;
  outline: none;

  &:hover {
    background-color: ${theme.colors.blue300};
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.2s;
`;

const LoginBackground = styled.img`
  width: 100%;
  max-width: 1700px;

  position: absolute;
  opacity: 30%;
  bottom: 20px;

  overflow: hidden;
`;

export const LoginPage: React.FC = () => {
  const { login, isLoggedIn } = useAuth(state => ({
    login: state.login,
    isLoggedIn: !!state.userInfo,
  }));
  const [error, setError] = useState<boolean>(false);

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
        .catch(() => setError(true));
    },
    [username.value, password.value],
  );

  if (isLoggedIn) return <Navigate to="/" replace />;

  return (
    <Page>
      <Box dir="column" align="center">
        <LogoLargeIcon width={116} />
        <LoginTitle
          initial={easeMotion.initial}
          animate={easeMotion.animate}
          transition={easeMotion.transition}
        >
          쉽고 빠른 의사결정은, Biseo
        </LoginTitle>
      </Box>

      <form onSubmit={handleLogin}>
        <Box dir="column" gap={12} align="center">
          <InputContainer
            type="text"
            placeholder="아이디를 입력하세요"
            value={username.value}
            onChange={username.onChange}
          />
          <InputContainer
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password.value}
            onChange={password.onChange}
          />
          <Box dir="column" gap={8} align="flex-start">
            {error && (
              <Text variant="subtitle" color="blue600">
                아이디 또는 비밀번호가 올바르지 않습니다.
              </Text>
            )}

            <LoginButton>
              <Text variant="body" color="blue600">
                로그인하기
              </Text>
            </LoginButton>
          </Box>
        </Box>
      </form>
      <LoginBackground src={LandingImg} />
    </Page>
  );
};
