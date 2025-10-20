import Slider from "@/components/base/slider";
import Image from "next/image";
import React from "react";
import { PageLevelLocalization } from "@/constants/localization";
import Link from "next/link";
import SkeletonProduct from "@/components/app/home/components/slider-products/skeleton-product/index";
import { ProductCard } from "@/components/base/product-card";

function VisitedProducts({ product }: any) {
  const { home: titleSlider } = PageLevelLocalization;
  return (
    // <Slider
    //   classTitleSlider="w-full items-center "
    //   titleSlider={
    //     <div className="flex items-center justify-between">
    //       <h3 className=" font-Bold text-lg text-gray-800 ">
    //         {" "}
    //         {titleSlider.slider.apple}
    //       </h3>
    //       <Link
    //         href={"/"}
    //         className="flex text-primary-500 gap-2 p-2 transition-all  border border-transparent   items-center justify-center hover:border-gray-100 rounded-md"
    //       >
    //         <h3 className="font-semibold  text-base text-center">
    //           {titleSlider.amazingSlider.action}
    //         </h3>
    //         <Image
    //           width={24}
    //           height={24}
    //           src={"/svg/arrow-left-green.svg"}
    //           alt="amazing"
    //           className=""
    //         />
    //       </Link>
    //     </div>
    //   }
    //   DataArray={products}
    //   RenderItem={ProductCard}
    //   classSwiperSlide="bg-white border p-2 border-gray-100  box-border hover:shadow-primary my-2 w-full md:max-w-fit rounded-md"
    //   classMainSlider="  justify-between flex flex-col pr-4"
    //   classCounterSlider=" w-full rounded-l-md"
    //   breakpoints={{
    //     1280: {
    //       slidesPerView: 4,
    //       spaceBetween: 24,
    //     },
    //     768: {
    //       slidesPerView: 2.5,
    //       spaceBetween: 24,
    //     },
    //     375: {
    //       slidesPerView: 1.5,
    //       spaceBetween: 24,
    //     },
    //   }}
    //   fade={true}
    //   classNameFade=" hidden md:block w-80 h-full top-0 md:z-20  left-0 absolute  bg-fade-gradient"
    //   SkeletonLoader={<SkeletonProduct />}
    // />
    <div>
      <h3>محصولات بازدید شده</h3>
    </div>
  );
}

export default VisitedProducts;
