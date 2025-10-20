"use client";
import WishlistCard, {
  WishlistCardProps,
} from "@/components/base/wishlist-card";
import React from "react";
import { AddMyList } from "../../../base/profile-modals";
import { FormProvider, useForm } from "react-hook-form";
import { useUserPurchases } from "@/components/app/profile-user/hooks";
import ShataLoading from "@/components/base/loading/shata-loading";
import Image from "next/image";

const TabContentShoppingLists: React.FC = () => {
  const methods = useForm();
  const { data, isPending } = useUserPurchases();

  if (isPending) {
    return (
      <ShataLoading
        size="medium"
        showText={true}
        text="در حال بارگذاری لیست های خرید..."
      />
    );
  }

  const hasLists = data?.userPurchasesList && data.userPurchasesList.length > 0;

  return (
    <div className="min-h-[400px] w-full">
      {/* Header Section */}
      <div className="bg-gradient-to-l from-emerald-100 to-white rounded-xl p-4 md:p-6 mb-6 border border-emerald-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 bg-emerald-600 text-white rounded-xl items-center justify-center shadow-md">
              <Image
                src="/svg/profile/Frame122.svg"
                alt="shopping list icon"
                width={24}
                height={24}
                className="filter brightness-0 invert"
              />
            </div>
            <div>
              <h2 className="text-base md:text-xl font-Bold text-gray-800">
                لیست‌های خرید من
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-Medium">
                {hasLists
                  ? `${data.userPurchasesList.length} لیست ذخیره شده`
                  : "لیست مورد نظر خودت را ایجاد کن"}
              </p>
            </div>
          </div>
          <FormProvider {...methods}>
            <AddMyList />
          </FormProvider>
        </div>
      </div>

      {/* Lists Content */}
      {hasLists ? (
        <div className="grid gap-4">
          {data.userPurchasesList.map((list: WishlistCardProps["list"]) => (
            <WishlistCard key={list?.id} list={list} />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
          {/* <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 opacity-80">
            <Image
              src="/svg/profile/Frame122.svg"
              alt="empty list"
              fill
              className="object-contain "
            />
          </div> */}
          <h3 className="text-lg md:text-xl font-Bold text-gray-700 mb-2 text-center">
            هنوز لیستی ایجاد نکرده‌اید
          </h3>
          <p className="text-sm md:text-base text-gray-500 text-center max-w-md mb-6 font-Medium leading-relaxed">
            با ایجاد لیست‌های خرید، می‌توانید محصولات مورد علاقه خود را
            دسته‌بندی کنید و خریدهای بعدی را راحت‌تر مدیریت کنید.
          </p>
          <FormProvider {...methods}>
            <AddMyList variant="large" />
          </FormProvider>
        </div>
      )}
    </div>
  );
};

export default TabContentShoppingLists;
