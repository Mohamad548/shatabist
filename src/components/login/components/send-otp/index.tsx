import Button from "@/components/base/button";
import Input from "@/components/base/input";
import Logo from "@/components/base/logo";
import { PageLevelLocalization } from "@/constants/localization";
import { loginAction } from "@/lib/api/actions/auth";
import { convertPersianNumbers } from "@/utils/convertPersianNumbers";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

const { login } = PageLevelLocalization;

interface SendOtpProps {
  onStepChange: () => void;
  handlePhoneNumber: (value: string) => void;
}

export function Spinner() {
  return (
    <div className="w-5 h-5 border-3 border-t-white border-white/30 rounded-full animate-spin"></div>
  );
}

function SendOtp({ onStepChange, handlePhoneNumber }: SendOtpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    const normalizedPhoneNumber = convertPersianNumbers(data.phoneNumber);

    try {
      await loginAction({ ...data, phoneNumber: normalizedPhoneNumber });
      handlePhoneNumber(normalizedPhoneNumber);
      onStepChange();
      reset();
    } catch (error: any) {
      setErrorMessage(
        error.message || "خطا در ارسال اطلاعات. لطفاً دوباره تلاش کنید."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card Container */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-400/20 to-primary-400/20 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 relative">
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
            <h1 className="text-sm md:text-xl font-Bold text-gray-800 mb-2">
              خوش آمدید
            </h1>
            <p className="text-gray-600 text-sm">
              برای ورود شماره موبایل خود را وارد کنید
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone Number Input */}
            <div className="space-y-2">
              <label className="block text-xs md:text-sm font-Medium text-gray-700 mb-2">
                {login.enterNumber}
              </label>
              <div className="relative">
                <Input
                  parentClassName="relative"
                  inputClassName={`w-full px-12 py-2.5 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm md:text-lg text-center placeholder-gray-400 ${
                    errors.phoneNumber || errorMessage
                      ? "border-red-500 bg-red-50/50"
                      : "border-gray-200"
                  }`}
                  placeholder="09xxxxxxxxx"
                  register={register("phoneNumber", {
                    required: "شماره تلفن الزامی است",
                    validate: (value) => {
                      const normalized = convertPersianNumbers(value);
                      const regex = /^(09)[0-9]{8,9}$/;
                      return (
                        regex.test(normalized) ||
                        "لطفاً شماره موبایل خود را وارد کنید"
                      );
                    },
                  })}
                />
                {/* Phone Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className={`w-5 h-5 ${errors.phoneNumber || errorMessage ? "text-red-400" : "text-gray-400"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Messages */}
              {errors.phoneNumber && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                  {/* <svg
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
                  </svg> */}
                  <span className="text-red-600 text-sm font-Medium">
                    {errors.phoneNumber.message as string}
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

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-Bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-3 text-lg ${
                isLoading ? "opacity-70 cursor-not-allowed scale-100" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span className="text-xs md:text-base">در حال ارسال...</span>
                </>
              ) : (
                <>
                  <span className="text-sm md:text-lg">{login.signIn}</span>
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
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg> */}
                </>
              )}
            </Button>

            {/* Terms & Conditions */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {login.acceptingRules.accept}
                <span className=" text-primary-600 font-Bold hover:text-primary-700 cursor-pointer transition-colors">
                  {login.acceptingRules.rules}
                </span>
                <span className="">{login.acceptingRules.verb}</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendOtp;
