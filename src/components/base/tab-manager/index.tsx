"use client";
import React, { ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsxm from "@/utils/clsxm";
import Button from "../button";
import HeadContentProfile from "../head-content-profile";
import { useFormContext } from "react-hook-form";
import { useFormReset } from "@/utils/useFormReset";
type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};
type TabsProps = {
  tabs: Tab[];
  defaultTab?: string;
  queryParamName?: string;
  backPath: string;
  HeadTapClass?: string;
  iconSize?: { width: number; height: number };
  children?: ReactNode;
  isHead?: boolean;
};
const TabManager = ({
  tabs,
  defaultTab = tabs[0].id,
  queryParamName = "activeTab",
  HeadTapClass,
  children,
  isHead = true,
}: TabsProps) => {
  const router = useRouter();
  const reset = useFormReset();
  const searchParams = useSearchParams();
  const activeTabParam = searchParams.get(queryParamName) || defaultTab;
  const handleTabClick = (tabId: string) => {
    router.push(`?${queryParamName}=${tabId}`);
    if (reset) {
      reset();
    }
  };
  return (
    <div className="rounded-md px-6 py-4">
      {/* HeadTap Section */}
      {/* {isHead ? (
        <HeadContentProfile
          imageClassName="w-6 h-6 md:hidden"
          HeadTapClass={HeadTapClass}
        >
          {children}
        </HeadContentProfile>
      ) : (
        ""
      )} */}

      {/* Tabs Section */}
      <div
        className={clsxm(
          "flex gap-4 mb-4 w-full justify-between md:justify-start p-4 overflow-scroll hidden-scrollbar md:p-2  md:border md:rounded-md bg",
        )}
      >
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            className={clsxm(
              "py-2 border px-4 whitespace-nowrap w-1/2 md:w-40 rounded-md transition-all",
              activeTabParam === tab.id
                ? "bg-emerald-500 text-white font-Bold border-emerald-600"
                : "bg-white text-gray-600 font-regular",
            )}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      {/* نمایش محتوای تب فعال */}
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTabParam)?.content}
      </div>
    </div>
  );
};

export default TabManager;
