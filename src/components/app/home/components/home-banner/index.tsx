"use client";
import React from "react";
import CartBanner from "./cart-banner";
import clsxm from "@/utils/clsxm";
import { useGetBanners } from "@/components/app/profile-user/hooks";
import { BASE_URL } from "@/constants/url";

type HomeBannerType = {
  banners?: { src: string; title: string; classCart?: string }[];
  className?: string;
  useApi?: boolean;
};

function HomeBanner({ className }: HomeBannerType) {
  const { data, isLoading } = useGetBanners();
  const { banners } = data || {};

  // Use API data if useApi is true and data is available

  return (
    <div className={className}>
      {banners
        ?.filter((banner: any) => banner.active)
        .map((banner: any) => (
          <CartBanner
            key={banner.id}
            src={BASE_URL + banner.url}
            title={banner.title}
            link={banner.link}
            color={banner.color}
            className="w-full md:w-1/2 "
          />
        ))}
    </div>
  );
}
export default HomeBanner;
