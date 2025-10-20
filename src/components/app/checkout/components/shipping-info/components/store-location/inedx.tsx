"use client";
import React from "react";
import RadioCard from "../base/radio-card";
import clsxm from "@/utils/clsxm";
import { UseFormRegister } from "react-hook-form";
import { useGetVendors } from "@/components/app/profile-user/hooks";

interface VendorType {
  id: string;
  title: string;
  workTime: string;
  description: string;
}

interface StoreLocationType {
  errors: Record<string, any>;
  vendorId: string;
  radioRefs: React.MutableRefObject<Record<string, HTMLLabelElement | null>>;
  register: UseFormRegister<Record<string, any>>;
}

function StoreLocation({
  errors,
  register,
  vendorId,
  radioRefs,
}: StoreLocationType) {
  const { data } = useGetVendors();
  const { vendors } = data || {};

  return (
    <div
      className={clsxm(
        "bg-white rounded-xl border-2 transition-all duration-200 p-6 shadow-sm",
        Object.keys(errors).includes("vendorId")
          ? "border-red-200 bg-red-50/30"
          : "border-gray-100 hover:border-gray-200 hover:shadow-md"
      )}
    >
      {/* Header with gradient accent */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-6 bg-gradient-to-b from-primary-500 to-primary-700 rounded-full"></div>
        <h3 className="font-bold text-lg text-gray-900">انتخاب شعبه</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
      </div>

      {/* Store locations grid */}
      <div className="space-y-4">
        {vendors?.map((item: VendorType) => (
          <div key={item.id} className={clsxm("overflow-hidden")}>
            <RadioCard
              id={item.id.toString()}
              name={item.title}
              time={item.workTime}
              description={item.description}
              selectedOption={vendorId}
              radioRef={(el) => (radioRefs.current[item.id] = el)}
              register={register("vendorId", {
                required: "لطفاً یکی از شعب را انتخاب کنید.",
              })}
            />
          </div>
        ))}
      </div>

      {/* Enhanced error message */}
      {errors.vendorId && typeof errors.vendorId.message === "string" && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-red-500">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-red-700 text-sm font-medium">
              {errors.vendorId.message}
            </p>
          </div>
        </div>
      )}

      {/* Subtle footer info */}
      {vendors && vendors.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            {vendors.length} شعبه در دسترس
          </p>
        </div>
      )}
    </div>
  );
}

export default StoreLocation;
