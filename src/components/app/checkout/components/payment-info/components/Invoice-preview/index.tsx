import React from 'react';
import {
  useGetAddressById,
  useGetCartById,
  useGetShippingDeliveryById,
  useGetVendorById,
} from '@/components/app/profile-user/hooks';
import { BASE_URL } from '@/constants/url';
import { OrderItem } from '@/types/types';
import { FaUser } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import Image from 'next/image';
import ManageModal from '@/components/base/modal';
import AddressesCard from '@/components/base/addresses-card';
import Link from 'next/link';
import { useOrderStore } from '@/stores/useOrderStore';
import { useCartStore } from '@/stores/useCartStore';
function InvoicePreview() {
  const { orderData: orderData1 } = useOrderStore();

  const { data: userAddress, isPending: isPendingAddress } = useGetAddressById(
    orderData1?.userAddressId ?? 0
  );
  const { data: dataCart, isPending: isPendingCart } = useGetCartById(
    orderData1?.cartId ?? 0
  );
  const { data: dataShippin, isPending: isPendingShippin } =
    useGetShippingDeliveryById(orderData1?.shippingId ?? 0);
  const { data: dataVendor, isPending: isPendingVendor } = useGetVendorById(
    orderData1?.vendorId ?? 0
  );
  const { totalPrice } = useCartStore();
  // Price Calculations
  const shippingPrice =
    !isPendingShippin && dataShippin ? Number(dataShippin.price || 0) : 0;
  let packagingPrice = 0;
  if (orderData1?.packagingType === 'ECONOMIC') {
    packagingPrice = 15000;
  } else if (orderData1?.packagingType === 'IRON') {
    packagingPrice = 30000;
  }

  const wrappingPrice = orderData1?.wrapping ? 25000 : 0; // Assuming a fixed price for wrapping

  const finalPrice =
    totalPrice + shippingPrice + packagingPrice + wrappingPrice;

  // --- UI Components ---

  const Spinner = ({ className = '' }: { className?: string }) => (
    <div
      className={`animate-spin rounded-full h-4 w-4 border-b-2 ${className}`}
    ></div>
  );

  const SectionLoader = ({
    text,
    className = '',
  }: {
    text: string;
    className?: string;
  }) => (
    <div
      className={`flex items-center justify-center p-4 bg-gray-100 rounded-lg ${className}`}
    >
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
      <span className="mr-2 text-sm text-gray-600">{text}</span>
    </div>
  );
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-4">
          <div className="flex justify-between md:flex-col lg:flex-row lg:items-center gap-4">
            <h3 className="text-lg font-bold text-gray-900">
              پیش‌فاکتور سفارش
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">کد سفارش:</span>
              <span className="font-mono bg-gray-100 px-3 py-1 rounded-lg text-sm font-semibold text-gray-800">
                #{orderData1?.cartId}
              </span>
            </div>
          </div>
          <div className="flex justify-between md:flex-col lg:flex-row lg:items-center gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>{new Date().toLocaleDateString('fa-IR')}</span>
              <span className="text-gray-300">•</span>
              <span>
                {new Date().toLocaleTimeString('fa-IR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <div className="mt-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <IoMdInformationCircleOutline className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700 leading-relaxed">
          لطفاً قبل از تأیید نهایی، تمام اطلاعات را به دقت بررسی کنید. در صورت
          صحت اطلاعات، اقدام به پرداخت نمایید.
        </p>
      </div>

      {/* Customer & Address Information */}
      <div className="p-6 border-b border-gray-100 ">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 ">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaUser className="text-primary-500" />
            اطلاعات گیرنده سفارش
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50">
            <div className="grid col-span-2">
              {orderData1?.deliveryType === 'SEND_BY_COURIER' ? (
                isPendingAddress ? (
                  <SectionLoader text="در حال بارگذاری آدرس..." />
                ) : userAddress?.userAddress ? (
                  <AddressesCard
                    key={userAddress?.userAddress?.id}
                    address={userAddress?.userAddress}
                    orderDetail={true}
                    classNameContent=""
                  />
                ) : (
                  <Link
                    href="/profile-user/addresses"
                    className="text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg p-4 hover:bg-orange-100 transition-all duration-300"
                  >
                    آدرس برای شما ثبت نشده است. لطفاً ابتدا آدرس خود را در بخش
                    پروفایل ثبت کنید.
                  </Link>
                )
              ) : orderData1?.deliveryType === 'PICKUP_IN_STORE' ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-800">
                      تحویل حضوری در فروشگاه
                    </h3>
                  </div>
                  <div className="text-center space-y-3">
                    <p className="text-green-700 text-lg font-medium">
                      سفارش شما آماده تحویل حضوری در شعبه انتخابی می‌باشد
                    </p>
                    {isPendingVendor ? (
                      <SectionLoader
                        text="در حال بارگذاری اطلاعات شعبه..."
                        className="bg-white/70 mt-4"
                      />
                    ) : dataVendor ? (
                      <div className="bg-white/70 rounded-lg p-4 mt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-green-600 font-medium">
                              نام شعبه:
                            </span>
                            <span className="text-green-800 font-semibold">
                              {dataVendor.title}
                            </span>
                          </div>
                          {dataVendor.workTime && (
                            <div className="flex items-center justify-between">
                              <span className="text-green-600 font-medium">
                                ساعت کاری:
                              </span>
                              <span className="text-green-800">
                                {dataVendor.workTime}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null}
                    <div className="flex items-center justify-center gap-2 mt-4 p-3 bg-green-100 rounded-lg">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-green-700 font-medium text-sm">
                        لطفاً با همراه داشتن کارت ملی به شعبه مراجعه نمایید
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  نوع تحویل مشخص نیست
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      {orderData1?.deliveryType === 'SEND_BY_COURIER' && (
        <div className="grid md:grid-cols-2 gap-4 mx-5">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 col-span-2">
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
            {isPendingShippin ? (
              <div className="flex items-center justify-center p-2">
                <Spinner className="border-purple-600 h-5 w-5" />
                <span className="mr-2 text-sm text-gray-600">
                  در حال بارگذاری...
                </span>
              </div>
            ) : dataShippin ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">نحوه ارسال:</span>
                  <span className="font-medium">{dataShippin?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">هزینه ارسال:</span>
                  <span className="font-medium">
                    {Number(dataShippin?.price ?? 0).toLocaleString('fa-IR')}{' '}
                    تومانء
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center p-2">
                اطلاعات ارسال یافت نشد.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="flex flex-col">
        {isPendingCart ? (
          <SectionLoader text="در حال بارگذاری محصولات..." />
        ) : (
          <>
            {/* Mobile compact strip */}
            <div className="md:hidden flex flex-col gap-5 items-center justify-between border border-gray-200 rounded-lg px-3 py-4">
              <div className="text-sm font-semibold text-gray-800">
                اقلام سفارش ({dataCart?.items?.length} کالا)
              </div>
              <div className="flex items-center gap-2">
                {dataCart?.items?.slice(0, 5).map((item: OrderItem) => {
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
                        style={{ objectFit: 'contain' }}
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
                    مشاهده
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                }
                className="fixed inset-0 z-50"
                fadeIn=" animate-slideUp"
                fadeOut="animate-slideDown"
                modalBodyClass="absolute bottom-0 left-0 right-0 z-50 w-full max-h-[65vh] bg-white rounded-t-2xl shadow-lg overflow-y-auto  p-0"
                cancelLabel={
                  <div className="max-h absolute w-5 h-5 left-3 top-1.5 ">
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
                <div className="p-4 ">
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
                    اقلام سفارش ({dataCart?.items?.length} کالا)
                  </h4>
                  <div className="divide-y divide-gray-100">
                    {dataCart?.items?.map((item: OrderItem) => {
                      const imageSrc = item?.productVariant?.image
                        ? `${BASE_URL}${item?.productVariant?.image}`
                        : '/images/Products/default-product.webp';
                      return (
                        <div
                          key={item?.id}
                          className="flex flex-row gap-5 items-stretch justify-between py-4 px-2 "
                        >
                          <div className="flex flex-col items-center gap-2 flex-shrink-0">
                            <div className="relative w-14 h-16 rounded border border-gray-200 overflow-hidden">
                              <Image
                                className="bg-gray-50"
                                fill
                                style={{ objectFit: 'contain' }}
                                alt={
                                  item?.productVariant?.product?.title ||
                                  'product'
                                }
                                quality={100}
                                src={imageSrc}
                              />
                            </div>
                            <span className="bg-gray-100 text-black text-xs px-3 py-1 rounded-full whitespace-nowrap">
                              {item?.quantity} عدد
                            </span>
                          </div>

                          <div className="flex flex-col gap-1 justify-around px-3 w-full">
                            <span className="block text-xs font-medium text-gray-800 text-right line-clamp-2 ">
                              {item?.productVariant?.product?.title}
                            </span>
                            <div className="flex justify-between">
                              <div className="flex items-center justify-start gap-2 text-xs text-gray-500 mt-1">
                                <span
                                  className="w-5 h-5 rounded-full border"
                                  style={{
                                    backgroundColor:
                                      item?.productVariant?.color?.color,
                                  }}
                                ></span>
                                <span className="text-sm font-medium">
                                  {item?.productVariant?.color?.mainColor}
                                </span>
                              </div>
                              <div className="flex items-end gap-1 text-left ">
                                <span className="text-gray-800 text-sm">
                                  {Number(
                                    item?.productVariant
                                      ?.customerSpecialPrice ||
                                      item?.productVariant?.customerPrice ||
                                      0
                                  ).toLocaleString('fa-IR')}
                                </span>
                                <span className="text-xs text-gray-600">
                                  تومانء
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ManageModal>
            </div>

            {/* Desktop full list */}
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
              {dataCart?.items?.map((item: OrderItem) => {
                const imageSrc = item?.productVariant?.image
                  ? `${BASE_URL}${item?.productVariant?.image}`
                  : '/images/Products/default-product.webp';

                return (
                  <div
                    key={item.id}
                    className="bg-bl border border-gray-200 rounded-lg p-4 mb-3"
                  >
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      <div className="flex-shrink-0 mx-auto md:mx-0">
                        <div className="relative w-20 h-24 md:w-28 md:h-32">
                          <Image
                            className="bg-gray-100 rounded-lg"
                            fill
                            style={{ objectFit: 'contain' }}
                            alt="Phone Icon"
                            quality={100}
                            src={imageSrc}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-3">
                          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-6">
                            {item?.productVariant?.product?.title}
                          </h3>
                        </div>
                        <div className=" flex flex-col gap-2 ">
                          <div className="flex flex-col lg:flex-row gap-5 items-center">
                            <div className="flex items-center gap-1 px-2 py-1 rounded ">
                              <span className="text-sm text-gray-500">
                                تعداد:
                              </span>
                              <span className="bg-gray-100 px-2.5 py-0.5 rounded-full text-sm whitespace-nowrap">
                                {item?.quantity} عدد
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
                                  backgroundColor:
                                    item?.productVariant?.color?.color,
                                }}
                              ></span>
                              <span className="text-gray-800 text-sm">
                                {`${item?.productVariant?.color?.mainColor} (${item?.productVariant?.color.subColor})`}
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
                                  {Number(
                                    item?.productVariant
                                      ?.customerSpecialPrice ||
                                      item?.productVariant?.customerPrice ||
                                      0
                                  ).toLocaleString('fa-IR')}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 border  border-gray-200 rounded-lg p-4">
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
            <span>
              قیمت کالاها (
              {isPendingCart ? '...' : (dataCart?.items?.length ?? 0)} عدد)
            </span>
            {isPendingCart ? (
              <Spinner className="border-gray-600" />
            ) : (
              <span>{totalPrice?.toLocaleString('fa-IR')} تومانء</span>
            )}
          </div>
          <div className="flex flex-col justify-between text-gray-600 gap-4">
            {orderData1?.deliveryType === 'SEND_BY_COURIER' && (
              <div className="flex items-center justify-between">
                <span>هزینه ارسال : </span>
                {isPendingShippin ? (
                  <Spinner className="border-gray-600" />
                ) : (
                  <span>
                    {shippingPrice > 0
                      ? shippingPrice.toLocaleString('fa-IR') + ' تومانء'
                      : 'رایگان'}
                  </span>
                )}
              </div>
            )}
            {packagingPrice > 0 && (
              <div className="flex items-center justify-between">
                <span>هزینه بسته‌بندی : </span>
                <span>{packagingPrice.toLocaleString('fa-IR')} تومانء</span>
              </div>
            )}
            {wrappingPrice > 0 && (
              <div className="flex items-center justify-between">
                <span>هزینه کادوپیچی : </span>
                <span>{wrappingPrice.toLocaleString('fa-IR')} تومانء</span>
              </div>
            )}
          </div>
          <div className="border-t border-gray-300 pt-3">
            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>مبلغ نهایی</span>
              <span className="text-primary-600">
                {`${finalPrice.toLocaleString('fa-IR')} تومانء`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicePreview;
