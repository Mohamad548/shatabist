"use client";
import React, { useState } from "react";
import Button from "../button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toLocalDateString } from "@/utils/toLocalDate";
import clsx from "clsx";

interface TicketCardProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  status?: string;
  label?: string;
}

const statusConfig = (status?: string) => {
  switch (status) {
    case "resolved":
    case "ANSWERED":
      return {
        bg: "bg-gradient-to-r from-green-50 to-emerald-50",
        text: "text-green-700",
        border: "border-green-700",
        icon: "✓",
        label: "پاسخ داده‌شده",
      };
    case "pending":
    case "PENDING":
      return {
        bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: "⏱",
        label: "درانتظار پاسخ",
      };
    case "OPEN":
      return {
        bg: "bg-gradient-to-r from-green-50 to-emerald-50",
        text: "text-green-700",
        border: "border-green-700",
        icon: "●",
        label: "باز",
      };
    case "CLOSED":
      return {
        bg: "bg-gradient-to-r from-gray-50 to-slate-50",
        text: "text-gray-600",
        border: "border-gray-200",
        icon: "✕",
        label: "بسته‌شده",
      };
    default:
      return {
        bg: "bg-gradient-to-r from-gray-50 to-slate-50",
        text: "text-gray-600",
        border: "border-gray-200",
        icon: "●",
        label: status || "نامشخص",
      };
  }
};

function TicketCard({
  id,
  title,
  content,
  createdAt,
  updatedAt,
  status,
  label,
}: TicketCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const statusInfo = statusConfig(status);

  return (
    <div
      className={clsx(
        "group relative bg-white rounded-2xl shadow-sm hover:shadow-md p-6 mb-4",
        "border border-gray-100 hover:border-primary-200",
        "transition-all duration-300 ease-in-out",
        "hover:-translate-y-1 hover:border hover:border-emerald-700",
        ""
      )}
      tabIndex={0}
      aria-label={`Ticket: ${title}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative gradient accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/30 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div className="flex items- items-center gap-3 flex-1">
            {/* Icon with animation */}
            <div
              className={clsx(
                "relative h-11 w-11 flex-shrink-0 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-700",
                "flex items-center justify-center border border-green-700",
                "transition-transform duration-300",
                isHovered && "scale-110 rotate-3"
              )}
            >
              <Image
                src="/svg/profile/messages-2.svg"
                width={24}
                height={24}
                alt="Ticket Icon"
                quality={100}
                className="text-green-700"
              />
            </div>

            {/* Title and ID */}
            <div className="flex-1">
              <h3
                className="font-bold text-sm md:text-lg text-gray-900 line-clamp-1  transition-colors duration-200 group-hover:text-primary-600"
                title={title}
              >
                {title}
              </h3>
            </div>
          </div>

          {/* Status and Label Badges */}
          <div className="flex items-end justify-end gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
  {status && (
    <>
      {/* <span className="flex items-center rounded-xl text-xs font-semibold">
        وضعیت:
      </span> */}
      <div
        className={clsx(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-yellow-500",
          statusInfo.bg,
          statusInfo.text,
          statusInfo.border,
        )}
        aria-label={`Status: ${status}`}
      >
        <span className="text-sm">{statusInfo.icon}</span>
        <span>{statusInfo.label}</span>
      </div>
    </>
  )}
</div>

            {/* {label && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-primary-50 to-green-50 text-primary-700 border border-primary-200 hover:scale-105 transition-transform duration-200">
                <span>🏷️</span>
                {label}
              </span>
            )} */}
          </div>
        </div>

        <hr className="my-5 border-gray-200" />

        {/* Content Section */}
        {/* <div className="bg-gradient-to-br from-gray-50/50 to-transparent rounded-xl p-4 mb-4 border border-gray-100/50">
          <p
            className="text-gray-700 text-sm leading-relaxed line-clamp-2"
            title={content}
          >
            {content}
          </p>
        </div> */}

        {/* Footer Section */}
        <div className="flex flex-col md:flex-row justify-between gap-3">
          {/* Date Information */}
          <div className="flex items-center justify-between gap-4 text-xs flex-wrap">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="hidden sm:inline text-xs">شماره تیکت:</span>
                  {/* <span className="hidden sm:inline">•</span> */}
                  <span className="px-2 py-0.5 bg-gray-100 rounded-md font-medium text-xs">
                    #{id}
                  </span>
                </div>
                <span className="hidden sm:inline text-gray-300">•</span>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <svg
                    className="w-4 h-4 text-gray-400 hidden sm:inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs">ایجاد:</span>
                  <span className="text-xs">{toLocalDateString(createdAt)}</span>
                </div>
                <span className="hidden sm:inline text-gray-300">•</span>
                {updatedAt && (
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-400 hidden sm:inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span className="text-xs">آپدیت:</span>
                    <span className="text-xs">{toLocalDateString(updatedAt)}</span>
                  </div>
                )}
          </div>
          {/* Action Button */}
          <Button
            onClick={() => {
              router.push(`/profile-user/support/${id}`);
            }}
            className={clsx(
              "group/btn bg-emerald-600 text-white flex items-center gap-2 justify-center text-sm font-semibold rounded-xl py-2.5 px-5"
            )}
            aria-label="View message"
          >
            <span className="text-xs font-Bold">مشاهده تیکت</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
