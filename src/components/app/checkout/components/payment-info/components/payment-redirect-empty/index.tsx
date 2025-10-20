"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useGetOrders,
  useCreatePayment,
  useCreatePaymentRedirectUrl,
} from "@/components/app/profile-user/hooks";
import { Order, OrderItem } from "@/types/types";
import { BASE_URL } from "@/constants/url";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ShataLoading from "@/components/base/loading/shata-loading";

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

function PaymentRedirectEmpty() {
  const router = useRouter();
  const { data: ordersData, isPending } = useGetOrders("PENDING");
  const { mutate: createPayment, isPending: isCreatingPayment } =
    useCreatePayment();
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [retryingOrderId, setRetryingOrderId] = useState<number | null>(null);

  const { data: redirectData, isSuccess } = useCreatePaymentRedirectUrl(
    paymentId ?? 0
  );

  useEffect(() => {
    if (isSuccess && redirectData?.paymentUrl) {
      router.push(redirectData.paymentUrl);
    }
  }, [isSuccess, redirectData?.paymentUrl, router]);

  const handlePayAgain = (orderId: number) => {
    setRetryingOrderId(orderId);

    const paymentData = {
      method: "ONLINE",
      orderId: orderId,
    };

    createPayment(paymentData, {
      onSuccess: (response: PaymentResponse) => {
        if (response.success && response.paymentId) {
          setPaymentId(response.paymentId);
          toast.success("در حال انتقال به درگاه پرداخت...");
        }
      },
      onError: (err: ErrorResponse) => {
        setRetryingOrderId(null);
        const errorMessage =
          err?.response?.data?.message === "this order already has payment"
            ? "برای این سفارش قبلاً پرداخت ثبت شده است."
            : err?.response?.data?.message ||
              "مشکلی پیش آمده، لطفاً دوباره تلاش کنید.";
        toast.error(errorMessage);
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-20">
        <ShataLoading size="medium" text="در حال بارگذاری..." />
      </div>
    );
  }

  // Get the most recent pending order
  const pendingOrders = ordersData?.orders || [];
  const mostRecentOrder =
    pendingOrders.length > 0
      ? [...pendingOrders].sort(
          (a: Order, b: Order) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0]
      : null;

  if (!mostRecentOrder) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4">
        <div className="w-32 h-32 mb-6 opacity-20">
          <Image
            src="/svg/checkout/empty-cart.svg"
            width={128}
            height={128}
            alt="خالی"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-gray-600 text-lg font-semibold text-center">
          سبد خرید شما خالی است.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <svg
            className="w-8 h-8 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
          پرداخت در انتظار تکمیل
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          سفارش شما ثبت شده اما پرداخت هنوز تکمیل نشده است
        </p>
      </div>

      {/* Order Card */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Order Header */}
        <div className="bg-gradient-to-l from-yellow-50 via-orange-50 to-yellow-50 border-b-2 border-yellow-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-Bold border-2 bg-yellow-100 text-yellow-800 border-yellow-300 w-fit">
                <svg
                  className="w-4 h-4 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                در انتظار پرداخت
              </span>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center gap-1 font-medium">
                  <span className="text-gray-500">شماره سفارش:</span>
                  <span className="text-gray-800 font-Bold">
                    {mostRecentOrder.id}
                  </span>
                </span>
                <span className="text-gray-400">•</span>
                <span className="font-medium">
                  {new Date(mostRecentOrder.created_at).toLocaleDateString(
                    "fa-IR"
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end">
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                مبلغ قابل پرداخت
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-xl md:text-2xl font-black text-gray-900">
                  {(mostRecentOrder.totalPrice / 10)?.toLocaleString("fa-IR")}
                </p>
                <span className="text-sm font-medium text-gray-600">تومان</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-6">
          <h3 className="text-base font-Bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-5 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
            کالاهای سفارش ({mostRecentOrder.orderItems.length})
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {mostRecentOrder.orderItems.map((item: OrderItem) => {
              const imageUrl = item.variant?.image
                ? `${BASE_URL}${item.variant.image}`
                : "/images/Products/default-product.webp";

              return (
                <div
                  key={item.id}
                  className="group relative bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-primary-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="aspect-square relative bg-white p-3 w-10 h-10">
                    <Image
                      src={imageUrl}
                      fill
                      className="object-contain"
                      alt={item.variant?.product?.title || "محصول"}
                      quality={100}
                    />
                  </div>
                  <div className="p-3 border-t border-gray-200 bg-white">
                    <p className="text-xs font-medium text-gray-800 line-clamp-2 mb-1 min-h-[2.5rem]">
                      {item.variant?.product?.title || "محصول"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        تعداد: {item.quantity}
                      </span>
                      {item.variant?.color && (
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{
                            backgroundColor: item.variant.color.color,
                          }}
                          title={`${item.variant.color.mainColor} (${item.variant.color.subColor})`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-dashed border-gray-200">
            <button
              onClick={() => handlePayAgain(mostRecentOrder.id)}
              disabled={
                isCreatingPayment || retryingOrderId === mostRecentOrder.id
              }
              className="flex-1 sm:flex-none bg-gradient-to-l from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-Bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
            >
              {retryingOrderId === mostRecentOrder.id ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>در حال انتقال...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>پرداخت مجدد</span>
                </>
              )}
            </button>

            <button
              onClick={() => router.push("/profile-user/orders")}
              className="sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-Bold py-4 px-6 rounded-xl transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center gap-2"
            >
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>مشاهده سفارش‌ها</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-Bold text-blue-900 mb-1">
            راهنمای پرداخت
          </h4>
          <p className="text-xs text-blue-700 leading-relaxed">
            با کلیک روی دکمه "پرداخت مجدد" به درگاه بانکی منتقل می‌شوید. پس از
            پرداخت موفق، سفارش شما پردازش و ارسال خواهد شد.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentRedirectEmpty;
