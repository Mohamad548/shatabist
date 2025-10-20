"use client";
import Slider from "@/components/base/slider";
import Image from "next/image";
import React from "react";
import { PageLevelLocalization } from "@/constants/localization";
import Link from "next/link";
import SkeletonProduct from "@/components/app/home/components/slider-products/skeleton-product/index";
import { ProductCard } from "@/components/base/product-card";
import { useCategoriesBuySlug } from "@/components/layout/components/header/hooks";

function AppleSlider() {
  const { home: titleSlider } = PageLevelLocalization;
  const { data, isPending } = useCategoriesBuySlug("Apple");
  return (
    <Slider
      classTitleSlider="w-full items-center mt-16"
      titleSlider={
        <div className="flex items-center justify-between md:pl-40">
          <h3 className=" font-Bold text-lg text-gray-800 ">
            {" "}
            {titleSlider.slider.apple}
          </h3>
          <Link
            href="/pcat/mobile/apple"
            className="flex text-emerald-500 gap-2 p-2 transition-all border border-transparent items-center justify-center hover:border-emerald-600 rounded-md"
          >
            <h3 className="font-Bold text-base text-center">
              {titleSlider.amazingSlider.action}
            </h3>
            <Image
              width={24}
              height={24}
              src="/svg/arrow-left-green.svg"
              alt="amazing"
              className=""
            />
          </Link>
        </div>
      }
      DataArray={data?.products}
      RenderItem={ProductCard}
      classSwiperSlide="p-2 bg-white border border-gray-100  box-border hover:shadow-primary my-2 w-full md:max-w-fit rounded-md md:min-h-[380px]"
      classMainSlider="justify-between flex flex-col pr-4 md:pr-40"
      classNameCard="flex flex-col gap-2 justify-between"
      classCounterSlider="w-full rounded-l-md"
      breakpoints={{
        1024: {
          slidesPerView: 6,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 24,
        },
        375: {
          slidesPerView: 1.5,
          spaceBetween: 24,
        },
      }}
      fade={true}
      classNameFade=" hidden md:block w-80 h-full top-0 md:z-20  left-0 absolute  bg-fade-gradient"
      SkeletonLoader={isPending && <SkeletonProduct />}
      withLink={true}
    />
  );
}

export default AppleSlider;
