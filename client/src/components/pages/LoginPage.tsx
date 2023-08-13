import React, { FormEvent, useCallback } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/services/auth";
import { useInput } from "@/common/hooks";

export const LoginPage: React.FC = () => {
  const { login, isLoggedIn } = useAuth(state => ({
    login: state.login,
    isLoggedIn: !!state.userInfo,
  }));

  const username = useInput();
  const password = useInput();

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
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input type="text" {...username} />
        <input type="password" {...password} />
        <button>Login</button>
      </form>
    </div>
  );
};
