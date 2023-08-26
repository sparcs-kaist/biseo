import axios from "axios";
import { API_URL } from "@/env";

export const getToken = async (username: string, password: string) => {
  try {
    const res = await axios.post<{ token: string }>(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return res.data.token;
  } catch {
    return null;
  }
};
