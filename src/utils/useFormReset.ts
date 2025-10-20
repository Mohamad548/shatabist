// utils/formUtils.ts
import { useFormContext } from "react-hook-form";

export const useFormReset = (): (() => void) | undefined => {
  let reset: (() => void) | undefined;
  try {
    const formContext = useFormContext();
    reset = formContext?.reset;
  } catch {
    reset = undefined;
  }
  return reset;
};
