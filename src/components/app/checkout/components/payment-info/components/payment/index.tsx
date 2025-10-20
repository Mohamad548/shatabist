"use client";
import React, { useEffect, useRef, useState } from "react";
import clsxm from "@/utils/clsxm";
import Switch from "@/components/base/switch";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";
import {
  useCreateOrder,
  useCreatePayment,
  useCreatePaymentRedirectUrl,
  useGetCart,
} from "@/components/app/profile-user/hooks";
import toast from "react-hot-toast";
import { useOrderStore } from "@/stores/useOrderStore";
import CartSummary from "../../../shipping-info/components/cart-summary";
import InvoicePreview from "../Invoice-preview";
import InactiveInstallment from "../Installment-payment/inactive-installment";
import ActiveInstallment from "../Installment-payment/active-installment";
import PaymentMethod from "../payment-method";
import RadioCard from "../../../shipping-info/components/base/radio-card";
import Image from "next/image";
import Link from "next/link";
import PaymentRedirectEmpty from "../payment-redirect-empty";

interface PaymentResponse {
  message: string;
  success: boolean;
  paymentId: number;
}
type ErrorResponse = {
  status?: number;
  message?: string;
  success?: boolean;
  response?: {
    data?: {
      message?: string;
    };
  };
};

interface FinalOrderData {
  deliveryType: string;
  packagingType: string;
  wrapping: number;
  userAddressId: number;
  shippingId: number;
  cartId: number;
}
interface RedirectResponse {
  url: string;
}

function Payment() {
  const router = useRouter();
  const { cartId } = useCartStore();
  const { mutate: createPayment } = useCreatePayment();
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const {
    data: redirectData,
    isSuccess,
    isLoading,
  } = useCreatePaymentRedirectUrl(paymentId ?? 0);
  useEffect(() => {
    if (isSuccess && redirectData?.paymentUrl) {
      router.push(redirectData.paymentUrl);
    }
  }, [isSuccess, redirectData?.paymentUrl, router]);
  const { data: dataCart, isPending: isPendingCart } = useGetCart();
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false);
  const pi = 100000;
  const installmentStatus = true; /// در سینگل پروداگت استفاده شده
  const prePayment = true; // وضعیت پیش پرداخت
  const cartInventory = 10000000; ///موجودی اعتبار قسطی
  let cartTotal = 10000000; // مبلغ کل سبد خرید
  const monthlyProfit = 3.3; // درصد سود ماهانه
  if (isSwitchChecked) {
    cartTotal = cartTotal - pi;
  }
  const minPrePayment = cartTotal * 0.1; // حداقل پیش‌پرداخت ۱۰٪ از cartTotal

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const radioRefs = useRef<{ [key: string]: HTMLLabelElement | null }>({});
  const formData = watch();
  const installments = formData.installments; // watch('installments');
  const amount = watch("amount", minPrePayment);
  const installmentProfit =
    (cartTotal - amount) * (monthlyProfit / 100) * +installments;
  // محاسبه مبلغ نهایی
  const finalAmount = cartTotal - amount + installmentProfit;
  // محاسبه مبلغ هر قسط
  const installmentAmount = finalAmount / +installments;
  const handleSwitchChange = () => {
    setIsSwitchChecked((prev) => !prev);
  };
  const { orderData, clearOrderData } = useOrderStore();

  const { mutate: createOrder } = useCreateOrder();
  const onSubmit = async () => {
    if (!orderData) {
      toast.error("اطلاعات سفارش یافت نشد.");
      return;
    }

    // مرحله ۱: ساخت سفارش
    createOrder(orderData as FinalOrderData, {
      onSuccess: (orderRes: any) => {
        const orderId = orderRes?.orderId;
        if (!orderId) {
          toast.error("سفارش ساخته نشد.");
          return;
        }

        // مرحله ۲: ساخت پرداخت
        const paymentMethodMap: { [key: string]: string } = {
          "1": "ONLINE",
          "2": "CASH_ON_DELIVERY",
        };

        const apiPaymentMethod = paymentMethodMap[formData.paymentMethod];

        const paymentData = {
          method: apiPaymentMethod,
          orderId: Number(orderId),
        };

        createPayment(paymentData, {
          onSuccess: (response: PaymentResponse) => {
            if (response.success && response.paymentId) {
              setPaymentId(response.paymentId);
              clearOrderData();
              useCartStore.getState().resetCart();
            }
          },
          onError: (err: ErrorResponse) => {
            const errorMessage =
              err?.response?.data?.message === "this order already has payment"
                ? "برای این سفارش قبلاً پرداخت ثبت شده است."
                : err?.response?.data?.message ||
                  "مشکلی پیش آمده، لطفاً دوباره تلاش کنید.";

            toast.error(errorMessage);
          },
        });
      },
      onError: (err: ErrorResponse) => {
        const errorMessage =
          err?.response?.data?.message ===
          "Requested quantity for variant ID 13 exceeds available stock"
            ? "تعداد کالا بیشتر از موجودی است"
            : "";
        toast.error(errorMessage);
      },
    });
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
      { key: "paymentMethod", ref: "1" },
      { key: "selectedGateway", ref: "8" },
      { key: "creditActivation", ref: "creditActivation" }, // اضافه کردن این خط
    ];
    for (const error of errorMapping) {
      if (errors[error.key]) {
        scrollToError(error.ref); // اسکرول به ارجاع
        break;
      }
    }
  };
  const options = [
    {
      id: "1",
      title: "پرداخت آنلاین",
      description: "پرداخت از طریق درگاه بانکی شاپرک",
    },
    {
      id: "2",
      title: "پرداخت در محل",
      description:
        "30% سفارش به صورت آنلاین پرداخت و مابقی در هنگام تحویل سفارش به واسطه دستگاه پز دریافت خواهد شد",
    },
    {
      id: "3",
      title: "پرداخت اقساطی",
      description: `موجودی ${cartInventory.toLocaleString("fa-IR")} تومانء`,
    },
  ];
  // تابع برای ریست کردن فیلدها
  const resetFields = (value: string = "") => {
    setValue("selectedGateway", "");
    setValue("amount", minPrePayment);
    setValue("installments", value);
    setValue("paymentMethod", "");
  };
  // تابع تغییر deliveryType
  const handleDeliveryTypeChange = (value: string) => {
    setIsSwitchChecked(false);
    resetFields();
    setValue("paymentMethod", value);
  };

  if (isPendingCart) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <h3 className="text-gray-600">در حال بارگذاری...</h3>
      </div>
    );
  }
  const primaryCart = dataCart?.userCarts?.find(
    (cart: { prioIndex: number }) => cart.prioIndex === 0
  );
  return (
    <>
      {!primaryCart || primaryCart.items.length === 0 ? (
        <PaymentRedirectEmpty />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex relative flex-col md:flex-row justify-between gap-8 lg:px-40 md:px-20 px-4 py-6 select-none"
        >
          <div className="w-full flex flex-col gap-6">
            {/* {دکمه بازگشت } */}
            <div className="flex">
              <Link
                href={`shipping${cartId ? `?id=${cartId}` : ""}`}
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
                <h3>بازگشت به اطلاعات ارسال</h3>
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              <div
                className={clsxm(
                  "border flex flex-col gap-4 rounded-md py-4 px-3",
                  errors.paymentMethod ? "border-red-400" : "border-gray-300"
                )}
              >
                <h3 className="font-semibold text-base text-gray-800">
                  نحوه پرداخت
                </h3>
                {options?.map((option : { id: string; title: string; description: string }) => (
                  <RadioCard
                    key={option.id}
                    id={option.id}
                    title={option.title}
                    description={option.description}
                    selectedOption={formData.paymentMethod}
                    radioRef={(el) => (radioRefs.current[option.id] = el)}
                    register={register("paymentMethod", {
                      required: "لطفاً نوع پرداخت را انتخاب کنید.",
                      onChange: (e) => handleDeliveryTypeChange(e.target.value),
                    })}
                  />
                ))}
                {errors.paymentMethod && // تغییر به shippingId
                  typeof errors.paymentMethod.message === "string" && ( // تغییر به shippingId
                    <p className="text-red-500 text-sm pt-2">
                      {errors.paymentMethod.message} {/* تغییر به shippingId */}
                    </p>
                  )}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Switch
                      checked={isSwitchChecked}
                      onChange={handleSwitchChange}
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        استفاده از موجودی کیف پول
                      </h3>
                      <span className="font-regular text-xs text-gray-600">
                        {` موجودی: ${pi.toLocaleString("fa-IR")} تومانء`}
                      </span>
                    </div>
                  </div>
                </div>
                {formData.paymentMethod === "1" && (
                  <PaymentMethod radioRefs={radioRefs} />
                )}
                {formData.paymentMethod === "3" && installmentStatus ? (
                  <ActiveInstallment
                    amount={amount}
                    finalAmount={finalAmount}
                    installmentAmount={installmentAmount}
                    cartTotal={cartTotal}
                    installments={installments}
                    minPrePayment={minPrePayment}
                    prePayment={prePayment}
                  />
                ) : (
                  formData.paymentMethod === "3" && (
                    <InactiveInstallment
                      radioRef={(el: HTMLLabelElement | null) => {
                        if (el) {
                          radioRefs.current["creditActivation"] = el;
                        }
                      }}
                    />
                  )
                )}
                {!formData.paymentMethod ||
                (formData.paymentMethod === "3" && !installmentStatus) ||
                (formData.paymentMethod === "1" &&
                  !formData.selectedGateway) ? (
                  ""
                ) : (
                  <InvoicePreview />
                )}
              </div>
            </div>
          </div>
          <CartSummary
            installmentStatus={installmentStatus}
            cartTotal={cartTotal}
          />
        </form>
      )}
    </>
  );
}
export default Payment;
