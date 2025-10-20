import React, { useEffect } from "react";
import RadioCard from "../base/radio-card";
import clsxm from "@/utils/clsxm";
import { UseFormRegister, useWatch } from "react-hook-form";
import { useGetShippingTypeByCityId } from "@/components/app/profile-user/hooks";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";

interface ShippingType {
  id: number;
  name: string;
  title: string;
  price: string;
  description: string;
}

interface DeliveryMethodType {
  errors: Record<string, any>;
  shippingId: string;
  radioRefs: React.MutableRefObject<Record<string, HTMLLabelElement | null>>;
  register: UseFormRegister<Record<string, any>>;
  cityId: string | null;
}

function DeliveryMethod({
  errors,
  register,
  shippingId,
  radioRefs,
  cityId,
}: DeliveryMethodType) {
  const { data, isLoading } = useGetShippingTypeByCityId(cityId || "");
  const { shippings } = data || {};

  const setShippingCost = useCartStore((state) => state.setShippingCost);

  const watchedShippingId = useWatch({ name: "shippingId" });

  useEffect(() => {
    if (!watchedShippingId) {
      setShippingCost(0);
    }
  }, [watchedShippingId, setShippingCost]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = e.target.value;
    const selectedShipping = shippings?.find(
      (item: { id: { toString: () => string } }) =>
        item.id.toString() === selectedId
    );
    if (selectedShipping) {
      const cost = parseInt(selectedShipping.price, 10) || 0;
      setShippingCost(cost);
    } else {
      setShippingCost(0);
    }
  };

  return (
    <div
      className={clsxm(
        "bg-white rounded-xl border-2 transition-all duration-200 p-6 shadow-sm",
        Object.keys(errors).includes("shippingId")
          ? "border-red-200 bg-red-50/30"
          : "border-gray-100 hover:border-gray-200 hover:shadow-md"
      )}
    >
      {/* Header with gradient accent */}
      <div className="flex items-center gap-3 mb-6">
      <div className="flex justify-center items-center w-6 h-6  bg-green-600 rounded-full text-white text-sm font-black">2</div>
        <h3 className="font-bold text-lg text-gray-900">شیوه ارسال سفارش</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse bg-gray-100 rounded-lg h-16 w-full"
            ></div>
          ))}
        </div>
      )}

      {/* Delivery methods grid */}
      {!isLoading && (
        <div className="space-y-4">
          {shippings?.map((item: ShippingType, index: number) => (
            <div key={item.id} className={clsxm(" overflow-hidden")}>
              <RadioCard
                name={item.name}
                id={item.id.toString()}
                title={item.title}
                price={item.price}
                description={item.description}
                selectedOption={shippingId}
                radioRef={(el) => (radioRefs.current[item.id] = el)}
                register={register("shippingId", {
                  required: "لطفاً یکی از شیوه‌های ارسال را انتخاب کنید.",
                  onChange: handleChange,
                })}
              />
            </div>
          ))}
        </div>
      )}

      {/* No shipping options available */}
      {!isLoading && (!shippings || shippings.length === 0) && (
        <div className="rounded-xl border-2 border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100/60">
            <div className="relative h-8 w-8">
              <Image
                src="/svg/locationx.svg"
                alt="location"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h4 className="mb-2 text-base font-bold text-gray-800">
            هنوز آدرسی ثبت نشده است
          </h4>
          <p className="mx-auto mb-5 max-w-md text-sm text-gray-600">
            برای مشاهده روش‌های ارسال، ابتدا آدرس خود را در تب بالا ثبت کنید.
          </p>
        </div>
      )}

      {/* Enhanced error message */}
      {errors.shippingId && typeof errors.shippingId.message === "string" && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-red-500">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-red-700 text-sm font-medium">
              {errors.shippingId.message}
            </p>
          </div>
        </div>
      )}

      {/* Subtle footer info */}
      {!isLoading && shippings && shippings.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            {shippings.length} شیوه ارسال در دسترس
          </p>
        </div>
      )}
    </div>
  );
}

export default DeliveryMethod;
