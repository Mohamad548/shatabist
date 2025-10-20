import React from "react";
import Accordion from "@/components/base/accordion";
import Image from "next/image";
import Link from "next/link";
import TestimonialsSlider from "./components/testimonials-slider";


// Mock data
const stats = [
  { label: "رضایت مشتریان", value: 97, icon: "/images/symbol-1.jpg" },
  { label: "تنوع محصولات", value: 85, icon: "/images/symbol-2.jpg" },
  { label: "تحویل به موقع", value: 92, icon: "/images/symbol-3.jpg" },
];

const values = [
  {
    icon: "/images/symbol-1.jpg",
    title: "تضمین اصالت کالا",
    desc: "تمامی گوشی‌ها و گجت‌های ارائه شده در فروشگاه ما اصل بوده و با گارانتی معتبر عرضه می‌شوند.",
  },
  {
    icon: "/images/symbol-2.jpg",
    title: "نوآوری و تکنولوژی روز",
    desc: "ما همواره جدیدترین مدل‌های موبایل و گجت‌های هوشمند را مطابق با آخرین فناوری‌های دنیا ارائه می‌دهдим.",
  },
  {
    icon: "/images/symbol-3.jpg",
    title: "پشتیبانی و مشاوره تخصصی",
    desc: "تیم پشتیبانی ما آماده پاسخگویی و ارائه مشاوره تخصصی برای انتخاب بهترین محصول متناسب با نیاز شماست.",
  },
];

const services = [
  {
    icon: "/images/Services/02.png",
    title: "فروش انواع گوشی موبایل",
    desc: "ارائه جدیدترین مدل‌های گوشی موبایل از برندهای معتبر جهانی با بهترین قیمت.",
  },
  {
    icon: "/images/Services/03.png",
    title: "گجت‌ها و لوازم جانبی",
    desc: "تنوعی بی‌نظیر از گجت‌های هوشمند، ساعت، هندزفری، پاوربانک و لوازم جانبی موبایل.",
    highlight: true,
  },
  {
    icon: "/images/Services/04.png",
    title: "خرید آنلاین و ارسال سریع",
    desc: "امکان خرید اینترنتی آسان و تحویل سریع محصولات به سراسر کشور.",
  },
  {
    icon: "/images/Services/05.png",
    title: "ضمانت بازگشت کالا",
    desc: "امکان بازگشت کالا تا ۷ روز در صورت عدم رضایت از خرید.",
  },
  {
    icon: "/images/Services/06.png",
    title: "فروش اقساطی",
    desc: "امکان خرید اقساطی گوشی و گجت با شرایط ویژه و بدون ضامن.",
  },
  {
    icon: "/images/Services/07.png",
    title: "پیشنهادهای ویژه و تخفیف‌ها",
    desc: "ارائه تخفیف‌های دوره‌ای و پیشنهادهای شگفت‌انگیز برای خریدی مقرون‌به‌صرفه.",
  },
];

const timeline = [
  { step: 1, title: "ثبت سفارش آنلاین", desc: "سریع و آسان" },
  { step: 2, title: "پرداخت امن", desc: "با درگاه‌های معتبر" },
  { step: 3, title: "ارسال سریع", desc: "به سراسر کشور" },
  { step: 4, title: "پشتیبانی ۲۴ ساعته", desc: "در کنار شما" },
];

const faqs = [
  {
    id: 1,
    title: "آیا محصولات شما اصل و دارای گارانتی هستند؟",
    content:
      "بله، تمامی گوشی‌ها و گجت‌های فروشگاه ما اصل بوده و با گارانتی معتبر شرکتی عرضه می‌شوند.",
  },
  {
    id: 2,
    title: "مدت زمان ارسال سفارش چقدر است؟",
    content:
      "سفارش‌ها در سریع‌ترین زمان ممکن (معمولاً ۱ تا ۳ روز کاری) به سراسر کشور ارسال می‌شوند.",
  },
  {
    id: 3,
    title: "آیا امکان خرید اقساطی وجود دارد؟",
    content:
      "بله، امکان خرید اقساطی گوشی و گجت با شرایط ویژه و بدون نیاز به ضامن فراهم است.",
  },
  {
    id: 4,
    title: "در صورت عدم رضایت، امکان بازگشت کالا وجود دارد؟",
    content:
      "بله، تا ۷ روز پس از دریافت کالا می‌توانید در صورت عدم رضایت، محصول را بازگردانید.",
  },
];

const AboutUs = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between min-h-[340px] md:min-h-[420px] px-4 md:px-16 py-8 bg-gray-100 relative overflow-hidden">
        <div className="flex-1 flex flex-col items-start justify-center z-10">
          <h1 className="text-3xl md:text-5xl font-black text-emerald-500 mb-4 leading-tight">
            درباره شتا۲۰
          </h1>
          <p className="text-lg md:text-lg font-Bold text-black mb-4 max-w-lg">
            واردکننده رسمی و تخصصی موبایل، تبلت و لوازم دیجیتال با بیش از یک دهه سابقه درخشان.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary-100 via-blue-100 to-yellow-100 flex items-center justify-center shadow-2xl animate-pulse-slow">
            <Image
              src="/images/logo.png"
              alt="لوگو شتا۲۰"
              width={200}
              height={200}
              className="rounded-2xl object-cover "
            />
          </div>
        </div>
        <svg
          className="absolute left-0 top-0 w-full h-full opacity-20 pointer-events-none bg-emerald-500/70"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#A7F3D0"
            fillOpacity=".5"
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </section>


      {/* Our Story Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-6 text-gray-700 text-justify leading-8">
            <h2 className="text-2xl font-black text-center mb-10 text-[#457B9D]">
                داستان ما
            </h2>
            <p>
                شرکتِ <strong>شاهین تجارت اطمینان همراه</strong> با نام تجاری و برند <strong>شتا۲۰</strong> با بیش از ده سال سابقه در حوزهٔ خرید و فروش انواع گوشی‌های موبایل، تبلت، و لوازم دیجیتال؛ از شرکت‌های رسمی واردکننده‌ٔ کشور می‌باشد. شتا۲۰ عضو رسمی اتاق بازرگانی و صنایع تهران و عضو انجمن کسب‌وکارهای مجازی کشور و دارای نماد اعتماد (ای‌نماد) از وزارت صنعت، معدن و تجارت کشور می‌باشد.
            </p>
            <p>
                فروشگاه اینترنتی «شـتـا۲۰» تحت مدیریتِ شرکت «شـاهین تجـارت اطمینـان همـراه» با شماره‌ی ثبت ۵۴۸۸۵۴ و شناسه‌ی ملی ۱۴۰۰۸۶۹۹۱۱۶، با بیش از ده سال سابقه در حوزهٔ فروش و واردات، پیش‌تر نیز با نام «شاهین» در مجتمع تجاری علاءالدین شناخته می‌شد. این فروشگاه دارایِ نماد اعتماد الکترونیک از وزارت صنعت، معدن و تجارت و دارای نماد ساماندهی از واحد مرکز فناوری اطلاعات و رسانه‌های دیجیتالِ وزارت فرهنگ و ارشاد اسلامی می‌باشد. همچنین برند و علامت تجاریِ «شـتـا۲۰» در مرکز مالکیت معنویِ سازمان ثبت اسناد و املاک کشور به ثبت رسیده است.
            </p>
            <p>
                این مجموعه همیشه سعی بر داشتن بهترین قیمت و بهترین کیفیت را داشته و خواهد داشت. هدف از راه‌اندازی این شبکه ارتباط مستقیم و بی‌واسطه با مصرف‌کننده می‌باشد که مصرف‌کنندهٔ واقعی بتواند کالای موردنظر خود را با بهترین قیمت و سریع‌ترین زمان ممکن خریداری نماید. شعار ما <strong>«بیست بودن»</strong> است؛ انتخاب عدد «۲۰» در شتا۲۰ نیز به همین دلیل‌‌ است. امید است که بتوانیم همیشه کنار شما همراهان و همکاران گرامی بیست بمانیم.
            </p>
        </div>
      </section>




      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 order-2 md:order-1">
          {stats.map((stat) => (
            <div key={stat.label} className="">
              <div className="flex justify-between mb-1">
                <span className="text-gray-800 font-medium">{stat.label}</span>
                <span className="text-emerald-500 font-bold">
                  {stat.value}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-emerald-500 h-3 rounded-full transition-all"
                  style={{ width: `${stat.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center order-1 md:order-2 w-96 h-72">
          <Image
            src="/images/Banner/Rectangle 12.png"
            alt="فروشگاه موبایل"
            width={400}
            height={300}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>
      


      {/* Why Us Timeline */}
      <section className="bg-[#F1F3F6] py-12 ">
        <h2 className="text-2xl font-black text-center mb-10 text-[#457B9D]">
          چرا فروشگاه ما؟
        </h2>
        <div className="relative flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto px-4">
          <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 z-0">
            <div
              className="absolute left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-[#08A70AFF]"
              style={{ top: 0 }}
            ></div>
          </div>
          {timeline.map((item, idx) => (
            <div
              key={item.step}
              className="flex flex-col items-center flex-1 z-10"
            >
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full border-4 border-emerald-500 bg-white text-[#457B9D] text-2xl font-extrabold mb-2 z-10">
                  {item.step}
                </div>
                <div className="text-center">
                  <div className="font-bold text-[#457B9D] text-base mb-1">
                    {item.title}
                  </div>
                  <div className="text-gray-500 text-sm">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {values.map((val) => (
            <div
              key={val.title}
              className="bg-[#F1F3F6] rounded-2xl shadow p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-[#E63946]/10 flex items-center justify-center group-hover:bg-[#457B9D]/10 transition-all">
                <Image
                  src={val.icon}
                  alt={val.title}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-black text-lg mb-2 text-[#457B9D]">
                {val.title}
              </h3>
              <p className="text-gray-600 text-sm leading-7">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#F1F3F6] py-12">
        <h2 className="text-2xl font-black mb-8 text-center text-[#457B9D]">
          خدمات ما
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className={`rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 border border-[#F8F9FA] hover:shadow-2xl hover:-translate-y-2 group ${service.highlight ? "bg-emerald-500/80 text-white" : "bg-white"}`}
            >
              <div
                className={`w-14 h-14 mb-4 rounded-full flex items-center justify-center ${service.highlight ? "bg-white/20" : "bg-[#457B9D]/10"}`}
              >
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3
                className={`font-bold text-xl mb-2 ${service.highlight ? "text-white" : "text-[#457B9D]"}`}
              >
                {service.title}
              </h3>
              <p
                className={`text-sm mb-2 ${service.highlight ? "text-white/80" : "text-gray-600"}`}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-8 text-center text-[#457B9D]">
            نظر مشتریان درباره ما
          </h2>
          <TestimonialsSlider />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F1F3F6] py-16">
        <h2 className="text-2xl font-black mb-8 text-center text-[#457B9D]">
          سوالات متداول
        </h2>
        <div className="space-y-4 max-w-2xl mx-auto px-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="transition-all duration-300">
              <Accordion
                title={
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    {faq.title}
                  </span>
                }
              >
                <p className="text-gray-700 leading-7">{faq.content}</p>
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="flex justify-center items-center py-16 bg-white">
        <div className="max-w-xl w-full mx-4 rounded-2xl border-4 border-transparent bg-gradient-to-tr from-[#E63946]/10 via-[#457B9D]/10 to-[#F1F3F6] p-1 shadow-xl">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-black mb-4 text-emerald-500">
              همین حالا خرید خود را آغاز کنید!
            </h3>
            <p className="text-gray-600 mb-6">
              جدیدترین گوشی‌ها و گجت‌های روز دنیا با بهترین قیمت و ارسال سریع در
              انتظار شماست.
            </p>
            <Link
              href={"/shop"}
              className="px-8 py-3 rounded-full bg-emerald-500 text-white font-bold text-lg shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#457B9D]/30"
            >
              ورود به فروشگاه
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
