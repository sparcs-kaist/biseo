import axios from "axios";

export const getToken = async (username: string, password: string) => {
  try {
    const res = await axios.post<{ token: string }>(
      "/api/auth/login", { username, password },
    );
    return res.data.token;
  } catch {
    return null;
  }
};
