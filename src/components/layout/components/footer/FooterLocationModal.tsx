"use client";
import ManageModal from "@/components/base/modal";
import Button from "@/components/base/button";
import Image from "next/image";
import Link from "next/link";
import { LocationLinks } from "@/constants/mock-data/location-links";

export default function FooterLocationModal() {
  return (
    <ManageModal
      triggerContent={
        <Button className="text-xs bg-emerald-500 text-white p-2 rounded shadow-md hover:bg-emerald-600 transition-all duration-200 focus:ring-2 focus:ring-emerald-300 focus:outline-none">
          مکان یابی
        </Button>
      }
      className="fixed inset-0 z-50"
      cancelLabel={
        <div className="absolute left-5 top-5">
          <Image
            src="/svg/profile/close-circle.svg"
            alt="close-modal"
            width={25}
            height={25}
          />
        </div>
      }
      modalBodyClass="w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl p-0 animate-fadeInUp relative overflow-y-auto"
      cancelBoxClass="flex justify-end items-start"
      fadeIn="animate-fadeIn"
      fadeOut="animate-slideDown"
      activeOverlay={true}
    >
      <div className="flex flex-col gap-6 p-0">
        {/* Header */}
        <div className="flex flex-col gap-1 items-center justify-center bg-emerald-100/40 py-8 px-4 rounded-t-2xl border-b border-emerald-100 relative animate-fadeIn">
          <div className="flex items-center justify-center mb-2">
            <Image
              src="/svg/locationx.svg"
              alt="location"
              width={56}
              height={56}
              className="drop-shadow-lg"
            />
          </div>
          <h3 className="text-2xl font-extrabold text-emerald-600 tracking-tight mb-1 animate-fadeIn">
            مکان یابی فروشگاه
          </h3>
          <span className="text-sm text-gray-500 animate-fadeIn delay-100">
            دسترسی سریع به اطلاعات آدرس و لوکیشن
          </span>
        </div>

        {/* Location Links */}
        <div
          className="px-6 pb-8 animate-fadeIn delay-300 
      "
        >
          <h4 className="text-base font-bold text-emerald-600 mb-3 flex items-center justify-center gap-2">
            مسیرهای دسترسی
          </h4>
          <div className="flex flex-wrap gap-4 justify-center">
            {LocationLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                target="_blank"
                className="flex flex-col items-center gap-1 bg-emerald-100/60 hover:bg-emerald-200 transition-colors duration-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md focus:ring-2 focus:ring-emerald-300 focus:outline-none"
              >
                <Image
                  src={item.iconSrc}
                  alt={item.alt}
                  width={32}
                  height={32}
                  className="mb-1"
                />
                <span className="text-xs text-emerald-700 font-semibold">
                  {item.alt}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Animations */}
      {/* <style jsx global>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-popIn {
          animation: popIn 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes popIn {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          80% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style> */}
    </ManageModal>
  );
}
