"use client";
import {
  useCreateOrder,
  useGetAddress,
} from "@/components/app/profile-user/hooks";
import { AddressType } from "@/constants/mock-data/profile";
import { useCartStore } from "@/stores/useCartStore";
import clsxm from "@/utils/clsxm";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

import { useOrderStore } from "@/stores/useOrderStore";
import RadioCard from "../base/radio-card";
import AddressForm from "../address-form";
import DeliveryMethod from "../delivery-method";
import StoreLocation from "../store-location/inedx";
import PackagingType from "../packaging-type";
import CartSummary from "../cart-summary";

export function Shipping() {
  const searchParams = useSearchParams();
  const urlCartId = searchParams.get("id");
  const { cartId: storedCartId } = useCartStore();
  // استفاده از cartId از URL اول، اگر نبود از localStorage
  const cartId = urlCartId || storedCartId;
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const { setOrderData } = useOrderStore();
  const radioRefs = useRef<{ [key: string]: HTMLLabelElement | null }>({});
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false);
  const formData = watch();
  const router = useRouter();
  const { data: addressData } = useGetAddress();
  const addresses = addressData?.userAddresses || [];
  interface FormData {
    deliveryType: string;
    packagingType: string;
    wrappingId: number;
    userAddresses: AddressType;
    shippingId: number | null;
    vendorId: number | undefined;
    kartPastal: boolean;
    wrappingPaper: number;
  }
  const onSubmit = (data: FormData) => {
    if (!isSwitchChecked) {
      const { kartPastal, wrappingPaper, ...rest } = data;
      data = rest as FormData;
    }

    // Common order data
    const commonOrderData = {
      deliveryType:
        data?.deliveryType === "1" ? "SEND_BY_COURIER" : "PICKUP_IN_STORE",
      packagingType:
        data?.packagingType === "6"
          ? "ECONOMIC"
          : data?.packagingType === "7"
            ? "IRON"
            : data?.packagingType === "8"
              ? "NOPACK"
              : "",
      ...(isSwitchChecked && { wrapping: Number(data?.wrappingPaper) }),
      cartId: Number(cartId),
    };

    // Specific for deliveryType === "1" (SEND_BY_COURIER)
    const courierOrderData = {
      ...commonOrderData,
      shippingId: data?.shippingId ? Number(data?.shippingId) : 1,
      userAddressId: data?.userAddresses?.id || addresses?.[0]?.id || 1,
    };

    // Specific for deliveryType === "2" (PICKUP_IN_STORE)
    const pickupOrderData = {
      ...commonOrderData,
      vendorId: data?.vendorId ? Number(data?.vendorId) : 1,
    };

    // Select final object based on deliveryType
    const finalOrderData =
      data?.deliveryType === "1" ? courierOrderData : pickupOrderData;

    // ذخیره در استور
    setOrderData(finalOrderData, isSwitchChecked);

    // بعد از ذخیره مستقیم برو صفحه پرداخت
    router.push("/checkout/payment");

    // createOrder(finalOrderData as FinalOrderData, {
    //   onSuccess: (data) => {
    //     router.push(`payment?id=${data?.orderId || ""}`);
    //     // router.push("/checkout/payment");
    //   },
    // });
  };

  const [cityId, setCityId] = useState<string | null>(null);

  // تابع تغییر آدرس
  const handleAddressChange = (selectedAddress: AddressType) => {
    if (formData.deliveryType === "1") {
      // اگر deliveryType برابر با '1' باشد، آدرس را به داده‌های فرم اضافه می‌کنیم
      setValue("userAddresses", selectedAddress); // ثبت آدرس انتخاب‌شده در فرم
      setCityId(selectedAddress.city?.id?.toString() || null); // استخراج city id
    }
  };
  const scrollToError = (key: string) => {
    if (radioRefs.current[key]) {
      radioRefs.current[key]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const onError = (errors: any) => {
    const errorMapping = [
      { key: "deliveryType", ref: "1" },
      { key: "shippingId", ref: "3" },
      { key: "packagingType", ref: "6" },
      { key: "wrappingPaper", ref: "8", condition: isSwitchChecked },
      { key: "kartPastal", ref: "12", condition: isSwitchChecked },
      { key: "vendorId", ref: "16" },
    ];

    for (const error of errorMapping) {
      if (
        errors[error.key] &&
        (error.condition === undefined || error.condition)
      ) {
        scrollToError(error.ref);
        break;
      }
    }
  };
  const options = [
    {
      id: "1",
      title: "ارسال مرسوله",
      // description: "سفارش شما در کمترین زمان ممکن به آدرس شما ارسال خواهد شد.",
    },
    {
      id: "2",
      title: "تحویل حضوری",
      description:
        "می‌توانید در روزهای کاری از ساعت 9 صبح تا 6 عصر به فروشگاه ما مراجعه کنید.",
    },
  ];

  // تابع برای ریست کردن فیلدها
  const resetFields = () => {
    setValue("shippingId", false);
    setValue("packagingType", false);
    setValue("wrappingPaper", false);
    setValue("kartPastal", false);
    setValue("vendorId", false);
    setValue("userAddresses", false);
  };

  // تابع تغییر deliveryType
  const handleDeliveryTypeChange = (value: string) => {
    setIsSwitchChecked(false);
    resetFields(); // تمام مقادیر مرتبط را ریست می‌کنیم
    setValue("deliveryType", value); // فقط deliveryType را به روز رسانی می‌کنیم
  };
  const {
    totalPrice,
    totalQuantity,
    setShippingCost,
    setPackagingCost,
    setGiftWrapCost,
  } = useCartStore();
  useEffect(() => {
    if (formData.deliveryType !== "1") {
      setShippingCost(0);
      setPackagingCost(0);
      setGiftWrapCost(0);
    }
  }, [
    formData.deliveryType,
    setGiftWrapCost,
    setPackagingCost,
    setShippingCost,
  ]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>, onError)}
      className="flex relative flex-col md:flex-row justify-between gap-8 lg:px-40 md:px-20 px-4 py-6 select-non bg-white"
    >
      <div className="md:w-4/5 flex flex-col gap-6">
        {/* {دکمه بازگشت } */}
        <div className="flex">
          <Link
            href={`cart${cartId ? `?id=${cartId}` : ""}`}
            className="flex gap-1 mt-2 py-2 px-4  text-primary-500 font-regular text-xs select-none cursor-pointer 
                    rounded-md border border-transparent hover:border-primary-500 
                    transition-all box-border"
          >
            <div className="relative h-4 w-4 rotate-180 ">
              <Image
                src="/svg/arrow-left-green.svg"
             fill
    style={{ objectFit: "contain" }}
                alt="Phone Icon"
                quality={100}
              />
            </div>
            <h3>بازگشت به سبد خرید</h3>
          </Link>
        </div>
        <div
          className={clsxm(
            "border flex flex-col gap-4 rounded-md py-4 px-3",
            Object.keys(errors).includes("deliveryType")
              ? "border-red-400"
              : "border-gray-300"
          )}
        >
          {/* Header with gradient accent */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex justify-center items-center w-6 h-6  bg-green-600 rounded-full text-white text-sm font-black">
              1
            </div>
            <h3 className="font-bold text-base md:text-lg text-gray-900">
              {" "}
              نحوه دریافت سفارش
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
          </div>

          {options.map((option) => (
            <RadioCard
              key={option.id}
              id={option.id}
              title={option.title}
              description={option.description}
              selectedOption={formData.deliveryType}
              radioRef={(el) => {
                radioRefs.current[option.id] = el;
              }} // داینامیک کردن رفرنس‌ها
              register={register("deliveryType", {
                // تغییر به deliveryType
                required: "لطفاً یکی از روش‌های ارسال را انتخاب کنید.",
                onChange: (e) => handleDeliveryTypeChange(e.target.value),
              })}
            />
          ))}
          {errors.deliveryType && // تغییر به deliveryType
            typeof errors.deliveryType.message === "string" && ( // تغییر به deliveryType
              <p className="text-red-500 text-sm pt-2">
                {errors.deliveryType.message} {/* تغییر به deliveryType */}
              </p>
            )}
        </div>

        {formData.deliveryType === "1" && (
          <>
            {/* انتخاب آدرس */}
            <AddressForm onAddressSelect={handleAddressChange} />
            {/* انتخاب شیوه ارسال */}
            <DeliveryMethod
              errors={errors}
              register={register}
              shippingId={formData.shippingId}
              radioRefs={radioRefs}
              cityId={cityId}
            />
          </>
        )}
        {formData.deliveryType === "2" && (
          <StoreLocation
            errors={errors}
            register={register}
            vendorId={formData.vendorId}
            radioRefs={radioRefs}
          />
        )}
        {/* انتخاب نوع بسته‌بندی */}
        {formData.deliveryType && (
          <PackagingType
            radioRefs={radioRefs}
            setIsSwitchChecked={setIsSwitchChecked}
            isSwitchChecked={isSwitchChecked}
          />
        )}
      </div>

      <CartSummary cartTotal={20000} isSwitchChecked={isSwitchChecked} />
    </form>
  );
}
