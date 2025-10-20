"use client";

import React, { ReactNode, useState, useEffect } from "react";
import TabManager from "@/components/base/tab-manager";
import RealContent from "./auth-form/real-content";
import LegalContent from "./auth-form/legal-content";
import HeadContentProfile from "@/components/base/head-content-profile";
import { FormProvider, useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useGetUser } from "../../../hooks";
import { SmallLoading } from "@/components/base/loading/SmallLoading";
import { useUserStore } from "@/stores/useUserStore";
import { toLocalDateString } from "@/utils/toLocalDate";
import { GetUserResponse } from "../../../hooks/type";
import clsxm from "@/utils/clsxm";
import Image from "next/image";
import Link from "next/link";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

const UserInfo = () => {
  const methods = useForm();
  const { user: user_loca } = useUserStore();
  const { data: user, isPending } = useGetUser<GetUserResponse>();

  const [editablePhone, setEditablePhone] = useState("");
  const [editableEmail, setEditableEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const userData = user?.user;
  const authlevel = userData?.auth_level;
  const phone = userData?.phone_number || user_loca?.phone_number || "";
  const email = userData?.email || "";

  useEffect(() => {
    if (user) {
      setEditablePhone(phone);
      setEditableEmail(email);
    }
  }, [user, phone, email]);

  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^09[0-9]{9}$/;
    if (!phoneNumber) return "شماره موبایل ضروری است";
    if (!phoneRegex.test(phoneNumber)) return "شماره موبایل معتبر نیست";
    return "";
  };

  const validateEmail = (emailAddress: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailAddress && !emailRegex.test(emailAddress))
      return "ایمیل معتبر نیست";
    return "";
  };

  const handleSave = async () => {
    const phoneErr = validatePhone(editablePhone);
    const emailErr = validateEmail(editableEmail);

    setPhoneError(phoneErr);
    setEmailError(emailErr);

    if (phoneErr || emailErr) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("اطلاعات با موفقیت ذخیره شد");
      setIsEditing(false);
    } catch (error) {
      toast.error("خطا در ذخیره اطلاعات");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditablePhone(phone);
    setEditableEmail(email);
    setPhoneError("");
    setEmailError("");
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setPhoneError("");
    setEmailError("");
  };

  const tabs: Tab[] = [
    {
      id: "phone",
      label: "کاربر حقیقی",
      content: <RealContent />,
    },
    {
      id: "profile",
      label: "کاربر حقوقی",
      content: <LegalContent />,
    },
  ];

  return (
    <div className="mb-20 bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />

      {isPending ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <SmallLoading />
        </div>
      ) : authlevel === 0 ? (
        <FormProvider {...methods}>
          <TabManager
            tabs={tabs}
            HeadTapClass="flex items-center gap-2"
            backPath="/profile-user"
            isHead={true}
          >
            <h3 className="text-lg">اطلاعات کاربری</h3>
          </TabManager>
        </FormProvider>
      ) : (
        <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
          {/* Simple Header */}
          <div className="relative">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-4 md:p-8 text-white overflow-hidden flex items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Image
                  src="/svg/profile/user-octagon.svg"
                  width={34}
                  height={34}
                  alt="User"
                  className="filter brightness-0 invert"
                />
              </div>
              <div>
                {/* <h1 className="text-2xl font-black mb-2">
                    {userData?.first_name && userData?.last_name
                      ? `${userData.first_name} ${userData.last_name}`
                      : "کاربر گرامی"}
                  </h1> */}
                <p className="text-white text-sm md:text-xl font-black">
                  اطلاعات کاربری شما
                </p>
              </div>
            </div>
          </div>

          {/* Clean Information Grid */}
          <div className="space-y-8">
            {/* Personal & Identity Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6 ">
                <h2 className="text-lg font-black text-gray-900">
                  اطلاعات هویتی
                </h2>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {/* Personal Information */}
                <div>
                  <label className="text-sm text-gray-500 font-regular">
                    نام
                  </label>
                  <p className="text-base text-gray-900 font-Medium mt-1">
                    {userData?.first_name || "تکمیل نشده"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-regular">
                    نام خانوادگی
                  </label>
                  <p className="text-base text-gray-900 font-Medium mt-1">
                    {userData?.last_name || "تکمیل نشده"}
                  </p>
                </div>

                {/* Identity Information */}
                <div>
                  <label className="text-sm text-gray-500 font-regular">
                    کد ملی
                  </label>
                  <p className="text-base text-gray-900 font-Medium mt-1">
                    {userData?.national_id || "تکمیل نشده"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-regular">
                    تاریخ تولد
                  </label>
                  <p className="text-base text-gray-900 font-Medium mt-1">
                    {userData?.birth_date
                      ? toLocalDateString(userData.birth_date)
                      : "تکمیل نشده"}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-gray-900">
                  اطلاعات تماس
                </h2>
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
                  <span className=" text-xs font-Medium ">تاییدشده</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className=" flex flex-col gap-2">
                  <label className="text-sm text-gray-500 font-regular">
                    شماره موبایل
                  </label>
                  {isEditing ? (
                    <div className="mt-2">
                      <input
                        type="tel"
                        className={clsxm(
                          "w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500",
                          phoneError
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 bg-white"
                        )}
                        value={editablePhone}
                        onChange={(e) => {
                          setEditablePhone(e.target.value);
                          if (phoneError) setPhoneError("");
                        }}
                        placeholder="09123456789"
                        dir="ltr"
                      />
                      {phoneError && (
                        <p className="text-xs text-red-600 mt-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p
                      className="text-base text-gray-900 font-Medium mt-2"
                      dir=""
                    >
                      {editablePhone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className=" flex flex-col gap-2">
                  <label className="text-sm text-gray-500 font-regular">
                    ایمیل
                  </label>
                  {isEditing ? (
                    <div className="mt-2">
                      <input
                        type="email"
                        className={clsxm(
                          "w-full px-3 py-2 border rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500",
                          emailError
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300 bg-white"
                        )}
                        value={editableEmail}
                        onChange={(e) => {
                          setEditableEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        placeholder="example@email.com"
                        dir=""
                      />
                      {emailError && (
                        <p className="text-xs text-red-600 mt-1">
                          {emailError}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p
                      className="text-base text-gray-900 font-Medium mt-2"
                      dir=""
                    >
                      {editableEmail || "تکمیل نشده"}
                    </p>
                  )}
                </div>
              </div>

              {/* Status and Action Buttons */}
              {/* <div className="mt-6 pt-6 border-gray-100 border-t text-left">
                {isEditing ? (
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-Medium bg-amber-100 text-amber-700">
                      در حال ویرایش
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-sm font-Medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        لغو
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className={clsxm(
                          "px-4 py-2 text-sm font-Medium rounded-lg transition-colors duration-200",
                          isSubmitting
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        )}
                      >
                        {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/profile-user/support"
                    className="px-4 py-2 text-sm font-Medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-100 transition-colors duration-200"
                  >
                    درخواست ویرایش اطلاعات
                  </Link>
                  // <button
                  //   onClick={handleEdit}
                  //   className="px-4 py-2 text-sm font-Medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors duration-200"
                  // >
                  //   ویرایش
                  // </button>
                )}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
