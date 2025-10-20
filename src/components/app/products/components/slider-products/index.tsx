"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoChevronLeft } from "react-icons/go";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import CartSliderProducts from "./cart-items";
import { dataItemsSliderProducts } from "@/constants/mock-data/product";

const ItemsSliderProducts = () => {
  const swiperRef = useRef<any>(null);

  return (
    <div className=" relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{ delay: 2500 }}
        speed={3000}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 30 },
          760: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 4.5, spaceBetween: 24 },
        }}
      >
        {dataItemsSliderProducts.map((items) => (
          <SwiperSlide className="flex flex-col" key={items.id}>
            <CartSliderProducts key={items.id} items={items} />
          </SwiperSlide>
        ))}
        <div className="w-[120px] h-full hidden md:block top-0 md:z-20  -left-7 absolute  bg-fade-gradient"></div>
      </Swiper>

      <button
        className="px-2 absolute top-5 z-10 left-0"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <GoChevronLeft className="shadow-2xl rounded-full text-3xl m-3 border bg-white  border-gray-200" />
      </button>
    </div>
  );
};

export default ItemsSliderProducts;
