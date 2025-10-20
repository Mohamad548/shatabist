"use client";

import Button from "@/components/base/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
   
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4 py-12 text-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-emerald-100/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 animate-[pulse_3s_ease-in-out_infinite_1s] rounded-full bg-emerald-50/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-[pulse_3s_ease-in-out_infinite_2s] rounded-full bg-emerald-100/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl space-y-8">
        {/* Floating Error Icon with Enhanced 3D Effect */}
        <div className="relative animate-[float_6s_ease-in-out_infinite]">
          <div className="flex items-center justify-center">
            <svg
              className="h-32 w-32 animate-[pulse_2s_ease-in-out_infinite] text-emerald-100/50 [filter:drop-shadow(0_2px_10px_rgba(0,0,0,0.1))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="animate-[fadeIn_1s_ease-out] text-4xl font-bold text-gray-800 [text-shadow:_0_2px_4px_rgba(0,0,0,0.1)]">
              خطایی رخ داده است
            </h2>
          </div>
        </div>

        {/* Description with Enhanced Fade-in Animation */}
        <div className="space-y-4 animate-[fadeIn_1s_ease-out_0.5s_backwards]">
          <p className="text-lg text-gray-600">
            متأسفانه در سیستم خطایی رخ داده است.
          </p>
          <p className="text-sm text-gray-500">
            لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.
          </p>
          {error?.message && (
            <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error.message}
            </p>
          )}
        </div>

        {/* Enhanced Action Buttons with Micro-interactions */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-[fadeIn_1s_ease-out_1s_backwards]">
          <Button
            onClick={reset}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-emerald-500 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:bg-emerald-700 hover:shadow-emerald-500/25 hover:scale-105 active:scale-95 sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/20 to-transparent opacity-0 transition-opacity group-active:opacity-100" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180 group-active:rotate-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            <span className="relative z-10">تلاش مجدد</span>
          </Button>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border border-gray-200 bg-white px-6 py-3 text-gray-700 shadow-lg transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 to-transparent opacity-0 transition-opacity group-active:opacity-100" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-active:scale-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="relative z-10">تماس با پشتیبانی</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
