
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const testimonials = [
  {
    name: "محمد رضایی",
    role: "خریدار گوشی سامسونگ",
    text: "سفارش من خیلی سریع و با بسته‌بندی عالی به دستم رسید. از اصالت کالا و قیمت مناسب بسیار راضی هستم.",
    image: "/images/author.jpg",
  },
  {
    name: "الهام موسوی",
    role: "خریدار گجت و لوازم جانبی",
    text: "پشتیبانی فروشگاه بسیار حرفه‌ای بود و در انتخاب بهترین هندزفری به من کمک کردند. تجربه خرید اینترنتی عالی داشتم.",
    image: "/images/cliff.jpg",
  },
];

const TestimonialsSlider = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      loop={true}
      className="w-full"
    >
      {testimonials.map((t, idx) => (
        <SwiperSlide key={idx}>
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gray-50 rounded-xl shadow">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-primary-100">
              <Image
                src={t.image}
                alt={t.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-right">
              <p className="text-lg italic mb-4">“{t.text}”</p>
              <div className="font-bold text-primary-500">{t.name}</div>
              <div className="text-gray-500 text-sm">{t.role}</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialsSlider;
