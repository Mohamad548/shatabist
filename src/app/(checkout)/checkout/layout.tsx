// app/checkout/layout.tsx

import CheckoutSidebar from "@/components/app/checkout";
import Header from "@/layout/main-layout/header";
import React from "react";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* <Header /> */}
      <div className="flex flex-col w-full pb-20 md:pb-0">
        {/* <CheckoutSidebar /> */}
        صفحه چک اوت 
        {children}
      </div>
    </div>
  );
}
