import { ChangeEvent, useCallback, useState } from "react";

export const useInput = <T extends string | number | boolean>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);
  return { value, onChange };
};
