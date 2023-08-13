import { ChangeEvent, useCallback, useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState("");
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );
  return { input: { value, onChange }, setValue };
};
