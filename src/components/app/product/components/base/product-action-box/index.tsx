import { NotifyModal } from "@/components/app/profile-user/components/base/profile-modals";
import {
  useDeleteCartItem,
  useGetCart,
} from "@/components/app/profile-user/hooks";
import Button from "@/components/base/button";
import { SmallLoading } from "@/components/base/loading/SmallLoading";
import { useColorStore } from "@/stores/colorStore";
import useCounterStore from "@/stores/useCounterStore";
import clsxm from "@/utils/clsxm";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useAddToCart } from "../../../hooks";
import { UserCartItem } from "../../../types/types";
import toast, { Toaster } from "react-hot-toast";
import { getContrastColor } from "@/utils/get-contrast-color";

interface ProductColor {
  id: number;
  subColor: string;
  color: string;
  price: number;
  image?: string;
  discountText: string;
  isDefault?: boolean;
  statuses: {
    freeDelivery: boolean;
    fastDelivery: boolean;
    installmentAvailibility: boolean;
    isInPersonPurchase: boolean;
    payOnSite: boolean;
  };
  basePrice?: string;
  maximumOrder?: number;
  partnerMaximumOrder?: number;
  partnerMinimumOrder?: number;
  variantId: number;
  quantity?: number;
  mainColor: string;
}

type CartItemType = {
  variantId: number;
  quantity: number;
};

function ProductActionBox({
  productColors = [],
  productId,
  className,
}: {
  productColors?: ProductColor[];
  productId?: number;
  className?: string;
  userCarts?: UserCartItem[];
}) {
  const { selectedColor, setSelectedColor, setInitialColor } = useColorStore();
  const [hasInitialized, setHasInitialized] = useState(false);

  const { mutate: addToCart, isPending } = useAddToCart();
  const { data: currentCartData, isPending: isCartPending } = useGetCart();

  const { mutate: deleteCartItem, isPending: isPendingDeleteCart } =
    useDeleteCartItem();
  const [timer, setTimer] = useState<number>(1);

  // 1. Filter out products with quantity 0 or less.
  const availableProductColors = useMemo(
    () => productColors.filter((p) => p.quantity && p.quantity > 0),
    [productColors]
  );

  // 2. Set the cheapest available product as the default selection on initialization.
  useEffect(() => {
    if (!hasInitialized && availableProductColors.length > 0) {
      const cheapestProduct = availableProductColors.reduce(
        (min, p) => (p.price < min.price ? p : min),
        availableProductColors[0]
      );
      setSelectedColor(cheapestProduct);
      setHasInitialized(true);
    }
  }, [availableProductColors, hasInitialized, setSelectedColor]);

  const selectedProduct = productColors.find(
    (color) => color.subColor === selectedColor?.subColor
  );
  const {
    price: finalPrice,
    discountText,
    basePrice,
    maximumOrder,
    partnerMaximumOrder,
    partnerMinimumOrder,
  } = selectedProduct || {};
  const maxQuantity = maximumOrder ?? partnerMaximumOrder ?? 1;
  const minQuantity = partnerMinimumOrder ?? 1;
  const [count, setCount] = useState(minQuantity || 1);
  const token = getCookie("token");
  const pathname = usePathname();
  const router = useRouter();

  const selectedVariantId = selectedProduct?.variantId;

  const handleAddToCart = (customCount?: number) => {
    if (!token) {
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/login?redirect=${redirectUrl}`);
      return;
    }

    const countToUse = customCount ?? count;
    const prioIndexToUse = 0;

    if (!selectedVariantId) return;

    const previousItems: CartItemType[] =
      currentCartData?.userCarts?.find(
        (cart: { prioIndex: number }) => cart.prioIndex === prioIndexToUse
      )?.items ?? [];

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
          if (isNewItem) {
            toast.success("کالا با موفقیت به سبد اضافه شد");
          }
        },
        onError: (error) => {},
      }
    );
  };

  const handleNavigateToCart = () => {
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

  useEffect(() => {
    if (matchingCartItem) {
      setCount(matchingCartItem.quantity);
    } else if (selectedProduct) {
      setCount(minQuantity);
    }
  }, [matchingCartItem, selectedProduct, minQuantity]);
  const matchedCartItemId = matchingCartItem?.id;

  // 3. If all product variants are out of stock, show the "Notify Me" UI.
  if (availableProductColors.length === 0) {
    return (
      <div
        className={clsxm(
          "md:bottom-20 w-full grid bottom-20 left-0 right-0 border-t items-center justify-items-center p-4",
          className
        )}
      >
        <div className="flex md:flex-col  h-20 md:h-28 text-lg  font-Medium items-center md:row-start-3 gap-2 w-full justify-around md:col-span-3 col-span-4 row-start-2 col-start-1">
          <div className="flex items-center gap-3 bg-gray-100 px-5 py-2.5 rounded-full border border-gray-200 whitespace-nowrap">
            <div className="relative h-5 w-5 hidden md:block">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span className="text-gray-800 text-xs md:text-sm font-bold">
              این محصول موجود نیست
            </span>
          </div>

          {/* Notify Button */}
          <NotifyModal productId={productId} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsxm(
        "md:bottom-20 w-full grid bottom-20 left-0 right-0 border-t   grid-cols-3 gap-y-4 items-center justify-items-center ",
        className
      )}
    >
      <Toaster />

      <div className="md:col-start-1 col-span-3 md:row-start-2 row-start-1 border-b pb-2 flex flex-col md:items-start items-center w-full gap-4 px-4">
        <div className="flex items-center w-full gap-2 text-gray-800 justify-start">
          <h3 className="text-gray-600 font-Medium text-xs">
            محصول انتخاب‌شده:
          </h3>
          <h3 className="font-Bold text-sm">{`${selectedColor?.mainColor} (${selectedColor?.subColor})`}</h3>
          <span className="text-xs font-mono text-gray-600 bg-gray-100 px-1 rounded ml-2 select-all">
            {selectedColor?.color}
          </span>
        </div>
        <ul
          className=" 
  font-regular w-full justify-start row-start-2 col-span-2 hidden-scrollbar
  text-gray-500 text-sm flex flex-nowrap gap-3 overflow-x-auto max-w-full
  md:flex-wrap md:overflow-x-visible 
"
        >
          {availableProductColors.map((color) => (
            <li
              key={color.id}
              onClick={() => {
                setSelectedColor(color);
              }}
              title={`${color.mainColor} (${color.subColor})`}
              className={`cursor-pointer whitespace-nowrap flex items-center gap-2 px-2 py-1 border rounded-md ${
                selectedColor?.subColor === color.subColor
                  ? "border-gray-500 bg-gray-100"
                  : "border-gray-300 bg-white"
              } text-xs md:text-sm`}
            >
              <div
                className="w-5 h-5  md:w-5 md:h-5 border rounded-full flex items-center justify-center"
                style={{ backgroundColor: color.color }}
              >
                {selectedColor?.subColor === color.subColor && (
                  <span className="text-base font-regular">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={getContrastColor(color.color)}
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <>
        <div className="flex flex-col items-center gap-1 w-full md:col-span-3 md:row-start-3 row-start-2 col-start-1">
          <div className="flex items-center gap-3 relative">
            {discountText && basePrice !== undefined && (
              <div className="line-through text-gray-400 text-xs font-normal ">
                {Number(basePrice).toLocaleString("fa-IR")}
              </div>
            )}
            {discountText && (
              <div className="bg-red-600 text-white  rounded-full px-3 py-1 text-xs font-normal shadow-lg">
                {discountText}
              </div>
            )}
          </div>
          <div className="text-center flex items-center font-Bold gap-1 md:text-lg font-medium whitespace-nowrap">
            {finalPrice !== undefined &&
              `${Number(finalPrice).toLocaleString("fa-IR")} `}
            <h3 className="md:text-sm text-xs">تومانء</h3>
          </div>
        </div>

        <div className="grid gap-2 w-full px-4 justify-items-center md:row-start-4 col-span-2 md:col-span-3 col-start-2 md:col-start-1 ">
          {isInCart ? (
            <div className="flex items-start gap-2 h-[44px] ">
              <div className="flex items-center justify-between w-24 h-10 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => {
                    if (count >= maxQuantity) {
                      toast.error("حداکثر تعداد قابل سفارش رسید");
                      return;
                    }
                    const newCount = count + 1;

                    setCount(newCount);
                    handleAddToCart(newCount);
                  }}
                  className="w-10 h-full flex items-center justify-center text-xl text-gray-700"
                  type="button"
                >
                  +
                </button>

                <span className="flex-1 text-center font-bold text-lg text-gray-700">
                  {isPending ? <SmallLoading /> : count}
                </span>

                <button
                  onClick={() => {
                    const newCount = count - 1;
                    if (newCount < minQuantity) {
                      if (!matchedCartItemId) {
                        return;
                      }

                      deleteCartItem(String(matchedCartItemId), {
                        onSuccess: () => {
                          toast.success("کالا با موفقیت حذف شد");
                        },
                        onError: () => {
                          toast.error("خطا در حذف کالا");
                        },
                      });
                    } else {
                      setCount(newCount);
                      handleAddToCart(newCount);
                    }
                  }}
                  className="w-10 h-full flex items-center justify-center text-xl text-gray-700"
                  type="button"
                >
                  {isPendingDeleteCart ? (
                    <SmallLoading />
                  ) : count === minQuantity ? (
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

              <div className="flex flex-col md:text-sm text-xs">
                <p className="text-gray-500">در سبد خرید شما</p>
                <button
                  onClick={handleNavigateToCart}
                  className="text-green-600 font-semibold  mt-1 hover:underline"
                  type="button"
                >
                  مشاهده سبد خرید
                </button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => handleAddToCart()}
              className="bg-emerald-600 text-white w-full py-2 text-sm font-Medium  rounded-md font-semibold"
              type="button"
            >
              {isPending ? <SmallLoading /> : "افزودن به سبد خرید "}
            </Button>
          )}
        </div>
      </>
    </div>
  );
}

export default ProductActionBox;
