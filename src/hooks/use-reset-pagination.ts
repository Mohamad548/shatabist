// src/hooks/use-reset-pagination.ts
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { usePaginationStore } from "@/stores/paginationStore";

export const useResetPaginationOnPathChange = () => {
  const pathname = usePathname();
  const { setOffset } = usePaginationStore();

  useEffect(() => {
    setOffset(0);
  }, [pathname, setOffset]);
};
