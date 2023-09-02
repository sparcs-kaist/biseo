import { redirect } from "react-router-dom";
import { Init } from "@biseo/interface/init";
import { useAuth } from "@/services/auth";

interface Params {
  when: (init: Init | null) => boolean;
  to: string;
}

export const protect = ({ when, to }: Params) => {
  const loader = async () => {
    const userInfo = await useAuth.getState().init();
    if (when(userInfo)) return redirect(to);
    return null;
  };

  return { loader };
};
