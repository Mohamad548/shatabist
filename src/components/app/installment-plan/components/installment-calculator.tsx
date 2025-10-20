"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { convertPersianNumbers } from "@/utils/convertPersianNumbers";
import { useFormErrorHandler } from "@/utils/useFormErrorHandler";
import { useColorStore } from "@/stores/colorStore";
import Link from "next/link";

interface FormValues {
  cashPrice: string;
  downPayment: string;
  installmentMonths: number;
}

interface CalculationResult {
  remainingAmount: number;
  totalInterest: number;
  totalInstallments: number;
  monthlyInstallment: number;
  finalTotal: number;
}

interface InstallmentCalculatorProps {
  showProductInfo?: boolean;
  installmentStatus?: boolean;
}

const InstallmentCalculator = ({
  showProductInfo = false,
  installmentStatus = false,
}: InstallmentCalculatorProps) => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const { selectedPrice } = useColorStore();

  // Monthly interest rate (configurable)
  const MONTHLY_INTEREST_RATE = 0.033; // 3.3%

  // Month options (1 to 12)
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  // Format number with thousand separators
  const formatNumber = (num: number): string => {
    return num.toLocaleString("fa-IR");
  };

  // React Hook Form setup
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cashPrice:
        showProductInfo && selectedPrice > 0 ? formatNumber(selectedPrice) : "",
      downPayment: "",
      installmentMonths: 6,
    },
  });

  const { formRefs, onError } = useFormErrorHandler();

  // Parse Persian/English numbers to actual number
  const parseInputNumber = (value: string): number => {
    // Convert Persian numbers to English
    const englishValue = convertPersianNumbers(value);
    // Remove all non-digit characters except decimal point
    const cleanValue = englishValue.replace(/[^0-9.]/g, "");
    return parseFloat(cleanValue) || 0;
  };

  // Format input value with thousand separators while typing
  const formatInputValue = (value: string): string => {
    if (!value) return "";
    const numValue = parseInputNumber(value);
    if (isNaN(numValue) || numValue === 0) return "";
    return formatNumber(numValue);
  };

  // Calculate installment - STRICT LOGIC as per requirements
  const onSubmit = (data: FormValues) => {
    const cashPriceNum = parseInputNumber(data.cashPrice);
    const downPaymentNum = parseInputNumber(data.downPayment);
    const months = Number(data.installmentMonths);

    // Step 1: Remaining amount = Cash price - Down payment
    const remainingAmount = cashPriceNum - downPaymentNum;

    // Step 2: Total interest = Remaining amount × (3.3% × number of months)
    const totalInterest = remainingAmount * (MONTHLY_INTEREST_RATE * months);

    // Step 3: Total installments = Remaining amount + Total interest
    const totalInstallments = remainingAmount + totalInterest;

    // Step 4: Monthly installment = Total installments ÷ number of months
    const monthlyInstallment = totalInstallments / months;

    // Step 5: Final total = Down payment + Total installments
    const finalTotal = downPaymentNum + totalInstallments;

    setResult({
      remainingAmount,
      totalInterest,
      totalInstallments,
      monthlyInstallment,
      finalTotal,
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 backdrop-blur-md rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
            <span className="text-emerald-700 text-sm font-Medium">
              محاسبه‌گر هوشمند
            </span>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-800 mb-4">
            محاسبه‌گر اقساط
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            با تعیین مبلغ کالای درخواستی، مقدار پیش‌پرداخت و تعداد اقساط، مبلغ
            هر قسط و مبلغ تمام‌شدهٔ کالا را می‌توانید مشاهده نمایید.
          </p>
        </div>

        {/* Credit Validation Status Box - Only visible on Product page */}
        {showProductInfo && (
          <div className="mb-8 mx-auto w-full">
            <div
              className={`rounded-xl md:rounded-2xl shadow-lg border-2 p-4 md:p-6 ${
                installmentStatus
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-orange-50 border-orange-200"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                {/* <div
                  className={`hidden md:block w-10 h-10 md:w-12 md:h-12 rounded-lg items-center justify-center flex-shrink-0 ${
                    installmentStatus ? "bg-primary-100" : "bg-orange-100"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      installmentStatus ? "text-primary-500" : "text-orange-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {installmentStatus ? (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </div> */}
                <div className="flex md:flex-row flex-col w-full justify-between">
                  <div className="flex flex-col gap-2 ">
                    <h3
                      className={`text-base md:text-lg font-black ${
                        installmentStatus
                          ? "text-emerald-700"
                          : "text-orange-700"
                      }`}
                    >
                      {installmentStatus
                        ? "اعتبار سنجی شده"
                        : "اعتبار سنجی نشده"}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 font-Medium leading-relaxed">
                      {installmentStatus
                        ? "شما می‌توانید از امکان خرید اقساطی استفاده کنید."
                        : "برای استفاده از خرید اقساطی، ابتدا اعتبار سنجی خود را تکمیل کنید."}
                    </p>
                  </div>
                </div>
                {!installmentStatus && (
                  <Link
                    href="/profile-user/installment"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-xs md:text-sm font-Bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                  >
                    <span>شروع اعتبار سنجی</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 lg:p-8 border border-gray-100">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-4 md:space-y-6"
            >
              {/* Cash Price Input */}
              <div
                ref={(el) => {
                  formRefs.current.cashPrice = el;
                }}
              >
                <label className="block text-right mb-2 md:mb-3">
                  <span className="text-gray-700 font-Bold text-sm md:text-base lg:text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      مبلغ کل خرید
                      <strong className="text-red-500">*</strong>
                    </div>
                    {showProductInfo && selectedPrice > 0 && (
                      <span className="text-xs md:text-sm font-Medium text-emerald-600 bg-emerald-50 px-2 md:px-3 py-1 rounded-full flex items-center gap-1">
                        <svg
                          className="w-3 h-3 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        محصول انتخابی
                      </span>
                    )}
                  </span>
                </label>
                <div className="relative">
                  <Controller
                    name="cashPrice"
                    control={control}
                    rules={{
                      required: "لطفاً مبلغ کل خرید را وارد کنید",
                      validate: (value) => {
                        const num = parseInputNumber(value);
                        if (num <= 0) return "مبلغ باید بیشتر از صفر باشد";
                        return true;
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="text"
                        placeholder="مبلغ را وارد کنید"
                        className="w-full px-4 md:px-5 lg:px-6 py-3 md:py-3.5 lg:py-4 text-right border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all duration-300 font-Medium text-sm md:text-base lg:text-lg"
                        value={value}
                        onChange={(e) => {
                          const formatted = formatInputValue(e.target.value);
                          onChange(formatted);
                        }}
                      />
                    )}
                  />
                  <span className="absolute left-3 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 bg-emerald-500 text-white px-2 md:px-2.5 lg:px-3 py-0.5 md:py-1 rounded-md md:rounded-lg text-xs md:text-sm font-Bold">
                    تومان
                  </span>
                </div>
                {errors.cashPrice && (
                  <p className="text-red-500 text-xs md:text-sm mt-2 text-right">
                    {errors.cashPrice.message}
                  </p>
                )}
              </div>

              {/* Down Payment Input */}
              <div
                ref={(el) => {
                  formRefs.current.downPayment = el;
                }}
              >
                <label className="block text-right mb-2 md:mb-3">
                  <span className="text-gray-700 font-Bold text-sm md:text-base lg:text-lg flex items-center justify-start gap-2">
                    پیش‌پرداخت
                    <strong className="text-red-500">*</strong>
                    {/* <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg> */}
                  </span>
                </label>
                <div className="relative">
                  <Controller
                    name="downPayment"
                    control={control}
                    rules={{
                      required: "لطفاً مبلغ پیش‌پرداخت را وارد کنید",
                      validate: (value, formValues) => {
                        const downPaymentNum = parseInputNumber(value);
                        const cashPriceNum = parseInputNumber(
                          formValues.cashPrice
                        );

                        if (downPaymentNum < 0)
                          return "مبلغ نمی‌تواند منفی باشد";
                        if (downPaymentNum > cashPriceNum) {
                          return "پیش‌پرداخت نمی‌تواند بیشتر از مبلغ کل باشد";
                        }
                        return true;
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="text"
                        placeholder="مبلغ پیش‌پرداخت"
                        className="w-full px-4 md:px-5 lg:px-6 py-3 md:py-3.5 lg:py-4 text-right border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all duration-300 font-Medium text-sm md:text-base lg:text-lg"
                        value={value}
                        onChange={(e) => {
                          const formatted = formatInputValue(e.target.value);
                          onChange(formatted);
                        }}
                      />
                    )}
                  />
                  <span className="absolute left-3 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 bg-emerald-500 text-white px-2 md:px-2.5 lg:px-3 py-0.5 md:py-1 rounded-md md:rounded-lg text-xs md:text-sm font-Bold">
                    تومان
                  </span>
                </div>
                {errors.downPayment && (
                  <p className="text-red-500 text-xs md:text-sm mt-2 text-right">
                    {errors.downPayment.message}
                  </p>
                )}
              </div>

              {/* Installment Months Select */}
              <div
                ref={(el) => {
                  formRefs.current.installmentMonths = el;
                }}
              >
                <label className="block text-right mb-2 md:mb-3">
                  <span className="text-gray-700 font-Bold text-sm md:text-base lg:text-lg flex items-center justify-start gap-2">
                    تعداد اقساط
                    {/* <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg> */}
                  </span>
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 md:px-5 lg:px-6 py-3 md:py-3.5 lg:py-4 text-right border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all duration-300 font-Medium text-sm md:text-base lg:text-lg appearance-none cursor-pointer"
                    {...register("installmentMonths", {
                      required: "لطفاً تعداد اقساط را انتخاب کنید",
                    })}
                  >
                    {monthOptions.map((month) => (
                      <option key={month} value={month}>
                        {formatNumber(month)} ماه
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute left-3 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {errors.installmentMonths && (
                  <p className="text-red-500 text-xs md:text-sm mt-2 text-right">
                    {errors.installmentMonths.message}
                  </p>
                )}
              </div>

              {/* Calculate Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-Bold py-3 md:py-3.5 lg:py-4 px-6 md:px-7 lg:px-8 rounded-lg md:rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base lg:text-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  محاسبه اقساط
                  {/* <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg> */}
                </span>
              </button>
            </form>
          </div>

          {/* Results Display */}
          <div className="space-y-4">
            {/* Result Cards */}
            {result ? (
              <>
                {/* Monthly Installment - Highlighted */}

                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-2xl text-white">
                  <div className="flex items-center justify-between">
                    <div className=" flex flex-col justify-center gap-5">
                      <h4 className="text-base md:text-lg lg:text-xl font-Bold">
                        مبلغ هر قسط:
                      </h4>
                      <p className="text-2xl md:text-3xl lg:text-4xl font-black flex items-center gap-3">
                        {formatNumber(Math.round(result.monthlyInstallment))}
                        <span className="text-white/80 text-xs md:text-sm">
                          تومانء
                        </span>
                      </p>
                    </div>
                    <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Other Results */}
                <div className="grid gap-3 md:gap-4">
                  {/* Remaining Amount */}
                  {/* <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="text-right flex-1">
                        <h4 className="text-gray-600 font-Medium mb-1.5 md:mb-2 text-xs md:text-sm lg:text-base">
                          مبلغ باقیمانده:
                        </h4>
                        <p className="text-lg md:text-xl lg:text-2xl font-black text-gray-800">
                          {formatNumber(Math.round(result.remainingAmount))}
                          <span className="text-xs md:text-sm font-Medium text-gray-500 mr-2">
                            تومان
                          </span>
                        </p>
                      </div>
                      <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg md:rounded-xl flex items-center justify-center">
                        <svg
                          className="w-5 h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 text-amber-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div> */}

                  {/* Total Interest */}
                  {/* <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="text-right flex-1">
                        <h4 className="text-gray-600 font-Medium mb-1.5 md:mb-2 text-xs md:text-sm lg:text-base">
                          مجموع سود:
                        </h4>
                        <p className="text-lg md:text-xl lg:text-2xl font-black text-gray-800">
                          {formatNumber(Math.round(result.totalInterest))}
                          <span className="text-xs md:text-sm font-Medium text-gray-500 mr-2">
                            تومان
                          </span>
                        </p>
                      </div>
                      <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg md:rounded-xl flex items-center justify-center">
                        <svg
                          className="w-5 h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                    </div>
                  </div> */}

                  {/* Total Installments */}
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="text-right flex-1">
                        <h4 className="text-gray-600 font-Medium mb-1.5 md:mb-2 text-xs md:text-sm lg:text-base">
                          مجموع اقساط:
                        </h4>
                        <p className="text-lg md:text-xl lg:text-2xl font-black text-gray-800">
                          {formatNumber(Math.round(result.totalInstallments))}
                          <span className="text-xs md:text-sm font-Medium text-gray-500 mr-2">
                            تومان
                          </span>
                        </p>
                      </div>
                      <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg md:rounded-xl flex items-center justify-center">
                        <svg
                          className="w-5 h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 text-teal-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Final Total */}
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="text-right flex-1">
                        <h4 className="text-gray-600 font-Medium mb-1.5 md:mb-2 text-xs md:text-sm lg:text-base">
                          مبلغ تمام‌شده کالا:
                        </h4>
                        <p className="text-lg md:text-xl lg:text-2xl font-black text-gray-800">
                          {formatNumber(Math.round(result.finalTotal))}
                          <span className="text-xs md:text-sm font-Medium text-gray-500 mr-2">
                            تومان
                          </span>
                        </p>
                      </div>
                      <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg md:rounded-xl flex items-center justify-center">
                        <svg
                          className="w-5 h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                {/* <div className="bg-emerald-50 border border-emerald-200 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-1">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-right flex-1">
                      <p className="text-emerald-800 text-xs md:text-sm leading-relaxed font-Medium">
                        نرخ سود ماهانه: <span className="font-Bold">٣.٣٪</span>
                      </p>
                    </div>
                  </div>
                </div> */}
              </>
            ) : (
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl md:rounded-3xl p-8 md:p-10 lg:p-12 text-center">
                <div className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <svg
                    className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-Bold text-gray-600 mb-1.5 md:mb-2">
                  نتایج محاسبه
                </h3>
                <p className="text-gray-500 text-xs md:text-sm">
                  پس از وارد کردن اطلاعات و محاسبه، نتایج در اینجا نمایش داده
                  می‌شود
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallmentCalculator;
