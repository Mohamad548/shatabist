"use client";

import React, { useCallback, useState } from "react";
import SendOtp from "./send-otp";
import CheckOtp from "./check-otp";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function Login() {
  const [step, setIsStep] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumber = useCallback((value: string) => {
    setPhoneNumber(value);
  }, []);

  const handleStepChange = (nextStep: boolean, stepValue: string) => {
    setIsStep(nextStep);

    const params = new URLSearchParams(searchParams.toString());
    params.set("step", stepValue); // فقط مقدار step را تغییر می‌دهد یا اضافه می‌کند

    router.push(`/login?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-secondary-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full bg-repeat"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23069D6E" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>
      </div>

      {/* Two Column Layout */}
      <div className="flex min-h-screen">
        {/* Left Column - Login Form */}
        <div className="w-full lg:w-1/3 flex items-center justify-center relative z-10 px-4 py-8">
          <div className="w-full max-w-md">
            {step ? (
              <SendOtp
                onStepChange={() => handleStepChange(false, "checkOtp")}
                handlePhoneNumber={handlePhoneNumber}
              />
            ) : (
              <CheckOtp
                onStepChange={() => handleStepChange(true, "sendOtp")}
                phoneNumber={phoneNumber}
              />
            )}
          </div>
        </div>

        {/* Right Column - Cover Image (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-2/3 relative">
          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/30 to-primary-700/40 z-10"></div> */}

          {/* Decorative Elements */}
          {/* <div className="absolute inset-0 z-20">
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div
              className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full opacity-30 blur-lg animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary-300 rounded-full opacity-25 blur-md animate-bounce"
              style={{ animationDelay: "2s" }}
            ></div>
          </div> */}

          {/* Cover Image */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/images/1.jpg"
              alt="شتا - پلتفرم فروش موبایل"
              fill
              className="object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </div>

          {/* Brand Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-12 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            <div className="text-white">
              <h2 className="text-3xl font-Bold mb-4 leading-relaxed">
                به سایت شتا20 خوش آمدید
              </h2>
              <p className="text-lg opacity-90 leading-relaxed">
                بهترین و جدیدترین موبایل‌ها را با بهترین قیمت‌ها از ما بخرید
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
