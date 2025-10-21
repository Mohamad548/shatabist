"use client";
import Slider from "@/components/base/slider";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { PageLevelLocalization } from "@/constants/localization";
import { useCategories } from "@/components/layout/components/header/hooks";
import { CategoryType, mapBackendData } from "@/utils/categoryUtils";
import { BASE_URL } from "@/constants/url";
import ShataLoading from "@/components/base/loading/shata-loading";

function HomeCategory() {
  const { home } = PageLevelLocalization;
  const { data, isPending } = useCategories();
  const categoriesData = mapBackendData(data?.categories || []);
  const getCategoryIconSrc = (icon: string | null | undefined) => {
    if (!icon) return "/images/default-icon.png"; // آیکون پیش‌فرض برای null
    if (icon.startsWith("/uploads")) {
      return `${BASE_URL}${icon}`;
    }
    // اگر emoji یا هر چیز دیگه هست، اینجا می‌تونی تصمیم بگیری چی نمایش بدی:
    return null;
  };

  return (
    <div className="flex flex-col justify-center">
      <h2 className="w-full text-center pt-8 font-semibold text-lg text-gray-800 ">
        {home.productCategories}
      </h2>
      <div className="flex px-4 md:px-40 gap-6 py-8 md:gap-16 justify-center flex-wrap w-full">
        {isPending ? (
          <ShataLoading
            size="large"
            showText={true}
            text="در حال بارگذاری دسته بندی ها..."
          />
        ) : (
          categoriesData?.map((category: CategoryType) => (
            <Link
              className="flex items-center font-Medium md:text-base text-sm flex-col gap-4 h-full"
              href={`/pcat/${
                category?.slugcat
                  ? `${category?.slugcat}/${category.slug}`
                  : category.slug
              }`}
              key={category?.id}
            >
              <div className="relative flex items-center w-24 h-24 md:w-auto md:h-auto">
                <div className=" relative w-32 h-32">
                  <Image
                    alt={category?.name || "category icon"}
                    src={
                      getCategoryIconSrc(category?.icon) ||
                      "/images/default-icon.png"
                    }
            fill
   style={{ objectFit: "contain" }}
                    quality={100}
                  />
                </div>
              </div>
              <h3>{category.name}</h3>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeCategory;

//