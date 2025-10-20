"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Button from "@/components/base/button";
import Accordion from "@/components/base/accordion";
import InstallmentCalculator from "./installment-calculator";

// Glitch Text Effect

// Hero Section - Ultra Compact & Artistic
const HeroSection = ({
  onCalculatorClick,
}: {
  onCalculatorClick: () => void;
}) => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-around w-full bg-[url(/images/installment/bg-wave-desktop.svg)] bg-cover overflow-hidden p-5 ">
      {/* Dynamic Morphing Background */}
      <div className="text-right flex flex-col gap-8 order-2 lg:order-1 mx-5 items-start">
        <div className="flex items-center gap-2 bg-white border border-gray-200 backdrop-blur-md rounded-full px-4 py-2 mb-4 w-fit">
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
          <span className="text-black text-sm font-Medium">
            خرید اعتباری هوشمند
          </span>
        </div>

        <h2 className="text-xl md:text-3xl font-black text-black leading-tight">
          خرید اقساطی موبایل، ساده‌تر از همیشه!
        </h2>

        <p className="text-xs md:text-lg text-black !leading-9 max-w-md">
          بدون دردسر و شاخ غول شکاندن، سریع، آسان و شفاف بدون ضمانت شخص دیگری و
          تنها با چک صیادی خود، کاملا واقعی
        </p>

        <div className="flex items-center gap-5">
          <Button className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-gray-900 px-6 py-3 rounded-xl font-Bold hover:shadow-lg transition-all duration-300 overflow-hidden relative whitespace-nowrap">
            <span className="relative z-10 flex items-center gap-2 text-[12px] md:text-sm text-white ">
              درخواست خرید اقساطی
              {/* <span className="group-hover:rotate-12 transition-transform duration-300">
                  ⚡
                </span> */}
            </span>
            {/* <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
          </Button>
          <Button
            onClick={onCalculatorClick}
            className="group  bg-white border border-gray-200 text-gray-900 px-6 py-3 rounded-xl font-Bold hover:shadow-md transition-all duration-300 overflow-hidden relative whitespace-nowrap"
          >
            <span className="relative z-10 flex items-center gap-2 text-[12px] md:text-sm text-black">
              محاسبه‌گر اقساط
              {/* <span className="group-hover:rotate-12 transition-transform duration-300">
                  ⚡
                </span> */}
            </span>
            {/* <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
          </Button>
        </div>
      </div>

      {/* Image - Right Half */}
      <div className="relative order-1 lg:order-2 group mx-5">
        <div
          className=""
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          <Image
            src="/images/installment/installment-mobile-landing.svg"
            alt="شتا20"
            width={800}
            height={800}
            className="drop-shadow-2xl rounded-3xl p-0 md:p-12"
            priority
          />
        </div>
      </div>

      {/* Floating Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }
      `}</style>
    </section>
  );
};

// Process Steps - Mobile Loan Process Design
const ProcessStepsSection = () => {
  const steps = [
    {
      title: "ثبت نام و درخواست اعتبار",
      description:
        "برای دریافت وام خرید قسطی که نیاز به شماره موبایلتان برای ثبت‌نام کنید و اطلاعات هویتی خود را وارد کنید و مبلغ اعتبار درخواستی خود را ثبت کنید.",
      image: "/images/installment/finger.jpg", // Placeholder - you can replace
    },
    {
      title: "اعتبارسنجی بانکی",
      description:
        "مانند تمام وام‌های اعتباری آنلاین، در این مرحله خویش حساب شما در سیستم بانک بررسی می‌شود",
      image: "/images/installment/proc.jpg", // Placeholder - you can replace
    },
    {
      title: "بارگذاری و تکمیل مدارک",
      description:
        "پس از اعتبارسنجی، لازم است مدارک مورد نیاز استفاده به شرح اضافه می‌شود و مدرک نسخه‌ی فیزیکی چک صیادی باشد، تکمیل، بارگذاری و ارسال کنید.",
      image: "/images/installment/cart.jpg", // Placeholder - you can replace
    },
    {
      title: "بارگذاری و تکمیل مدارک",
      description:
        "پس از اعتبارسنجی، لازم است مدارک مورد نیاز استفاده به شرح اضافه می‌شود و مدرک نسخه‌ی فیزیکی چک صیادی باشد، تکمیل، بارگذاری و ارسال کنید.",
      image: "/images/installment/tick.jpg", // Placeholder - you can replace
    },
  ];

  return (
    <section className="py-16">
      <div className="flex flex-col gap-5 items-center justify-center mx-auto px-4">
        <div className="text-center ">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 mb-4">
            مراحل دریافت وام خرید موبایل
          </h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="group">
              {/* Desktop Layout */}
              <div className="hidden lg:block">
                <div
                  className={`grid grid-cols-12 gap-8 items-center ${index % 2 === 1 ? "direction-rtl" : ""}`}
                >
                  {/* Image Side */}
                  <div
                    className={`col-span-5 ${index % 2 === 1 ? "order-2" : ""}`}
                  >
                    <div className="relative">
                      {/* Main Image Container */}
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-4">
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={48}
                            height={48}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div
                    className={`col-span-7 ${index % 2 === 1 ? "order-1" : ""}`}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 text-right">
                      <h3 className="text-xl lg:text-2xl font-Bold text-gray-800 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile & Tablet Layout */}
              <div className="block lg:hidden">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start gap-4 text-right">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-Bold text-gray-800 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Installment Steps - TechnoLife Loan Process
const InstallmentStepsSection = () => {
  const steps = [
    {
      number: 1,
      title: "درخواست وام",
      description:
        "بدون نیاز به ضمانت شخص دیگری و فقط با یک برگه چک صیادی خود.",
      image: "/images/installment/step.svg", // Placeholder - you can replace
      cardType: "فقط با یک برگه چک",
    },
    {
      number: 2,
      title: "اعتبارسنجی",
      description:
        "سریع و بدون پیچیدگی خاصی، فقط کافیه اعتبارسنجیِ بانکی بشی تا سقف خریدت مشخص بشه!",
      image: "/images/installment/time.svg", // Placeholder - you can replace
      cardType: "سریع‌ و آسان",
    },
    {
      number: 3,
      title: "چک صیادی",
      description:
        "امکان انتخاب پیش‌پرداخت حداقل و تعداد اقساط از یک تا ۱۲ ماه.",
      image: "/images/installment/paypal.svg", // Placeholder - you can replace
      cardType: "حتی بدون پیش‌پرداخت",
    },
    {
      number: 4,
      title: "اعتبار",
      description:
        "بدون نیاز به پرداخت مبالغ غیرمنطقی برای زیرساخت یا خرید اشتراک.",
      image: "/images/installment/vip.svg", // Placeholder - you can replace
      cardType: "بدون هزینهٔ زیرساخت",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="flex flex-col gap-5 items-center justify-center mx-auto px-4">
        {/* <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 mb-4">
            مراحل دریافت وام از شتا20
          </h2>
        </div> */}

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Main Card Container */}
              <div className="relative flex flex-col bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 h-64 overflow-hidden hover:shadow-md transition-all duration-500">
                {/* Background Pattern */}
                {/* <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600" />
                </div> */}

                {/* White Card Overlay */}
                <div className="relative z-10 bg-white rounded-xl p-4 h-32 mb-4 flex items-center justify-center">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Step Number Badge */}
                {/* <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg z-20">
                  <span className="text-white font-black text-lg">
                    {step.number}
                  </span>
                </div> */}

                {/* Card Type Label */}
                <div className="flex bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-teal-600 font-Bold text-sm">
                    {step.cardType}
                  </span>
                </div>
                {/* Description */}
                <div className="mt-4 text-right">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden space-y-6 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="flex items-start gap-4 text-right">
                  {/* Image Container */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain filter brightness-0 invert"
                      />
                    </div>
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-black text-xs">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-Bold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Video Tutorial Section - With Video Tag & Bottom Tabs
const VideoTutorialSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const tutorialSteps = [
    {
      title: "ورود به سایت",
      time: "0:00",
      description: "وارد سایت شتا20 شوید و حساب کاربری خود را ایجاد کنید",
    },
    {
      title: "انتخاب محصول",
      time: "0:30",
      description: "محصول مورد نظر را از فهرست محصولات انتخاب کنید",
    },
    {
      title: "گزینه اقساط",
      time: "1:00",
      description: "روی گزینه خرید اقساطی کلیک کرده و شرایط را بررسی کنید",
    },
    {
      title: "تکمیل خرید",
      time: "1:30",
      description: "اطلاعات خود را تکمیل کرده و فرآیند پرداخت را انجام دهید",
    },
  ];

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrentStep((prev) => (prev + 1) % tutorialSteps.length);
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }, [tutorialSteps.length]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="flex flex-col gap-5 items-center justify-center mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2 mb-4 border border-emerald-200">
            <svg
              className="w-4 h-4 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            <span className="text-emerald-600 font-Medium text-sm">
              آموزش ویدیویی
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 mb-4">
            راهنمای خرید اقساطی
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            با تماشای این ویدیو آموزشی، نحوه خرید اقساطی از سایت شتا20 را به
            سادگی یاد بگیرید
          </p>
        </div>

        <div className=" w-full flex flex-col lg:flex-row items-center justify-center gap-5">
          {/* Tutorial Steps Tabs - Below Video */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-black text-gray-800 text-center mb-6">
              راهنمای خرید
            </h3>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-6 overflow-x-auto">
              <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border border-gray-200 min-w-max">
                {tutorialSteps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-Medium transition-all duration-300 whitespace-nowrap ${
                      currentStep === index
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="relative z-10">مرحله {index + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Step Content */}
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {/* <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-Bold">
                      {currentStep + 1}
                    </span>
                  </div> */}
                  <div className="text-center">
                    <h4 className="text-lg font-Bold text-gray-800">
                      {tutorialSteps[currentStep]?.title}
                    </h4>
                    <span className="text-sm text-emerald-600">
                      {tutorialSteps[currentStep]?.time}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-center">
                  {tutorialSteps[currentStep]?.description}
                </p>
              </div>
            </div>

            {/* Action Button */}
            {/* <div className="text-center mt-8">
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-Bold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105">
                شروع خرید اقساطی
              </button>
            </div> */}
          </div>
          {/* Video Player */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl mb-8">
            <div className="relative">
              <video
                ref={videoRef}
                className="aspect-video object-cover"
                poster="/images/installment/video-poster.jpg"
                controls={false}
                width={500}
                height={500}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedMetadata={() => {
                  // Video loaded
                }}
              >
                <source
                  src="/videos/installment-tutorial.mp4"
                  type="video/mp4"
                />
                <source
                  src="/videos/installment-tutorial.webm"
                  type="video/webm"
                />
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>

              {/* Custom Play Button Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <button onClick={handlePlayPause} className="group relative">
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                      <svg
                        className="w-8 h-8 text-emerald-500 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping"></div>
                  </button>
                </div>
              )}

              {/* Video Info */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-white text-sm font-Medium">
                  مدت زمان: ۲:۳۰
                </span>
              </div>

              {/* Custom Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePlayPause}
                    className="text-white hover:text-emerald-300 transition-colors"
                  >
                    {isPlaying ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zM14 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                    )}
                  </button>

                  <div className="flex-1 bg-white/20 rounded-full h-1 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStep + 1) * 25}%` }}
                    />
                  </div>

                  <span className="text-white text-sm font-Medium">
                    {tutorialSteps[currentStep]?.time || "0:00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Credit Amount - Spectacular & Compact
const CreditAmountSection = () => {
  return (
    <section className="py-16 bg-[url(/images/installment/installment-plan.png)] bg-cover relative overflow-hidden">
      <div className="flex flex-col gap-5 items-center justify-center mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
          <span className="text-white/90 font-Medium">
            درخواست اعتبار اقساطی
          </span>
        </div>

        {/* 3D Animated Numbers */}
        <div className="relative mb-8">
          <div className="text-6xl lg:text-8xl font-black text-white tracking-wider flex justify-center items-center gap-1">
            {["0", "0", "0", ",", "0", "0", "0", ",", "0", "0", "2"].map(
              (char, i) => (
                <span
                  key={i}
                  className="inline-block hover:scale-110 transition-all duration-300 cursor-pointer bg-white text-emerald-600"
                  style={{
                    animation: `bounce 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {char}
                </span>
              )
            )}
          </div>

          {/* Glow Effect */}
          {/* <div className="absolute inset-0 text-6xl lg:text-8xl font-black text-blue-300/30 blur-lg">
            200,000,000
          </div> */}
        </div>

        <div className="flex flex-col items-center">
          <p className="text-xl lg:text-2xl text-white font-regular mb-2">
            تا سقف
            <span className=" font-black"> 2۰۰ میلیون تومان </span>
          </p>
          <p className="text-white/80 text-sm"> اعتبار خرید کالا </p>
        </div>
      </div>
    </section>
  );
};

// Mobile Process - Futuristic & Compact
const MobileProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0); // Start with step 3 active (index 2)

  const steps = [
    {
      number: "۱",
      title: "ثبت نام",
      description: "ایجاد حساب کاربری و ورود اطلاعات اولیه",
      detail: "برای شروع فرآیند، ابتدا باید حساب کاربری خود را ایجاد کنید.",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      activeBg: "bg-gray-100",
      activeBorder: "border-gray-400",
      iconBg: "bg-emerald-500",
      image: "/images/installment/signin.svg",
    },
    {
      number: "۲",
      title: "انتخاب محصول",
      description: "جستجو و انتخاب محصول مورد نظر از فروشگاه",
      detail: "محصول مورد نظر خود را از فهرست گسترده محصولات انتخاب کنید.",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      activeBg: "bg-gray-100",
      activeBorder: "border-gray-400",
      iconBg: "bg-emerald-500",
      image: "/images/installment/person.svg",
    },
    {
      number: "۳",
      title: "بررسی ضمانت",
      description: "بررسی اطلاعات هویتی و تعیین جزئیات اعتبار",
      detail:
        "پس از ثبت اطلاعات هویتی و تعیین جزئیات اعتبار، وارد مرحله تأمین ضمانت می‌شوید. در اعتبار با ضمانت از دیجیتال، می‌توانید از طریق ضامن‌ها یا به کیف پول خود در وسی متقل یا از طریق ضامن برای ارائه ضمانت اقدام کنید.",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      activeBg: "bg-gray-100",
      activeBorder: "border-gray-400",
      iconBg: "bg-emerald-500",
      image: "/images/installment/trash.svg",
    },
    {
      number: "۴",
      title: "تأیید نهایی",
      description: "بررسی و تأیید نهایی درخواست اعتبار",
      detail:
        "تیم ما درخواست شما را بررسی کرده و در صورت تأیید، اعتبار برای شما فعال می‌شود.",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      activeBg: "bg-gray-100",
      activeBorder: "border-gray-400",
      iconBg: "bg-emerald-500",
      image: "/images/installment/sucsess.svg",
    },
    {
      number: "۵",
      title: "دریافت اعتبار",
      description: "تکمیل فرآیند و دریافت اعتبار مورد نظر شما",
      detail:
        "پس از تأیید نهایی، اعتبار به حساب شما واریز می‌شود و می‌توانید خرید خود را انجام دهید.",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      activeBg: "bg-gray-100",
      activeBorder: "border-gray-400",
      iconBg: "bg-emerald-500",
      image: "/images/installment/pay.svg",
    },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(activeStep === index ? -1 : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="flex flex-col gap-5 items-center justify-center mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2 mb-6 border border-emerald-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-600 font-Medium text-sm">
              مراحل دریافت اعتبار
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 mb-4">
            فرآیند دریافت اعتبار
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            با دنبال کردن این مراحل ساده، به راحتی می‌توانید اعتبار خود را
            دریافت کنید
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-7xl mx-auto">
          {/* Progress Line */}
          <div className="relative mb-8">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-emerald-500" />
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black transition-all duration-700 transform ${
                    activeStep === index
                      ? `${step.iconBg} text-white scale-110 shadow-2xl rotate-12`
                      : `bg-white border-2 ${step.borderColor} text-gray-600 hover:scale-105 hover:shadow-lg hover:border-emerald-600`
                  }`}
                >
                  {step.number}
                  {activeStep === index && (
                    <div
                      className={`absolute inset-0 ${step.iconBg} rounded-full animate-ping opacity-25`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ease-in-out ${
                  activeStep === index
                    ? "flex-grow-[3]"
                    : activeStep !== -1
                      ? "flex-grow-[0.7]"
                      : "flex-grow"
                }`}
              >
                {/* Expandable Card */}
                <div
                  className={`relative overflow-hidden rounded-2xl border-2 cursor-pointer transition-all duration-500 h-full ${
                    activeStep === index
                      ? `${step.activeBg} ${step.activeBorder} shadow-xl min-h-[420px]`
                      : `${step.bgColor} ${step.borderColor} shadow-lg hover:shadow-xl h-36`
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div
                    className={`relative p-6 h-full flex flex-col items-center justify-center ${
                      activeStep === index
                        ? "flex flex-row gap-6"
                        : "flex flex-col"
                    }`}
                  >
                    {/* Always Visible Content */}
                    <div
                      className={`${
                        activeStep === index
                          ? "flex-shrink-0 flex flex-col items-center justify-start w-full"
                          : "text-center"
                      } mb-4`}
                    >
                      <div className="w-14 h-14 rounded-2xl overflow-hidden mx-auto mb-4 shadow-lg">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-black text-gray-800 text-lg mb-2 leading-tight">
                        {step.title}
                      </h3>
                      {activeStep === index && (
                        <p className="text-gray-600 text-sm leading-relaxed text-center">
                          {step.description}
                        </p>
                      )}
                    </div>

                    {/* Expanded Content */}
                    <div
                      className={`transition-all duration-500 ease-in-out  ${
                        activeStep === index
                          ? "opacity-100 flex-1"
                          : "opacity-0 max-h-0 pointer-events-none"
                      }`}
                    >
                      {activeStep === index && (
                        <div className="h-full flex flex-col justify-center">
                          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-inner">
                            <h4 className="text-lg font-Bold text-gray-800 mb-4 text-right">
                              جزئیات مرحله
                            </h4>
                            <p className="text-gray-700 text-base leading-relaxed text-right font-Medium">
                              {step.detail}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4 max-w-lg mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`rounded-2xl border-2 shadow-lg transition-all duration-500 overflow-hidden ${
                activeStep === index
                  ? `${step.activeBg} ${step.activeBorder} min-h-[280px]`
                  : `${step.bgColor} ${step.borderColor} h-20`
              }`}
              onClick={() => handleStepClick(index)}
            >
              <div className="p-4">
                {/* Always Visible: Number and Title */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${step.iconBg} rounded-xl flex items-center justify-center text-white text-xl font-Bold shadow-lg flex-shrink-0`}
                  >
                    {step.number}
                  </div>
                  <h3 className="font-Bold text-gray-800">{step.title}</h3>
                </div>

                {/* Expanded Content - Only visible when opened */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    activeStep === index
                      ? "opacity-100 max-h-96 mt-4"
                      : "opacity-0 max-h-0"
                  }`}
                >
                  <div className="border-t border-white/50 pt-4">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-gray-600 text-sm mb-3">
                        {step.description}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed text-right">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section - Clean & Minimal
const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const faqs = [
    {
      question: "مبلغ چک ضمانت چه مبلغی است؟",
      answer: "مبلغ چک ضمانت برابر با مبلغ وام درخواستی شما خواهد بود.",
    },
    {
      question: "مبلغ بیش پرداخت چه مقدار است؟",
      answer: "بر اساس مدت زمان بازپرداخت و نرخ سود تعیین می‌شود.",
    },
    {
      question: "چک صیادی حتماً باید به نام خودم باشد؟",
      answer: "بله، چک صیادی حتماً باید به نام متقاضی وام باشد.",
    },
    {
      question: "از چه فروشگاه‌هایی می‌توانم خرید کنم؟",
      answer: "از تمامی فروشگاه‌های طرف قرارداد که در سایت معرفی شده‌اند.",
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="py-16">
      <div className="flex flex-col gap-5 items-center justify-center mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-800">
            سوالات متداول
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            پاسخ سوالات رایج درباره خرید اقساطی و دریافت اعتبار را در اینجا
            بیابید
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="max-w-4xl mx-auto space-y-4 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              {/* Question */}
              <div
                className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => handleToggle(index)}
              >
                <h3 className="font-Bold text-gray-800 text-lg leading-tight">
                  {faq.question}
                </h3>

                {/* Expand/Collapse Button */}
                <div className="mr-4 flex-shrink-0">
                  <div
                    className={`w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeIndex === index ? "rotate-180 bg-emerald-600" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-white"
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
                </div>
              </div>

              {/* Answer */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  activeIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-12 bg-emerald-500 rounded-full flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-Bold text-gray-700 mb-2">پاسخ:</h4>
                        <p className="text-gray-600 leading-relaxed text-right">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-emerald-500 rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-Bold text-white mb-4">
              سوال دیگری دارید؟
            </h3>
            <p className="text-white/90 mb-6">
              تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست
            </p>
            <button className="bg-white text-emerald-600 font-Bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg">
              تماس با پشتیبانی
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Component
function InstallmentPlan() {
  const calculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="overflow-x-hidden">
      <HeroSection onCalculatorClick={scrollToCalculator} />
      <InstallmentStepsSection />
      <CreditAmountSection />
      <div ref={calculatorRef}>
        <InstallmentCalculator />
      </div>
      <MobileProcessSection />
      {/* <ProcessStepsSection /> */}
      <VideoTutorialSection />
      <FAQSection />
    </div>
  );
}

export default InstallmentPlan;
