"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ShataLoading from "@/components/base/loading/shata-loading";

export default function GlobalLoader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const currentPathRef = useRef(pathname); // مسیر فعلی

  // هر بار که مسیر تغییر کرد، لودینگ خاموش شود و مسیر فعلی را به‌روزرسانی کنیم
  useEffect(() => {
    setLoading(false);
    currentPathRef.current = pathname;
  }, [pathname]);

  // listener روی لینک‌ها برای فعال کردن لودینگ به محض کلیک
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a") as HTMLAnchorElement | null;

      if (link && link.href) {
        const linkPath = new URL(link.href).pathname;
        if (linkPath !== currentPathRef.current) {
          setLoading(true);
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-md">
          <ShataLoading color="text-white" />
        </div>
      )}
      {children}
    </div>
  );
}
