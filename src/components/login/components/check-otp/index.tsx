"use client";
import Button from "@/components/base/button";
import Input from "@/components/base/input";
import Logo from "@/components/base/logo";
import TimerClient from "@/components/base/timer";
import IconSize from "@/constants/icon-size";
import { PageLevelLocalization } from "@/constants/localization";
import { loginAction, sendOtp } from "@/lib/api/actions/auth";
import { useUserStore } from "@/stores/useUserStore";
import { convertPersianNumbers } from "@/utils/convertPersianNumbers";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const { login } = PageLevelLocalization;

interface CheckOtpProps {
  onStepChange: () => void;
  phoneNumber: string;
}

interface OtpFormData {
  otp: string;
}

function CheckOtp({ onStepChange, phoneNumber }: CheckOtpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OtpFormData>();

  const [expiryTimestamp, setExpiryTimestamp] = useState(
    Date.now() + 1 * 60 * 1000
  );
  const [isExpired, setIsExpired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmit = async (data: { otp: string }) => {
    setIsLoading(true);
    const redirect = searchParams.get("redirect");

    try {
      setErrorMessage("");

      const response = await sendOtp({
        phoneNumber,
        otp: data.otp,
      });

      if (response.success) {
        setCookie("token", response.token, { maxAge: 60 * 60 * 24 * 7 });
        setCookie("refresh_token", response.refresh_token, {
          maxAge: 60 * 60 * 24 * 7,
        });
        const { phone_number, first_name, last_name } = response.user;
        useUserStore.getState().setUser({
          phone_number,
          first_name,
          last_name,
        });

        const redirectTo = redirect ? decodeURIComponent(redirect) : "/";
        router.push(redirectTo);
      } else {
        setErrorMessage("کد وارد شده صحیح نیست. لطفاً مجدداً تلاش کنید.");
      }
    } catch (error: any) {
      setErrorMessage("کد وارد شده صحیح نیست. لطفاً مجدداً تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setErrorMessage("");
    try {
      await loginAction({ phoneNumber });
      setExpiryTimestamp(Date.now() + 1 * 60 * 1000);
      setIsExpired(false);
      reset();
    } catch (error: any) {
      setErrorMessage("خطا در ارسال مجدد کد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-400/20 to-primary-400/20 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onStepChange}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors duration-200 group"
            >
              <Image
                src="/svg/arrow-right.svg"
                alt="arrow-icon"
                width={20}
                height={20}
                className="group-hover:scale-110 transition-transform duration-200"
              />
            </button>
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-10"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/logo/shata-logo.png"
                  alt="logo-shata"
                  className="w-16 h-16 object-contain"
                  width={64}
                  height={64}
                />
              </div>
            </div>
            <div className="w-10"></div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-sm md:text-xl font-Bold text-gray-800 mb-3">
              {login.verificationCode}
            </h1>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              {login.sendMessageCode(phoneNumber)}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <div className="relative">
                <Input
                  nameInput="otp"
                  register={register("otp", {
                    required: "کد تایید الزامی است",
                    setValueAs: (value) => convertPersianNumbers(value),
                    pattern: {
                      value: /^[0-9]{5}$/,
                      message: "کد باید شامل ۵ رقم باشد",
                    },
                  })}
                  placeholder="کد ۵ رقمی"
                  maxLength={5}
                  inputClassName={`w-full px-4 py-2.5 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm md:text-lg text-center font-Bold tracking-wider placeholder-gray-400 ${
                    errors.otp || errorMessage
                      ? "border-red-500 bg-red-50/50"
                      : "border-gray-200"
                  }`}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className={`w-5 h-5 ${
                      errors.otp || errorMessage
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>

              {errors.otp && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-red-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span className="text-red-600 text-sm font-Medium">
                    {errors.otp.message as string}
                  </span>
                </div>
              )}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-red-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <span className="text-red-600 text-sm font-Medium">
                    {errorMessage}
                  </span>
                </div>
              )}
            </div>

            <div className=" rounded-xl p-4 text-center">
              {isResending ? (
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <div className="w-4 h-4 border-2 border-t-primary-500 border-primary-200 rounded-full animate-spin"></div>
                  <span className="font-Medium text-sm">
                    در حال ارسال مجدد...
                  </span>
                </div>
              ) : (
                <TimerClient
                  expiryTimestamp={expiryTimestamp}
                  onExpire={() => setIsExpired(true)}
                  className="flex items-center justify-center gap-2 text-gray-700 text-xs md:text-sm"
                >
                  <svg
                    className="w-4 h-4 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-Medium text-xs md:text-sm">
                    {login.timeRemaining}
                  </span>
                </TimerClient>
              )}
              {isExpired && !isResending && (
                <div className="mt-6 pt-6 border-t border-gray-200 ">
                  <Button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className={`w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-Medium py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 ${
                      isResending ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
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
                    <span className="text-sm md:text-lg">ارسال مجدد کد</span>
                  </Button>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isExpired || isLoading}
              className={`w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-Bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-3 text-sm md:text-lg ${
                isExpired || isLoading
                  ? "opacity-50 cursor-not-allowed scale-100"
                  : ""
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-t-white border-white/30 rounded-full animate-spin"></div>
                  <span>در حال تایید...</span>
                </>
              ) : (
                <span>{login.confirmation}</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckOtp;
