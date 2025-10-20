"use client";
import React from "react";
import TabManager from "@/components/base/tab-manager";
import OrderTabContent from "./order-tab-content";

function Orders() {
  const tabs = [
    {
      id: "in_progress",
      label: "جاری",
      content: <OrderTabContent status="PENDING" />,
    },
    {
      id: "sent",
      label: "تکمیل‌شده",
      content: <OrderTabContent status="COMPLETED" />,
    },
    {
      id: "Refunded",
      label: "مرجوعی",
      content: <OrderTabContent status="REFUNDED" />,
    },
    {
      id: "canceled",
      label: "لغوشده",
      content: <OrderTabContent status="CANCELLED" />,
    },
  ];

  return (
    <div className="border rounded-md bg-white top-44">
      <TabManager
        tabs={tabs}
        defaultTab="in_progress"
        queryParamName="activeTab"
        backPath="/profile-user"
        HeadTapClass="flex p-4 items-center gap-2"
      >
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bold text-base text-gray-800">سفارش ها</h3>
        </div>
      </TabManager>
    </div>
  );
}

export default Orders;
