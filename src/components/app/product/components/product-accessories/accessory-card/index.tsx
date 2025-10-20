"use client";

import {
  useDeleteCartItem,
  useGetCart,
} from "@/components/app/profile-user/hooks";
import Button from "@/components/base/button";
import { SmallLoading } from "@/components/base/loading/SmallLoading";
import { ProductType } from "@/components/base/product-card/type";
import { BASE_URL } from "@/constants/url";
import { useUserStore } from "@/stores/useUserStore";
import { getThumbnailImageUrl } from "@/utils/get-thumbnail-image-url";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAddToCart } from "../../../hooks";
import toast from "react-hot-toast";

type CartItemType = {
  variantId: number;
  quantity: number;
};

interface AccessoryCardProps {
  id: number;
  imageSrc: string;
  imageAlt: string;
  accessoryName: string;
  options: ProductType["productVariants"];
  discount: string;
  price?: string;
  slug?: string;
}

const AccessoryCard: React.FC<AccessoryCardProps> = ({
  imageSrc,
  imageAlt,
  accessoryName,
  options = [],
  discount,
  price,
  slug,
  id
}) => {
  const { mutate: addToCart, isPending, isSuccess } = useAddToCart();
  const { data: currentCartData, isPending: isCartPending } = useGetCart();
  const { mutate: deleteCartItem, isPending: isPendingDeleteCart } =
    useDeleteCartItem();
  const [selectedOption, setSelectedOption] = useState(
    () => options[0] ?? null
  );
  const [count, setCount] = useState<number>(0);
  const [inCart, setInCart] = useState(false);
  const {
    customerPrice: finalPrice,
    maximumOrder,
    partnerMaximumOrder,
    partnerMinimumOrder,
  } = selectedOption || {};

  const maxQuantity = maximumOrder ?? partnerMaximumOrder ?? 1;
  const minQuantity = partnerMinimumOrder > 0 ? partnerMinimumOrder : 1;

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = options.find(
      (option) => option.id.toString() === e.target.value
    );
    if (selected) {
      setSelectedOption(selected);
    }
  };

  const partner = false;
  const isPartner = partner;

  const getPrice = () => {
    if (!selectedOption) return "نامشخص";
    if (!selectedOption) return "نامشخص";

    const specialPrice = isPartner
      ? selectedOption.partnerSpecialPrice
      : selectedOption.customerSpecialPrice;

    const regularPrice = isPartner
      ? selectedOption.partnerPrice
      : selectedOption.customerPrice;

    const finalPrice = Number(specialPrice) > 0 ? specialPrice : regularPrice;

    return Number(finalPrice).toLocaleString("fa-IR");
  };

  const getDiscountText = () => {
    if (!selectedOption) return "";
    if (!selectedOption) return "";

    const isPartnerUser = isPartner;

    const originalPrice = isPartnerUser
      ? Number(selectedOption.partnerPrice)
      : Number(selectedOption.customerPrice);

    const specialPrice = isPartnerUser
      ? Number(selectedOption.partnerSpecialPrice)
      : Number(selectedOption.customerSpecialPrice);

    // اگر specialPrice نامعتبر بود یا صفر یا بیشتر یا مساوی originalPrice، یعنی تخفیفی نیست
    if (!specialPrice || specialPrice === 0 || specialPrice >= originalPrice) {
      return "";
      return "";
    }

    const discountPercent = Math.round(
      ((originalPrice - specialPrice) / originalPrice) * 100
    );

    // اگر تخفیف صفر یا کمتر بود، برگردان رشته خالی
    if (discountPercent <= 0) return "";
    if (discountPercent <= 0) return "";

    return `${discountPercent}%`;
  };

  const token = getCookie("token");
  const pathname = usePathname();
  const router = useRouter();
  const selectedVariantId = selectedOption?.id;

  const handleAddToCart = (customCount?: number) => {
    if (!token) {
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/login?redirect=${redirectUrl}`);
      return;
    }

    const countToUse = customCount ?? (inCart ? count : 1);
    const prioIndexToUse = 0;

    if (!selectedVariantId) return;

    const previousItems: CartItemType[] =
      currentCartData?.userCarts?.find(
        (cart: { prioIndex: number }) => cart.prioIndex === prioIndexToUse
      )?.items ?? [];

    // ✅ تشخیص اینکه آیا اولین بار است که این آیتم اضافه می‌شود
    const isNewItem = !previousItems.some(
      (item) => item.variantId === selectedVariantId
    );

    const updatedCartItems = isNewItem
      ? [
          ...previousItems,
          { variantId: selectedVariantId, quantity: countToUse },
        ]
      : previousItems.map((item) =>
          item.variantId === selectedVariantId
            ? { ...item, quantity: countToUse }
            : item
        );

    addToCart(
      {
        prioIndex: prioIndexToUse,
        cartItems: updatedCartItems,
      },
      {
        onSuccess: () => {
          setInCart(true);
          if (isNewItem) {
            toast.success("کالا با موفقیت به سبد اضافه شد");
          }
          setCount(countToUse);
        },
        onError: (error) => {},
      }
    );
  };

  const handleNavigateToCart = () => {
    // SSR-safe navigation
    router.push("/checkout/cart");
  };
  const allCartItems =
    currentCartData?.userCarts?.flatMap(
      (cart: { items: any[] }) => cart.items
    ) || [];

  const isInCart = selectedVariantId
    ? !isCartPending &&
      allCartItems.some(
        (item: { variantId: number }) => item.variantId === selectedVariantId
      )
    : false;

  const matchingCartItem = selectedVariantId
    ? !isCartPending &&
      allCartItems.find(
        (item: { variantId: number }) => item.variantId === selectedVariantId
      )
    : undefined;

  const matchedCartItemId = matchingCartItem?.id;
  useEffect(() => {
    if (matchingCartItem) {
      setCount(matchingCartItem.quantity);
      setInCart(true);
    } else {
      setCount(1); // 👈 اصلاح شد: مقدار اولیه باید حداقل سفارش باشد
      setInCart(false);
    }
  }, [matchingCartItem]);

  const handleDecrease = () => {
    if (count === 1) {
      if (!matchedCartItemId) {
        return;
      }

      deleteCartItem(String(matchedCartItemId), {
        onSuccess: () => {
          toast.success("کالا با موفقیت حذف شد");
          setInCart(false);
          setCount(1); // مقدار شمارنده رو به حداقل برگردون
        },
        onError: (err) => {
          toast.error("خطا در حذف کالا");
        },
      });
    } else {
      const newCount = count - 1;
      setCount(newCount);
      handleAddToCart(newCount);
    }
  };
  const discountText = getDiscountText();
  const imageUrl = getThumbnailImageUrl([{ url: imageSrc, thumbnail: true }]);
  return (
    <div className="min-w-72 overflow-hidden h-full border-2 border-gray-100 md:border-b md:border-0 md:border-gray-300 p-4 rounded-3xl md:rounded-none flex flex-col md:flex-row justify-between items-center gap-4 py-4 ">
      <div className="flex items-start justify-start gap-5 flex-col md:flex-row overflow-hidden  ">
        <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-100 md:bg-transparent rounded-xl  w-full">
          <Link
            className="relative h-20 w-20  md:bg-gray-100 rounded-xl"
            href={`/p/${slug}`}
          >
            <Image
              className=""
              src={
                selectedOption?.image
                  ? `${BASE_URL}${selectedOption?.image}`
                  : imageUrl
              }
              alt={imageAlt}
                       fill
    style={{ objectFit: "contain" }}
              quality={100}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-5 items-center md:items-start">
          <Link href={`/p/${slug}`} className="text-sm font-Bold line-clamp-2 md:truncate">
            {accessoryName}
          </Link>

          <select
            onChange={handleOptionChange}
            value={selectedOption?.id}
            className=" w-full md:w-96 py-2 px-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 font-medium text-sm focus:outline-none hover:border-gray-300 transition-colors duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTBMMTIgNkg0TDggMTBaIiBmaWxsPSIjOWNhM2FmIi8+Cjwvc3ZnPgo=')] bg-no-repeat bg-left pr-8"
          >
            {options.map((option) => (
              <option key={option.id} value={option.id} className="py-1">
                رنگ: {option?.color?.mainColor || "نامشخص"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center p-2">
        <div className="flex  gap-10 items-center">
          {discountText && (
            <h3 className="bg-success-500 text-sm rounded-xl text-white px-2 font-regular">
              {discountText}
            </h3>
          )}

          <div className="flex  items-center  ">
            <div className="text-left flex justify-center items-center gap-2">
              <div>
                {" "}
                <h3 className="text-gray-800 bg text-sm font-Medium  whitespace-nowrap">
                  {getPrice()}
                </h3>
                <h3 className="text-xs text-center font-regular leading-5 text-gray-500 line-through">
                  {finalPrice !== undefined &&
                    `${Number(finalPrice).toLocaleString("fa-IR")} `}
                </h3>
              </div>{" "}
              <h3 className="text-gray-800 bg text-sm font-Medium l">تومانء</h3>
            </div>
          </div>
        </div>
        <div className="grid  md:row-start-4 col-span-3 md:w-11/12">
          {inCart || isInCart ? (
            <div className="flex items-start gap-2">
              <div className="flex items-center justify-between w-24 px-2 h-12 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => {
                    if (count >= maxQuantity) return;
                    const newCount = count + 1;
                    setCount(newCount);
                    handleAddToCart(newCount);
                  }}
                  disabled={count >= maxQuantity || isPendingDeleteCart}
                >
                  +
                </button>

                <span className="flex-1 text-center font-bold text-lg text-gray-700">
                  {isPending ? <SmallLoading /> : count}
                </span>

                <button onClick={handleDecrease}>
                  {isPendingDeleteCart ? (
                    <SmallLoading />
                  ) : count === 1 ? (
                    <div className="relative h-5 w-5">
                      <Image
                        src="/svg/trashred.svg"
                        fill
                        className="object-contain"
                        alt="Remove icon"
                      />
                    </div>
                  ) : (
                    "−"
                  )}
                </button>
              </div>

              <div className="flex flex-col">
                <p className="text-gray-500 py-1 text-xs">
                  موجود در سبد خرید شما
                </p>
                <button
                  onClick={handleNavigateToCart}
                  className="text-green-600 font-semibold text-xs hover:underline"
                  type="button"
                >
                  مشاهده سبد خرید
                </button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => handleAddToCart()}
              className="bg-emerald-600 whitespace-nowrap text-white w-full py-2 px-8 rounded-md font-semibold text-sm"
              type="button"
            >
              {isPending ? <SmallLoading /> : "افزودن به سبد خرید "}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessoryCard;
