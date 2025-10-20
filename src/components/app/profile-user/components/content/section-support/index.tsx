"use client";

import HeadContentProfile from "@/components/base/head-content-profile";
import React from "react";
import { AddTicketModal } from "../../base/profile-modals";
import { FormProvider, useForm } from "react-hook-form";
import TabManager from "@/components/base/tab-manager";

import StatusTicketList from "@/components/base/status-ticket";
import AllTicketTab from "./tab-all-ticket";

function Support() {
  const tabs = [
    {
      id: "allTickets",
      label: "همه تیکت‌ها",
      content: <AllTicketTab status="ALL" />,
    },
    {
      id: "unreviewed",
      label: "بررسی‌نشده",
      content: <StatusTicketList status="OPEN" label="بررسی نشده" />,
    },
    {
      id: "underReview",
      label: "درحال‌بررسی",
      content: <StatusTicketList status="PENDING" label="در حال بررسی" />,
    },
    {
      id: "waitingForResponse",
      label: "منتظر پاسخ شما",
      content: (
        <StatusTicketList status="WAITFORREPLY" label="منتظر پاسخ شما" />
      ),
    },
    {
      id: "responded",
      label: "پاسخ داده‌شده",
      content: <StatusTicketList status="ANSWERED" label="پاسخ داده شده" />,
    },
    {
      id: "closed",
      label: "بسته‌شده",
      content: <StatusTicketList status="CLOSED" label="بسته شده" />,
    },
  ];

  const methods = useForm();
  return (
    <div className=" border rounded-md border-gray-200 p-6 flex flex-col gap-5 top-44 bottom-0  right-0 left-0 md:static">
      <HeadContentProfile
        HeadTapClass="flex gap-2 items-center "
        imageClassName="md:hidden"
      >
        <div className="flex justify-between w-full items-center">
          <h3 className="font-Bold text-base text-gray-800">پشتیبانی</h3>
          <FormProvider {...methods}>
            <AddTicketModal />
          </FormProvider>
        </div>
      </HeadContentProfile>
      <TabManager
        tabs={tabs}
        defaultTab="allTickets"
        backPath="/profile-user"
      />
    </div>
  );
}

export default Support;
