"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import ManageModal, { ManageModalRef } from "@/components/base/modal";
import Button from "@/components/base/button";
import Input from "@/components/base/input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "react-hot-toast";
import { SmallLoading } from "@/components/base/loading/SmallLoading";
import {
  useNationalInquiry,
  useNationalVerification,
  NationalInquiryResponse,
} from "@/components/app/profile-user/hooks";
import { useUserStore } from "@/stores/useUserStore";

interface AuthRequiredModalProps {
  onNavigateToAuth: () => void;
  onAuthSuccess?: () => void;
}

export const AuthRequiredModal = React.forwardRef<
  ManageModalRef,
  AuthRequiredModalProps
>(({ onNavigateToAuth, onAuthSuccess }, ref) => {
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [nationalId, setNationalId] = useState("");
  const [birthDate, setBirthDate] = useState<any>(null);
  const [modalData, setModalData] = useState<NationalInquiryResponse>();
  const confirmationModalRef = useRef<ManageModalRef>(null);

  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const { mutate: inquireNational, isPending: isInquiring } =
    useNationalInquiry({
      onSuccess: (data: NationalInquiryResponse) => {
        toast.success("استعلام با موفقیت انجام شد ✅");
        setModalData(data);
        setStep("confirmation");
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ?? error?.response?.data?.error;
        if (message === "تاریخ تولد نامعتبر است" || message === "موفق") {
          toast.error("تاریخ تولد نامعتبر است. لطفاً تاریخ صحیح را وارد کنید.");
        } else if (message === "کد ملی نامعتبر است") {
          toast.error("کد ملی نامعتبر است. لطفاً کد صحیح را وارد کنید.");
        } else if (message === "user already has profile") {
          toast.error("کاربر قبلاً پروفایل ثبت کرده است ⚠️");
        } else {
          toast.error("خطا در ثبت تایید. لطفاً دوباره تلاش کنید ❌");
        }
      },
    });

  const { mutate: verifyNational, isPending: isVerifying } =
    useNationalVerification({
      onSuccess: (data) => {
        if (!modalData) {
          toast.error("داده‌ای برای ثبت وجود ندارد!");
          return;
        }

        setUser({
          ...user,
          first_name: modalData.first_name,
          last_name: modalData.last_name,
        });

        toast.success("اطلاعات تایید و ثبت شد 🎉");

        // Close the modal and trigger success callback
        if (ref && "current" in ref) {
          ref.current?.closeModal();
        }

        // Call success callback to proceed with checkout
        if (onAuthSuccess) {
          onAuthSuccess();
        }
      },
      onError: () => {
        toast.error("خطا در ثبت تایید. لطفاً دوباره تلاش کنید ❌");
      },
    });

  const handleSubmit = () => {
    if (!nationalId || !birthDate) {
      toast.error("لطفاً همه فیلدها را تکمیل کنید");
      return;
    }

    const rawDate = birthDate.format("YYYY/MM/DD");

    const convertToEnglishDigits = (str: string): string => {
      const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
      return str.replace(/[۰-۹]/g, (w) => persianDigits.indexOf(w).toString());
    };

    const englishDate = convertToEnglishDigits(rawDate);
    const englishNationalId = convertToEnglishDigits(nationalId);

    inquireNational({
      national_id: englishNationalId,
      birth_date: englishDate,
    });
  };

  const handleConfirm = () => {
    if (modalData?.verification_token) {
      verifyNational({ verification_token: modalData.verification_token });
    } else {
      toast.error("توکن تایید وجود ندارد!");
    }
  };

  const handleReject = () => {
    setStep("form");
    setModalData(undefined);
    toast("استعلام توسط شما رد شد ❗");
  };

  const handleClose = () => {
    setStep("form");
    setNationalId("");
    setBirthDate(null);
    setModalData(undefined);
  };

  if (step === "confirmation") {
    return (
      <ManageModal
        ref={ref}
        triggerContent={null}
        className="fixed inset-0 z-50"
        actionLabel={isVerifying ? "" : "تایید"}
        actionBtnClass="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow transition"
        cancelLabel="رد کردن"
        cancelBtnClass="bg-gray-200 hover:bg-red-500 text-gray-700 hover:text-white  py-3 px-6 rounded-lg border border-gray-300 transition absolute right-4 bottom-7 text-sm"
        modalBodyClass="max-w-lg mx-4 bg-white rounded-3xl shadow-2xl p-6 overflow-hidden relative"
        actionBoxClass="flex gap-4 justify-end mt-6"
        onConfirm={handleConfirm}
        onCancel={handleReject}
        onClose={handleClose}
        activeOverlay={false}
      >
        {modalData && (
          <div className="space-y-5">
            {/* Simple Header */}
            <div className="text-center pb-4 border-b border-gray-100">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-Bold text-gray-800">
                  تایید اطلاعات
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                لطفاً صحت اطلاعات زیر را بررسی کنید
              </p>
            </div>

            {/* Clean Information List */}
            <div className="space-y-3">
              {[
                { label: "نام", value: modalData.first_name },
                { label: "نام خانوادگی", value: modalData.last_name },
                { label: "تاریخ تولد", value: modalData.birth_date },
                { label: "کد ملی", value: modalData.national_id },
                { label: "نام پدر", value: modalData.father_name },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-emerald-200 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-600">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-Bold text-gray-800">
                      {item.value}
                    </span>
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simple Security Note */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200/50 shadow-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  اطلاعات محفوظ و رمزنگاری شده
                </span>
              </div>
            </div>

            {/* Loading State with Enhanced Animation */}
            {isVerifying && (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="relative">
                  {/* Primary Loading Ring */}
                  <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
                  {/* Secondary Loading Ring */}
                  <div
                    className="absolute inset-2 w-8 h-8 border-4 border-secondary-200 border-t-secondary-500 rounded-full animate-spin"
                    style={{
                      animationDirection: "reverse",
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
                <div className="text-center">
                  <p className="text-emerald-600 font-medium text-sm animate-pulse">
                    در حال تایید اطلاعات...
                  </p>
                  <p className="text-gray-500 text-xs mt-1">لطفاً صبر کنید</p>
                </div>
              </div>
            )}
          </div>
        )}
      </ManageModal>
    );
  }

  return (
    <ManageModal
      ref={ref}
      triggerContent={null}
      className="fixed inset-0 z-50"
      actionLabel={isInquiring ? "" : "استعلام هویت"}
      actionBtnClass="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-Bold py-4 px-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full "
      cancelLabel={
        <div className="absolute left-4 top-4 cursor-pointer group z-50">
          <div className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110">
            <Image
              src="/svg/profile/close-circle.svg"
              alt="بستن"
              width={20}
              height={20}
              className="transition-transform duration-200"
            />
          </div>
        </div>
      }
      cancelBtnClass=""
      modalBodyClass="max-w-lg mx-4 bg-white rounded-3xl shadow-2xl p-0 overflow-hidden relative"
      actionBoxClass="px-8 pb-8"
      cancelBoxClass=""
      fadeIn="animate-fadeIn"
      fadeOut="animate-slideDown"
      activeOverlay={true}
      onConfirm={handleSubmit}
      onClose={handleClose}
    >
      <div className="relative">
        {/* Main Content */}
        <div className="relative z-10 pt-12 pb-8">
          {/* Unique Icon Design */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Outer Ring */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  {/* Inner Icon */}
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shadow-inner">
                    <Image
                      src="/svg/profile/user-octagon.svg"
                      alt="احراز هویت"
                      width={24}
                      height={24}
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Creative Title Section */}
          <div className="text-center mb-8 px-8">
            <div className="relative inline-block">
              <h3 className="text-xl font-Bold text-gray-800 mb-3 relative z-10 ">
                🔐 احراز هویت الزامی
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4 text-sm">
              برای تکمیل خرید ایمن، لطفاً اطلاعات زیر را وارد کنید
            </p>
          </div>

          {/* Authentication Form */}
          <div className="px-8 mb-8 space-y-6">
            <Input
              id="nationalId"
              label="کد ملی"
              classNameLabel="text-sm font-medium text-gray-700"
              type="text"
              parentClassName="flex flex-col-reverse gap-2"
              inputClassName="border rounded-md py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              max={10}
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="کد ملی خود را وارد کنید"
            />

            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">
                تاریخ تولد
              </span>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                inputClass="py-2 px-3 rounded-lg w-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                containerStyle={{ width: "100%" }}
                value={birthDate}
                onChange={setBirthDate}
                placeholder="تاریخ تولد خود را انتخاب کنید"
                portal
                zIndex={9999}
                calendarPosition="bottom-center"
              />
            </div>
          </div>

          {/* Alternative Option */}
          <div className="px-8 mb-6">
            <div className="text-center">
              <button
                onClick={onNavigateToAuth}
                className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                یا در صفحه پروفایل کاربری احراز هویت کنید
              </button>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 px-8 ">
            <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center"></div>
            <span className="font-Bold">
              اطلاعات شما کاملاً محفوظ و رمزنگاری شده است
            </span>
          </div>

          {/* Loading Indicator */}
          {isInquiring && (
            <div className="flex justify-center mb-4">
              <SmallLoading />
            </div>
          )}
        </div>
      </div>
    </ManageModal>
  );
});

AuthRequiredModal.displayName = "AuthRequiredModal";
