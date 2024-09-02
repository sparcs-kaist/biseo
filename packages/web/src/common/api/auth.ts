import axios from "axios";
import { API_BASE } from "@biseo/web/env";
import type { CredentialResponse } from "@react-oauth/google";

export const getToken = async (username: string, password: string) => {
  try {
    const res = await axios.post<{ token: string }>(
      `${API_BASE}/api/auth/login`,
      {
        username,
        password,
      },
    );
    return res.data.token;
  } catch {
    return null;
  }
};

export const getGoogleToken = async (
  credentialResponse: CredentialResponse,
) => {
  try {
    const res = await axios.post<{ token: string }>(
      `${API_BASE}/api/auth/glogin`,
      credentialResponse,
    );
    return res.data.token;
  } catch {
    return null;
  }
};
