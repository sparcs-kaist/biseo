import axios from "axios";
import { API_BASE } from "@biseo/web/env";
import { useGoogleLogin } from "@react-oauth/google";

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

export const getGoogleToken = async () => {
  try {
    const res = useGoogleLogin({
      scope: "email profile",
      onSuccess: async ({ code }) => {
        axios
          .post<{ token: string }>(`${API_BASE}/api/auth/glogin`, { code })
          .then(({ data }) => {
            console.log(data);
          });
      },
      onError: errorResponse => {
        console.error(errorResponse);
      },
      flow: "auth-code",
    })();

    // const res = await axios.post<{ token: string }>(
    // `${API_BASE}/api/auth/glogin`,
    // );
    return res.data.token;
  } catch {
    return null;
  }
};
