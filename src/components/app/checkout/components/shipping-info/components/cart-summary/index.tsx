"use client";
import { SmallLoading } from "@/components/base/loading/SmallLoading";
import { useCartStore } from "@/stores/useCartStore";
import clsxm from "@/utils/clsxm";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
interface cartSummaryType {
  installmentStatus?: boolean;
  cartTotal: number;
  isSwitchChecked?: boolean;
}
function CartSummary({
  installmentStatus,
  cartTotal,
  isSwitchChecked,
}: cartSummaryType) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const { watch } = useFormContext();
  const formData = watch();
  const isDeliveryInvalid =
    !formData.deliveryType || // اگر نوع تحویل انتخاب نشده باشد
    (formData.deliveryType === "1" &&
      (!formData.shippingId || !formData.packagingType)) || // اگر نوع تحویل "ارسال مرسوله" باشد و اطلاعات ناقص باشد
    (formData.deliveryType === "2" &&
      (!formData.vendorId || !formData.packagingType)); // اگر نوع تحویل "تحویل حضوری" باشد و اطلاعات ناقص باشد

  const isSwitchInvalid =
    isSwitchChecked && (!formData.wrappingPaper || !formData.kartPastal); // اگر گزینه‌های کادو یا کارت انتخاب نشده باشد

  const isPaymentInvalid =
    !formData.paymentMethod || // اگر روش پرداخت انتخاب نشده باشد
    (formData.paymentMethod === "1" && !formData.selectedGateway) || // اگر روش پرداخت "درگاه بانکی" باشد و درگاه انتخاب نشده باشد
    (formData.paymentMethod === "3" && !installmentStatus); // اگر روش پرداخت "اقساطی" باشد و وضعیت اقساط نامعتبر باشد

  let isDisabled;
  if (pathname === "/checkout/shipping") {
    isDisabled = isDeliveryInvalid || isSwitchInvalid;
  } else if (pathname === "/checkout/payment") {
    isDisabled = isPaymentInvalid;
  }
  const  getButtonText = () => {
    if (pathname === "/checkout/shipping") {
      if (!formData.deliveryType) {
        return "انتخاب نحوه دریافت سفارش";
      }
      // بررسی نحوه دریافت سفارش
      if (formData.deliveryType === "1") {
        if (!formData.shippingId) return "انتخاب شیوه ارسال سفارش";
        if (!formData.packagingType) return "انتخاب نوع بسته‌بندی";
      }

      if (formData.deliveryType === "2") {
        if (!formData.vendorId) return "انتخاب محل تحویل";
        if (!formData.packagingType) return "انتخاب نوع بسته‌بندی";
      }

      // بررسی گزینه‌های اضافی هنگام فعال بودن سوئیچ
      if (isSwitchChecked) {
        if (!formData.wrappingPaper) return "انتخاب کاغذ کادو";
        if (!formData.kartPastal) return "انتخاب کارت پستال";
      }
      return "تایید و تکمیل سفارش";
    }

    if (pathname === "/checkout/payment") {
      // بررسی نحوه پرداخت
      if (!formData.paymentMethod) return "انتخاب نحوه پرداخت";

      if (formData.paymentMethod === "1" && !formData.selectedGateway) {
        return "نوع درگاه رو انتخاب کنید";
      }

      if (formData.paymentMethod === "3" && !installmentStatus) {
        return "فاقد اعتبار";
      }

      return "تایید و تکمیل سفارش";
    }
  };

  const buttonClass = clsxm(
    "w-full border py-3 font-semibold px-6 rounded-md transition-all duration-300",
    isDisabled
      ? "border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
      : "bg-emerald-500 text-white"
  );
  const {
    totalPrice,
    totalQuantity,
    shippingCost,
    packagingCost,
    giftWrapCost,
  } = useCartStore();

  useEffect(() => {
    setIsMounted(true); // این باعث می‌شه فقط بعد از mount کلاینت مقدار state خونده بشه
  }, []);
  const totalFinal =
    (totalPrice || 0) +
    (shippingCost || 0) +
    (packagingCost || 0) +
    (giftWrapCost || 0);

  return (
    <div className="relative">
      <div className="flex flex-col bg-gradient-to-br from-white to-gray-25 border border-gray-200 shadow-primary overflow-hidden md:sticky left-9 mt-16 top-1 transition-all duration-300 hover:shadow-lg rounded-md min-w-80 ">
        {/* Header */}
        <div className="bg-gradient-to-l from-emerald-500 to-secondary-500 px-5 py-3 flex flex-col gap-6 font-Medium text-gray-800">
          <h2 className="text-white font-Bold text-base md:text-lg flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            خلاصه سفارش
          </h2>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-3">
          {/* Product Price */}
          <div className="flex items-center justify-between py-2 group">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-2 group-hover:h-2"></div>
              <span className="text-gray-700 font-Medium text-sm">
                قیمت کالاها
                {isMounted && (
                  <span className="text-xs text-gray-500 mr-1">
                    ({totalQuantity})
                  </span>
                )}
              </span>
            </div>
            <span className="text-gray-800 font-Bold text-sm">
              {isMounted ? (
                `${totalPrice.toLocaleString("fa-IR")} تومان`
              ) : (
                <SmallLoading />
              )}
            </span>
          </div>

          {/* Shipping Cost */}
          {shippingCost > 0 && (
            <div className="flex items-center justify-between py-2 group animate-slideUp">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 transition-all duration-300 group-hover:w-2 group-hover:h-2"></div>
                <span className="text-gray-700 font-Medium text-sm">
                  هزینه ارسال
                </span>
              </div>
              <span className="text-gray-800 font-Bold text-sm">
                {isMounted ? (
                  `${shippingCost.toLocaleString("fa-IR")} تومان`
                ) : (
                  <SmallLoading />
                )}
              </span>
            </div>
          )}

          {/* Packaging Cost */}
          {packagingCost > 0 && (
            <div className="flex items-center justify-between py-2 group animate-slideUp">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 transition-all duration-300 group-hover:w-2 group-hover:h-2"></div>
                <span className="text-gray-700 font-Medium text-sm">
                  هزینه بسته‌بندی
                </span>
              </div>
              <span className="text-gray-800 font-Bold text-sm">
                {isMounted ? (
                  `${packagingCost.toLocaleString("fa-IR")} تومان`
                ) : (
                  <SmallLoading />
                )}
              </span>
            </div>
          )}

          {/* Gift Wrap Cost */}
          {giftWrapCost > 0 && (
            <div className="flex items-center justify-between py-2 group animate-slideUp">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-warning-500 transition-all duration-300 group-hover:w-2 group-hover:h-2"></div>
                <span className="text-gray-700 font-Medium text-sm">
                  هزینه کادوپیچی
                </span>
              </div>
              <span className="text-gray-800 font-Bold text-sm">
                {isMounted ? (
                  `${giftWrapCost.toLocaleString("fa-IR")} تومان`
                ) : (
                  <SmallLoading />
                )}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-gray-300"></div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-br from-emerald-50 to-secondary-100/30 rounded-xl px-4 py-3 border border-emerald-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-800 font-Bold text-base flex items-center gap-2">
                جمع نهایی
              </span>
              <span className="text-emerald-700 font-black text-md">
                {isMounted ? (
                  totalFinal.toLocaleString("fa-IR")
                ) : (
                  <SmallLoading />
                )}
                <span className="text-sm mr-1">تومان</span>
              </span>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="px-5 pb-5 md:pb-4 ">
          <div className="w-full fixed md:static left-0 right-0 bg-white md:bg-transparent bottom-0 z-50 px-5 py-3 md:py-0 md:px-0 border-t md:border-0 border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none">
            <button
              type="submit"
              className={clsxm(
                "w-full py-3.5 px-6 rounded-xl font-Bold text-sm md:text-base transition-all duration-300 transform",
                "shadow-md hover:shadow-lg active:scale-[0.98]",
                "flex items-center justify-center gap-2",
                isDisabled
                  ? "bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  : "bg-gradient-to-l from-emerald-500 to-secondary-500 text-white hover:from-emerald-600 hover:to-secondary-600"
              )}
            >
              {!isDisabled && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
