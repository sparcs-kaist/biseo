import React from "react";
import { useAuth } from "../services/auth";

export const Login: React.FC = () => {
  const { login, logout, isLoggedIn } = useAuth(state => ({
    login: state.login,
    logout: state.logout,
    isLoggedIn: !!state.token,
  }));

  return (
    <div>
      <h1>Login Page</h1>
      <button>
        <a href="https://sparcssso.kaist.ac.kr/account/login/">
          Login
        </a>
      </button>
    </div>
  );
};
