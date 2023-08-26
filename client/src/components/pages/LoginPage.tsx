import React, { FormEvent, useCallback } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/services/auth";
import { useInput } from "@/common/hooks";
import styled from "@emotion/styled";
import { theme } from "@/theme";

export const LoginPage: React.FC = () => {
  const { login, isLoggedIn } = useAuth(state => ({
    login: state.login,
    isLoggedIn: !!state.userInfo,
  }));

  const { input: username } = useInput();
  const { input: password } = useInput();

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
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <InputWrapper>
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
        </InputWrapper>

        <button>Login</button>
      </form>
    </Page>
  );
};

const Page = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const InputContainer = styled.input`
  width: 310px;
  height: 40px;

  box-sizing: border-box;
  padding: 9px 12px;

  border: 1px solid ${theme.colors["gray300"]};
  border-radius: 5px;
  outline: none;

  &:focus {
    border: 1px solid ${theme.colors["blue300"]};
    box-shadow: 0px 0px 0px 3px ${theme.colors["blue200"]};
  }
  &::placeholder {
    font-size: 13px;
  }
`;
