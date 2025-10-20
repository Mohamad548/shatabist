'use client';
import {
  useGetOrdersByUserId,
  useCreatePayment,
  useCreatePaymentRedirectUrl,
} from '@/components/app/profile-user/hooks';
import AddressesCard from '@/components/base/addresses-card';
import CopyToClipboard from '@/components/base/copy-to-clipboard';
import HeadContentProfile from '@/components/base/head-content-profile';
import ShataLoading from '@/components/base/loading/shata-loading';
import ManageModal from '@/components/base/modal';
import { BASE_URL } from '@/constants/url';
import { useCartStore } from '@/stores/useCartStore';
import { OrderItem } from '@/types/types';
import clsxm from '@/utils/clsxm';
import { toLocalDateString, toLocalTimeString } from '@/utils/toLocalDate';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const ORDER_STATUS_OPTIONS = [
  {
    value: 'payment',
    label: 'درانتظار پرداخت',
    color: 'warning',
    inProgess: true,
  },
  {
    value: 'processing',
    label: 'درحال‌پردازش',
    color: 'warning',
    inProgess: true,
  },
  {
    value: 'wrapping',
    label: 'بسته‌بندی‌شده',
    color: 'warning',
    inProgess: true,
  },
  {
    value: 'delivered_to_shipping',
    label: 'ارسال‌شده',
    color: 'warning',
    inProgess: true,
  },
  {
    value: 'completed',
    label: 'تکمیل‌شده',
    color: 'success',
    inProgess: false,
  },
  { value: 'refunded', label: 'مرجوع‌شده', color: 'default', inProgess: false },
  { value: 'cancelled', label: 'لغو‌شده', color: 'error', inProgess: false },
];

interface OrderDetailProps {
  orderId: string;
}

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

function OrderDetail({ orderId }: OrderDetailProps) {
  // Calculate total price from orderDetails

  const { data: orders, isPending } = useGetOrdersByUserId(orderId);
  const router = useRouter();
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [retryingOrderId, setRetryingOrderId] = useState<number | null>(null);

  const { mutate: createPayment, isPending: isCreatingPayment } =
    useCreatePayment();
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
      method: 'ONLINE',
      orderId: orderId,
    };

    createPayment(paymentData, {
      onSuccess: (response: PaymentResponse) => {
        if (response.success && response.paymentId) {
          setPaymentId(response.paymentId);
          toast.success('در حال انتقال به درگاه پرداخت...');
        }
      },
      onError: (err: ErrorResponse) => {
        setRetryingOrderId(null);
        const errorMessage =
          err?.response?.data?.message === 'this order already has payment'
            ? 'برای این سفارش قبلاً پرداخت ثبت شده است.'
            : err?.response?.data?.message ||
              'مشکلی پیش آمده، لطفاً دوباره تلاش کنید.';
        toast.error(errorMessage);
      },
    });
  };

  const totalPrice =
    orders?.orderItems.reduce(
      (sum: number, item: OrderItem) => sum + item.price * item.quantity,
      0
    ) ?? 0;

  const finalAmount = totalPrice + (orders?.shipping?.price || 0);

  // اینجا نمیتونی از useCartStore استفاده کنی چون اینجا همون سفارش هست که از سرور دریافت میشه چون اینجا سبد خرید خالی شده
  const totalQuantity = orders?.orderItems.reduce(
    (total: number, item: OrderItem) => total + item.quantity,
    0
  );

  // Debug: Log order status information
  if (orders) {
    console.log('Order Debug Info:', {
      status: orders.status,
      inProgressStatus: orders.inProgressStatus,
      paymentStatus: orders.payments?.[0]?.paymentStatus,
      showRetryButton:
        orders?.status === 'PENDING' &&
        orders?.inProgressStatus?.toLowerCase() === 'payment',
    });
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm left-0 right-0 md:static">
      <HeadContentProfile HeadTapClass="flex pb-6" imageClassName="md:hidden">
        <div className="flex justify-between w-full">
          <h3 className="font-bold text-lg text-gray-800 pr-2 ">
            جزئیات سفارش
          </h3>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => router.push(`/profile/orders/invoice/${orderId}`)}
            role="button"
            aria-label="دریافت فاکتور"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                router.push(`/profile/orders/invoice/${orderId}`);
              }
            }}
          >
            <div className="relative w-5 h-5">
              <Image
                src="/svg/profile/receipt-item.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="دریافت فاکتور"
                quality={100}
              />
            </div>
            <h3 className="font-semibold text-base text-primary-500 hover:text-primary-600 transition-colors">
              دریافت فاکتور
            </h3>
          </div>
        </div>
      </HeadContentProfile>

      {isPending ? (
        <ShataLoading
          size="medium"
          showText={true}
          text="در حال بارگذاری جزئیات سفارش..."
        />
      ) : (
        <div className="space-y-6">
          {/* Order Status and Info Card */}
          <div className=" flex flex-col lg:flex-row  gap-4 items-center justify-between border border-gray-200 rounded-lg p-4">
            <div className="flex gap-1 items-center justify-between lg:justify-start w-full">
              <span className="font-medium text-gray-500">وضعیت سفارش :</span>
              <span
                className={clsxm(
                  'py-2 px-4 font-semibold text-sm rounded-full whitespace-nowrap border',
                  (() => {
                    const statusKey =
                      orders?.status === 'PENDING'
                        ? orders.inProgressStatus
                        : orders?.status;

                    const statusOption = ORDER_STATUS_OPTIONS.find(
                      (option) =>
                        option.value.toLowerCase() === statusKey?.toLowerCase()
                    );

                    switch (statusOption?.color) {
                      case 'success':
                        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
                      case 'warning':
                        return 'bg-amber-50 text-amber-700 border-amber-200';
                      case 'error':
                        return 'bg-red-50 text-red-700 border-red-200';
                      default:
                        return 'bg-gray-50 text-gray-700 border-gray-200';
                    }
                  })()
                )}
              >
                {(() => {
                  const statusKey =
                    orders?.status === 'PENDING'
                      ? orders.inProgressStatus
                      : orders?.status;

                  return (
                    ORDER_STATUS_OPTIONS.find(
                      (option) =>
                        option.value.toLowerCase() === statusKey?.toLowerCase()
                    )?.label || ''
                  );
                })()}
              </span>
            </div>

            <div className="flex justify-between md:justify-end md:gap-6 text-sm text-gray-700 items-center w-full">
              <div className="flex flex-col md:flex-row gap-2 w-full items-center justify-end">
                <div className="flex items-center justify-between gap-2">
                  <CopyToClipboard
                    text={orders?.id?.toString() || ''}
                    size="md"
                    variant="minimal"
                    className="opacity-60 hover:opacity-100"
                  />
                  <span className="text-xs md:text-sm">شماره سفارش :</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm font-Bold">
                      {orders?.id}
                    </span>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between gap-2">
                  <span className="text-xs md:text-sm">ساعت ثبت :</span>
                  <span className="text-xs md:text-sm font-Bold">
                    {toLocalTimeString(orders?.created_at)}
                  </span>
                </div> */}
                <span className=" text-gray-300">•</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs md:text-sm">تاریخ سفارش :</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs md:text-sm font-Bold">
                      {toLocalTimeString(orders?.created_at)}
                    </span>
                    <span className=" text-gray-300">•</span>
                    <span className="text-xs md:text-sm font-Bold">
                      {toLocalDateString(orders?.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Retry Payment Button - Only show for pending payment orders */}
          {orders?.status === 'PENDING' &&
            orders?.inProgressStatus?.toLowerCase() === 'payment' && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-yellow-600"
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
                    <div className="flex-1">
                      <h4 className="text-base md:text-lg font-black text-gray-900 mb-1">
                        پرداخت در انتظار تکمیل
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        این سفارش ثبت شده اما پرداخت هنوز تکمیل نشده است. لطفاً
                        برای نهایی کردن سفارش، پرداخت خود را تکمیل کنید.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePayAgain(orders.id)}
                    disabled={
                      isCreatingPayment || retryingOrderId === orders.id
                    }
                    className="w-full md:w-auto bg-gradient-to-l from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-Bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group whitespace-nowrap"
                  >
                    {retryingOrderId === orders.id ? (
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
                </div>
              </div>
            )}

          {/* Address Information or In-Person Pickup */}
          {orders?.deliveryType === 'PICKUP_IN_STORE' ? (
            // In-Person Pickup Information
            <div className="relative overflow-hidden border border-indigo-200 rounded-xl p-6 bg-gradient-to-br from-indigo-50/80 to-purple-50/60 backdrop-blur-sm">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/20 to-purple-100/20 backdrop-blur-3xl"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h4 className="font-bold text-xl text-gray-800 mb-2">
                    تحویل حضوری از شعبه
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    سفارش شما آماده تحویل در شعبه مورد نظر می‌باشد. لطفاً با در
                    نظر گیری ساعات کاری به شعبه مراجعه فرمایید.
                  </p>
                </div>

                {/* {orders?.vendor && (
                  <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl p-5 shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                          <span className="text-gray-600 font-medium">
                            نام شعبه:
                          </span>
                        </div>
                        <span className="text-gray-800 font-bold text-lg">
                          {orders.vendor.title}
                        </span>
                      </div>

                      {orders.vendor.workTime && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                            <span className="text-gray-600 font-medium">
                              ساعت کاری:
                            </span>
                          </div>
                          <span className="text-gray-800 font-semibold">
                            {orders.vendor.workTime}
                          </span>
                        </div>
                      )}

                      <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-emerald-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-emerald-700 text-sm font-medium">
                            هزینه ارسال: رایگان
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          ) : orders?.userAddress ? (
            // Regular Delivery Address
            <div className="border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                تحویل به «{orders?.userAddress?.title}»
              </h4>

              <AddressesCard
                key={orders?.userAddress?.id}
                address={orders?.userAddress}
                orderDetail={true}
                classNameContent="flex flex-col md:flex-row gap-6 py-3 rounded-md px-4"
              />
            </div>
          ) : null}

          {/* Delivery Verification Code */}
          {orders?.delivery_code && (
            <div className="relative overflow-hidden border-2 border-emerald-400 rounded-xl p-6 bg-gradient-to-br from-emerald-50/90 to-green-50/70">
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-3 rounded-full shadow-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h4 className="font-bold text-sm md:text-xl text-gray-800 mb-2">
                    کد تحویل مرسوله
                  </h4>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    لطفا در صورتی که سفارش را به صورت کامل تحویل گرفته‌اید، این
                    کد را به مامور ارسال ارائه دهید
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border-2 border-emerald-200 rounded-xl p-5 shadow-sm">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 rounded-lg border border-emerald-200 w-full">
                      <span className="text-lg md:text-xl font-black text-gray-800 tracking-wider">
                        {orders.delivery_code}
                      </span>
                      <CopyToClipboard
                        text={orders.delivery_code}
                        size="lg"
                        variant="minimal"
                        className="text-emerald-600 hover:text-emerald-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-between">
            {/* Payment Information */}
            <div className="bg-gray-25 border border-amber-300 rounded-lg p-4 w-full lg:w-1/2">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                اطلاعات پرداخت
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">وضعیت پرداخت:</span>
                  <span
                    className={`text-xs font-bold ${
                      orders?.payments[0]?.paymentStatus === 'SUCCESS'
                        ? 'text-white font-medium bg-green-500 px-2.5 py-1 rounded-full'
                        : 'text-white font-medium bg-red-500 px-2.5 py-1 rounded-full'
                    }`}
                  >
                    {orders?.payments[0]?.paymentStatus === 'SUCCESS'
                      ? ' موفق'
                      : orders?.payments[0]?.paymentStatus === 'FAILED'
                        ? ' ناموفق'
                        : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">نوع پرداخت:</span>
                  <span className="font-medium">آنلاین</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">کد پیگیری:</span>
                  <div className="flex items-center gap-1">
                    <CopyToClipboard
                      text={orders?.payments[0]?.trackId || ''}
                      size="md"
                      variant="minimal"
                      className="opacity-60 hover:opacity-100"
                    />
                    <span className=" text-xs md:text-sm">
                      {orders?.payments[0]?.trackId}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor Information - Only show for regular delivery, not in-person pickup */}
            <div className="w-full md lg:w-1/2 flex-1">
              {orders?.vendor && orders?.deliveryType == 'PICKUP_IN_STORE' && (
                <div className=" bg-gray-25 border-2 border-green-200 rounded-lg p-4 h-full ">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    اطلاعات شعبه
                  </h4>
                  <div className="rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className=" font-xs md:text-sm">نام شعبه:</span>
                        <span className=" text-xs md:text-sm">
                          {orders.vendor.title}
                        </span>
                      </div>
                      {orders.vendor.workTime && (
                        <div className="flex items-center justify-between">
                          <span className=" font-xs md:text-sm">
                            ساعت کاری:
                          </span>
                          <span className=" text-xs md:text-sm">
                            {orders.vendor.workTime}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Information */}
              {orders?.shipping && (
                <div className="bg-gray-25 border border-purple-200 rounded-lg p-4 h-full">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                    اطلاعات ارسال
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">نحوه ارسال:</span>
                      <span className="font-medium">
                        {orders?.shipping?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">هزینه ارسال:</span>
                      <span className="font-medium">
                        {orders?.shipping?.price.toLocaleString('fa-IR')} تومانء
                      </span>
                    </div>
                    {orders?.trackingNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">کد رهگیری مرسوله:</span>
                        <div className="flex items-center gap-1">
                          <CopyToClipboard
                            text={orders?.trackingNumber || ''}
                            size="md"
                            variant="minimal"
                            className="opacity-60 hover:opacity-100"
                          />
                          <span className="text-xs md:text-sm">
                            {orders?.trackingNumber}
                          </span>
                        </div>
                      </div>
                    )}
                    {orders?.delivery_code && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">کد تحویل مرسوله:</span>
                        <span className="font-medium">
                          {orders?.delivery_code}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product List */}
          <div className="flex flex-col">
            {/* Mobile  */}
            <div className="md:hidden flex flex-col gap-5 items-center justify-between border border-gray-200 rounded-lg px-3 py-4">
              <div className="text-sm font-semibold text-gray-800">
                اقلام سفارش ({orders?.orderItems?.length} کالا)
              </div>
              <div className="flex items-center gap-2">
                {orders?.orderItems?.slice(0, 5).map((item: OrderItem) => {
                  const imageSrc = item?.variant?.image
                    ? `${BASE_URL}${item?.variant?.image}`
                    : '/images/Products/default-product.webp';
                  return (
                    <div
                      key={item.id}
                      className="relative w-16 h-16 rounded border border-gray-200 overflow-hidden"
                    >
                      <Image
                        className="bg-gray-50"
                                fill
    style={{ objectFit: "contain" }}
                        alt={item?.variant?.product?.title || 'product'}
                        quality={100}
                        src={imageSrc}
                      />
                      <span className="absolute -bottom-1 left-1 text-[12px] font-Bold px-2 py-1 rounded bg-white shadow border border-gray-200">
                        {item.quantity}
                      </span>
                    </div>
                  );
                })}
              </div>
              <ManageModal
                triggerContent={
                  <div className="text-primary-600 text-sm flex items-center gap-1 cursor-pointer">
                    مشاهده جزئیات
                  </div>
                }
                className="fixed inset-0 z-50"
                fadeIn=" animate-slideUp"
                fadeOut="animate-slideDown"
                modalBodyClass="absolute bottom-0 left-0 right-0 z-50 w-full max-h-[65vh] bg-white rounded-t-2xl shadow-lg overflow-y-auto p-0"
                cancelLabel={
                  <div className="max-h absolute w-5 h-5 left-3 top-1 ">
                    <Image
                      src="/svg/profile/close-circle.svg"
                      alt="close-modal"
                      width={25}
                      height={25}
                    />
                  </div>
                }
                cancelBoxClass="absolute left-3 top-3"
                moodCheckout={true}
              >
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    اقلام سفارش ({orders?.orderItems?.length} کالا)
                  </h4>
                  <div className="divide-y divide-gray-100">
                    {orders?.orderItems?.map((item: OrderItem) => {
                      const imageSrc = item?.variant?.image
                        ? `${BASE_URL}${item?.variant?.image}`
                        : '/images/Products/default-product.webp';
                      return (
                        <div
                          key={item.id}
                          className="flex flex-row gap-5 items-stretch justify-between py-4 px-2 "
                        >
                          {/* Right: image + quantity (stacked) */}
                          <div className="flex flex-col items-center gap-2 flex-shrink-0">
                            <div className="relative w-14 h-16 rounded border border-gray-200 overflow-hidden">
                              <Image
                                className="bg-gray-50"
                                          fill
    style={{ objectFit: "contain" }}
                                alt={item?.variant?.product?.title || 'product'}
                                quality={100}
                                src={imageSrc}
                              />
                            </div>
                            <span className="bg-gray-100 text-black text-xs px-3 py-1 rounded-full whitespace-nowrap">
                              {item.quantity} عدد
                            </span>
                          </div>

                          {/* left: title + color + price */}
                          <div className="flex flex-col gap-1 justify-around px-3 w-full">
                            <span className="block text-sm font-medium text-gray-800 text-right line-clamp-2 ">
                              {item?.variant?.product?.title}
                            </span>
                            <div className="flex justify-between">
                              <div className="flex items-center justify-start gap-2 text-xs text-gray-500 mt-1">
                                <span
                                  className="w-5 h-5 rounded-full border"
                                  style={{
                                    backgroundColor:
                                      item?.variant?.color?.color,
                                  }}
                                ></span>
                                <span className="text-sm font-medium">
                                  {item?.variant?.color?.mainColor}
                                </span>
                              </div>
                              <div className="flex items-end gap-1 text-left ">
                                <span className="text-gray-800 text-sm">
                                  {item.price?.toLocaleString('fa-IR')}
                                </span>
                                <span className="text-xs text-gray-600">
                                  تومانء
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Left: price */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ManageModal>
            </div>

            {/* {Desktop} */}
            <h4 className="hidden md:flex font-semibold text-gray-800 mb-4 items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              محصولات سفارش
            </h4>
            <div className="hidden md:block">
              {orders?.orderItems?.map((item: OrderItem) => {
                const imageSrc = item.variant.image
                  ? `${BASE_URL}${item.variant.image}`
                  : '/images/Products/default-product.webp';

                return (
                  <div
                    key={item.id}
                    className="bg-bl border border-gray-200 rounded-lg p-4 mb-3"
                  >
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Image */}
                      <div className="flex-shrink-0 mx-auto md:mx-0">
                        <div className="relative w-20 h-24 md:w-28 md:h-32">
                          <Image
                            className="bg-gray-100 rounded-lg"
                                fill
    style={{ objectFit: "contain" }}
                            alt="Phone Icon"
                            quality={100}
                            src={imageSrc}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Product Title */}
                        <div className="mb-3">
                          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-6">
                            {item.variant.product.title}
                          </h3>
                        </div>

                        {/* Product Details Grid */}
                        <div className=" flex flex-col gap-2">
                          <div className="flex flex-col lg:flex-row gap-5 items-center">
                            <div className="flex items-center gap-1 px-2 py-1 rounded ">
                              <span className="text-sm text-gray-500">
                                تعداد:
                              </span>
                              <span className="bg-gray-100 px-2.5 py-0.5 rounded-full text-sm whitespace-nowrap">
                                {item.quantity} عدد
                              </span>
                            </div>
                            <div className="text-gray-100 font-extrabold">
                              |
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-gray-500">
                                رنگ:
                              </span>
                              <span
                                className="w-6 h-6 rounded-full border border-gray-300"
                                style={{
                                  backgroundColor: item?.variant?.color?.color,
                                }}
                              ></span>
                              <span className="text-gray-800 text-sm">
                                {`${item?.variant?.color?.mainColor} (${item?.variant?.color.subColor})`}
                              </span>
                            </div>
                            <div className="text-gray-100 font-extrabold">
                              |
                            </div>
                            <div className="flex items-center gap-2 ">
                              <span className="text-sm text-gray-500">
                                قیمت:
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="text-gray-800 text-sm">
                                  {item.price?.toLocaleString('fa-IR')}
                                </span>
                                <span className="text-xs text-gray-600 ">
                                  تومانء
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col lg:flex-row gap-5 items-center">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <span className="text-sm text-gray-500">
                                گارانتی:
                              </span>
                              <span className="text-sm"> 18 ماه شرکتی</span>
                            </div>
                            <div className="text-gray-100 font-extrabold">
                              |
                            </div>
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <span className="text-sm text-gray-500">
                                وضعیت:
                              </span>
                              <span className="text-sm">رجیستر شده </span>
                            </div>
                            <div className="text-gray-100 font-extrabold">
                              |
                            </div>
                            {item.serialNumber && (
                              <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-sm text-gray-500">
                                  ‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌ سریال (IMEI):
                                </span>
                                <span className="text-sm">
                                  {item.serialNumber}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              خلاصه سفارش
            </h4>
            <div className="space-y-3 text-sm ">
              <div className="flex justify-between text-gray-600">
                <span>قیمت کالاها ({totalQuantity} عدد)</span>
                <span>{totalPrice.toLocaleString('fa-IR')} تومانء</span>
              </div>
              <div className="flex flex-col justify-between text-gray-600 gap-4">
                {orders?.packagingType ? (
                  <div className="flex items-center justify-between">
                    <span>هزینه بسته‌بندی : </span>
                    <span>
                      {orders?.packagingType === 'ECONOMIC'
                        ? '15000 تومانء'
                        : orders?.packagingType === 'IRON'
                          ? '30000 تومانء'
                          : 'رایگان'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span>هزینه بسته‌بندی : </span>
                    <span>رایگان</span>
                  </div>
                )}
                {orders?.wrapping && (
                  <div className="flex items-center justify-between">
                    <span>هزینه کادوپیچی : </span>
                    <span>
                      {orders?.wrapping?.cost.toLocaleString('fa-IR')} تومانء
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>هزینه ارسال : </span>
                  <span>
                    {orders?.shipping
                      ? orders?.shipping?.price.toLocaleString('fa-IR') +
                        ' تومانء'
                      : 'رایگان'}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <div className="flex justify-between font-bold text-lg text-gray-800">
                  <span>مبلغ نهایی</span>
                  <span className="text-primary-600">
                    {(orders?.totalPrice / 10)?.toLocaleString('fa-IR')} تومانء
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;
