"use client";
import Slider from "@/components/base/slider";
import Image from "next/image";
import React from "react";
import { PageLevelLocalization } from "@/constants/localization";
import Link from "next/link";
import SkeletonAmazing from "./skeleton-amazing";
import { ProductCard } from "@/components/base/product-card";
import { useCategoriesBuySlug } from "@/components/layout/components/header/hooks";

function AmazingSlider() {
  const { home: amazingSlider } = PageLevelLocalization;
  const { data, isPending } = useCategoriesBuySlug("Apple");

  const products = data?.products ?? [];

  return (
    <Slider
      classTitleSlider="relative min-w-40 md:w-1/2 h-full justify-center flex items-center flex-col rounded-r-md"
      titleSlider={
        <>
          <Image
            width={80}
            height={80}
            src="/svg/group-mag.svg"
            alt="amazing"
          />
          <h3 className="font-Bold text-2xl md:text-2xl text-white w-32 text-center pt-2">
            {amazingSlider.amazingSlider.title}
          </h3>
          <Link
            href="/"
            className="flex gap-2 mt-10 transition-all border border-transparent items-center justify-center hover:border-emerald-600 rounded-md bg-emerald-700 px-3 py-2 hover:bg-emerald-800"
          >
            <h3 className="font-semibold text-base text-white text-center">
              {amazingSlider.amazingSlider.action}
            </h3>
            {/* <Image
              width={24}
              height={24}
              src="/svg/arrow-left.svg"
              alt="amazing"
            /> */}
          </Link>
        </>
      }
      DataArray={products}
      RenderItem={ProductCard}
      classSwiperSlide="p-2 bg-white rounded-md md:min-h-[360px]"
      classMainSlider="flex overflow-hidden bg-green-600 mr-4 rounded-md md:mx-40"
      classCounterSlider="w-4/5 md:w-4/5"
      containerSwiper="!ml-20 md:!ml-auto"
      breakpoints={{
        375: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 24,
        },
        1500: {
          slidesPerView: 4.5,
          spaceBetween: 24,
        },
      }}
      withLink={true}
      fade={products.length > 4}
      classNameFade="w-[120px] h-full hidden md:block top-0 md:z-20 -left-7 absolute bg-fade-gradient"
      SkeletonLoader={isPending && <SkeletonAmazing />}
      classNameCard="flex gap-2 flex-col"
    />
  );
}

export default AmazingSlider;
