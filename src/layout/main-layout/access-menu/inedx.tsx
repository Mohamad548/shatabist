"use client";

import { useEffect, useState } from "react";
import { AccessMenuItem } from "@/constants/mock-data/navbar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsxm from "@/utils/clsxm";
import { useCartStore } from "@/stores/useCartStore";

function AccessMenu() {
  const pathname = usePathname();
  const { totalQuantity } = useCartStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="md:hidden text-black bg-white fixed bottom-0 w-full z-10 ">
      <div className="flex justify-around py-2 shadow-2xl bg-gray-100 border-t-2 border-gray-200 ">
        {AccessMenuItem.map((item) => {
          const isSelected = pathname === item.link;
          return (
            <Link
              key={item.id}
              href={item.link}
              className="flex flex-col items-center py-1 cursor-pointer"
            >
              {item.src && (
                <div
                  className={clsxm(
                    "p-2 rounded-full mb-2 relative",
                    isSelected ? "bg-emerald-500" : ""
                  )}
                >
                  <Image
                    src={isSelected && item.activeSrc ? item.activeSrc : item.src}
                    alt={item.name}
                    width={20}
                    height={20}
                  />
                  {item.id === 2 && totalQuantity > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[18px] shadow-lg">
                      {totalQuantity > 99 ? "99+" : totalQuantity}
                    </div>
                  )}
                </div>
              )}
              <span
                className={
                  isSelected ? "text-primary-500 text-xs" : "text-black text-xs"
                }
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


export default AccessMenu;
