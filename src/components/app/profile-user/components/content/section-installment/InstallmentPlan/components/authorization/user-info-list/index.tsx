import React from "react";
import Input from "@/components/base/input";
import { useFormContext } from "react-hook-form";
import { CreditDetail } from "@/components/app/profile-user/hooks/type";
import { toLocalDateString } from "@/utils/toLocalDate";

interface UserInfoListProps {
  user?: any;
  installmentDetail?: CreditDetail;
}

const UserInfoList = ({ user, installmentDetail }: UserInfoListProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // داده‌ها را اولویت با installmentDetail می‌دهیم
  const displayUser = installmentDetail || user;

  const isPhoneVerified = installmentDetail; // اگر installmentDetail موجود باشد، شماره موبایل تایید شده است

  return (
    <div className="space-y-8">
      {/* Personal & Identity Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-gray-900">اطلاعات هویتی</h2>
          <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-xs font-Medium">تاییدشده</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* نام و نام خانوادگی */}
          <div>
            <label className="text-sm text-gray-500 font-regular">
              نام و نام خانوادگی
            </label>
            <p className="text-base text-gray-900 font-Medium mt-1">
              {displayUser.first_name && displayUser.last_name
                ? `${displayUser.first_name} ${displayUser.last_name}`
                : "تکمیل نشده"}
            </p>
          </div>

          {/* کد ملی */}
          <div>
            <label className="text-sm text-gray-500 font-regular">کد ملی</label>
            <p className="text-base text-gray-900 font-Medium mt-1">
              {displayUser.national_id || "تکمیل نشده"}
            </p>
          </div>

          {/* تاریخ تولد */}
          <div>
            <label className="text-sm text-gray-500 font-regular">
              تاریخ تولد
            </label>
            <p className="text-base text-gray-900 font-Medium mt-1">
              {displayUser.birth_date
                ? toLocalDateString(displayUser.birth_date)
                : "تکمیل نشده"}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-gray-900">اطلاعات تماس</h2>
          <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-xs font-Medium">تاییدشده</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* شماره موبایل */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500 font-regular">
              شماره موبایل
            </label>
            {isPhoneVerified ? (
              <p className="text-base text-gray-900 font-Medium mt-2">
                {displayUser.phone_number}
              </p>
            ) : (
              <div className="mt-2">
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "شماره تلفن الزامی است",
                    pattern: {
                      value: /^09[0-9]{8,9}$/,
                      message: "لطفاً شماره تلفن معتبر وارد کنید.",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.phoneNumber
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="09123456789"
                  defaultValue={displayUser.phone_number}
                  dir="rtl"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.phoneNumber.message as string}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ایمیل */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500 font-regular">ایمیل</label>
            <p className="text-base text-gray-900 font-Medium mt-2">
              {displayUser.email || "تکمیل نشده"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoList;
