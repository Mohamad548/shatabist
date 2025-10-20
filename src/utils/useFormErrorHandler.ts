import { useRef } from "react";
export const useFormErrorHandler = () => {
  const formRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollToError = (key: string) => {
    if (formRefs.current[key]) {
      formRefs.current[key]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const onError = (errors: Record<string, any>) => {
    const firstErrorKey = Object.keys(errors)[0];

    if (firstErrorKey) {
      scrollToError(firstErrorKey);
    }
  };
  return {
    formRefs,
    onError,
  };
};
