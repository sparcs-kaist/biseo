import { type FormEvent, useCallback, useState } from "react";

export const useTextArea = () => {
  const [value, setValue] = useState("");

  const onInput = useCallback((e: FormEvent<HTMLParagraphElement>) => {
    setValue(e.currentTarget.textContent as string);
  }, []);

  return { value, onInput };
};
