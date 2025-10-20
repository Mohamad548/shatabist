import { ProductCard } from '@/components/base/product-card';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useRef, Fragment } from 'react';
import { CartComponentsProps } from '../../../type';
import { getPriceAndLimits } from '@/utils/get-price-and-limits';
import {
  useAddToCartTransaction,
  useDeleteAllCartItems,
  useDeleteCartItem,
  useGetUser,
} from '@/components/app/profile-user/hooks';
import { BASE_URL } from '@/constants/url';
import { useCartStore } from '@/stores/useCartStore';
import ShataLoading from '@/components/base/loading/shata-loading';
import { AuthRequiredModal } from './AuthRequiredModal';
import { useRouter } from 'next/navigation';
import { ManageModalRef } from '@/components/base/modal';
import toast, { Toaster } from 'react-hot-toast';
import { Popover, Transition } from '@headlessui/react';
import EmptyCart from '../empty-cart';
import { GetUserResponse } from '@/components/app/profile-user/hooks/type';

function CartComponents({ items, isPending }: CartComponentsProps) {
  const [cartItems, setCartItems] = useState(items);
  const [isClient, setIsClient] = useState(false);
  const [calculatedTotalPrice, setCalculatedTotalPrice] = useState(0);
  const { setTotalPrice, totalQuantity, setCartId, cartId } = useCartStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // totalQuantity is now managed by the store and automatically updated

  const { mutate: deleteCartItem, isPending: isPendingDeleteCartItem } =
    useDeleteCartItem();

  const { mutate: deleteAllCartItems, isPending: isPendingDeleteAllCartItems } =
    useDeleteAllCartItems();

  const {
    mutate: addToCartTransaction,
    isPending: isPendingAddToCartTransaction,
  } = useAddToCartTransaction();

  // Auth-related hooks
  const { data: user } = useGetUser<GetUserResponse>();
  const router = useRouter();
  const authModalRef = useRef<ManageModalRef>(null);

  const partner = false;
  // Ensure we're on client side before rendering dynamic content
  useEffect(() => {
    setIsClient(true);
  }, []);

  // همگام‌سازی زمانی که props تغییر می‌کند
  useEffect(() => {
    setCartItems(items);
  }, [items]);

  // محاسبه مجموع قیمت نهایی با تخفیف‌ها و شرایط کاربری - only on client
  useEffect(() => {
    if (isClient) {
      const totalPrice = cartItems.reduce((sum, item) => {
        const [{ finalPrice }] = getPriceAndLimits(
          { items: [item] },
          !!partner
        );
        return sum + finalPrice * (item.quantity ?? 0);
      }, 0);
      setCalculatedTotalPrice(totalPrice);
    }
  }, [cartItems, partner, isClient]);

  // به‌روزرسانی اطلاعات فروشگاه در استور
  useEffect(() => {
    if (isClient) {
      setTotalPrice(calculatedTotalPrice);
    }
  }, [calculatedTotalPrice, setTotalPrice, isClient]);

  // بروزرسانی تعداد کالا
  const updateItemQuantity = (id: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckoutClick = () => {
    const userData = user?.user;
    const authLevel = userData?.auth_level;

    // اگر auth_level برابر 0 باشد، مودال احراز هویت را نمایش دهید
    if (authLevel === 0) {
      authModalRef.current?.openModal();
      return;
    }

    // ذخیره cartId در localStorage از طریق store
    const currentCartId = items[0]?.cartId || cartId || '';
    if (currentCartId) {
      setCartId(String(currentCartId));
    }

    // در غیر این صورت، به صفحه ارسال بروید
    router.push(`/checkout/shipping?id=${currentCartId}`);
  };

  // هندل ناوبری به صفحه احراز هویت
  const handleNavigateToAuth = () => {
    authModalRef.current?.closeModal();
    router.push('/profile-user/user-info');
  };

  // هندل موفقیت احراز هویت و انتقال به صفحه بعدی
  const handleAuthSuccess = () => {
    const currentCartId = items[0]?.cartId || cartId || '';
    if (currentCartId) {
      setCartId(String(currentCartId));
    }
    router.push(`/checkout/shipping?id=${currentCartId}`);
  };

  if (isPending || isPendingDeleteCartItem || isPendingAddToCartTransaction) {
    return <ShataLoading size="large" />;
  }

  if (!items || items.length === 0) {
    return (
      <div className="relative overflow-hidden ">
        {/* Main Container with Creative Layout */}
        <div className="flex flex-col lg:flex-row ">
          {/* Left Side - Visual Journey */}
          <div className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-2 md:p-8 relative">
            <div className="text-center md:space-y-8 relative z-10">
              {/* Creative Cart Visualization */}
              <div className="relative">
                <div className="w-32 h-32 mx-auto relative">
                  {/* Empty Cart with Creative Shadow */}
                  <div className="absolute inset-0 bg-gray-200 rounded-full opacity-20 transform rotate-3"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-20 h-20 mx-auto flex items-center justify-center">
                    <Image
                      src="/svg/checkout/empty-cart.svg"
                      width={80}
                      height={80}
                      alt="سبد خرید"
                      className="opacity-40"
                    />
                  </div>
                </div>

                {/* Journey Points */}
                <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
              </div>

              {/* Journey Labels */}
              <div className="flex justify-between items-center text-xs text-gray-500 md:px-16">
                <span className=" text-sm md:text-xl font-bold">
                  سبد خرید شما خالی است !
                </span>
              </div>
            </div>
          </div>

          {/*EmptyCart - Content */}
          <EmptyCart />
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="border w-full ">
        {/* Product List */}
        <div className="flex w-full justify-between items-center px-4 py-2">
          <h3 className="font-semibold text-base text-gray-800">
            سبد خرید شما
          </h3>
          <div className="flex gap-5 items-center">
            <h3 className="font-regular text-sm text-gray-800">
              {totalQuantity} کالا
            </h3>
            <Popover className="relative">
              <div
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}
                className="pt-1 z-50"
              >
                <Popover.Button className="relative h-6 w-6 cursor-pointer">
                  <Image
                    src="/svg/more-square.svg"
                    fill
                    style={{ objectFit: 'contain' }}
                    alt="More options"
                    quality={100}
                  />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  show={isPopoverOpen}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute z-50 left-0 top-8">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative bg-white flex flex-col gap-2 p-3 min-w-[200px]">
                        <button className="flex items-center gap-3 p-2  hover:bg-gray-100 transition-colors text-right">
                          <div className="relative h-5 w-5">
                            <Image
                              src="/svg/profile/arrow-left.svg"
                              fill
                              style={{ objectFit: 'contain' }}
                              alt="Move to next"
                              quality={100}
                            />
                          </div>
                          <span className="text-xs text-gray-900 font-Bold">
                            انتقال همه به خرید بعدی
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            deleteAllCartItems(String(items[0].cartId), {
                              onSuccess: () => {
                                toast.success(
                                  'تمام کالاها از سبد خرید حذف شدند'
                                );
                                setIsPopoverOpen(false);
                              },
                              onError: () => {
                                toast.error('خطا در حذف کالاها');
                              },
                            });
                          }}
                          disabled={isPendingDeleteAllCartItems}
                          className="flex items-center gap-3 p-2  hover:bg-gray-100 transition-colors text-right disabled:opacity-50 disabled:cursor-not-allowed "
                        >
                          <div className="relative h-5 w-5">
                            {isPendingDeleteAllCartItems ? (
                              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Image
                                src="/svg/trashred.svg"
                                fill
                                style={{ objectFit: 'contain' }}
                                alt="Delete all"
                                quality={100}
                              />
                            )}
                          </div>
                          <span className="text-xs text-red-500 font-Bold">
                            {isPendingDeleteAllCartItems
                              ? 'در حال حذف...'
                              : 'حذف همه'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </div>
            </Popover>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1 px-1">
          {cartItems.map((item) => {
            const [
              {
                finalPrice,
                originalPrice,
                discountPercent,
                color,
                subColor,
                maxOrder,
                minOrder,
              },
            ] = getPriceAndLimits({ items: [item] }, !!partner);
            return (
              <ProductCard
                key={item.id}
                name={item.productVariant.product?.title ?? 'بدون عنوان'}
                imageSrc={
                  item.productVariant.image
                    ? `${BASE_URL}${item.productVariant.image}`
                    : '/images/Products/default-product.webp'
                }
                classNameCard="md:p-4 gap-y-2 md:gap-y-0 grid border-b rounded-md md:gap-x-8 md:grid-cols-11"
                initialPrice={originalPrice}
                price={finalPrice}
                discount={String(discountPercent)}
                quantity={item?.quantity}
                color={color}
                colorName={`${item?.productVariant?.color?.mainColor} (${item?.productVariant?.color.subColor})`}
                slug={String(item.productVariant.product.slug)}
                subColor={subColor}
                onQuantityChange={(newQty) =>
                  updateItemQuantity(item.id, newQty)
                }
                variantId={item.variantId}
                moodCheckoutCart={true}
                maxOrder={maxOrder}
                minOrder={minOrder}
                onDelete={() => deleteCartItem(String(item.id))}
                cardImageSize="w-24 h-24 md:w-40 md:h-40"
                onAddToCart={() =>
                  addToCartTransaction({
                    cartId: item?.cartId,
                    id: item?.id,
                    to: 'next',
                  })
                }
              />
            );
          })}
        </div>
      </div>

      {/* جزییات سفارش */}
      <div>
        <div className="flex flex-col bg-gradient-to-br from-white to-gray-25 border border-gray-200 shadow-primary overflow-hidden md:sticky left-9 mt-0 top-1 transition-all duration-300 hover:shadow-lg rounded-md min-w-80 ">
          {/* Header */}
          <div className="bg-gradient-to-l from-emerald-500 to-secondary-500 px-5 py-3">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              خلاصه سبد خرید
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
                  {isClient && (
                    <span className="text-xs text-gray-500 mr-1">
                      ({totalQuantity})
                    </span>
                  )}
                </span>
              </div>
              <span
                className="text-gray-800 font-Bold text-sm"
                suppressHydrationWarning
              >
                {calculatedTotalPrice.toLocaleString('fa-IR')} تومان
              </span>
            </div>

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
                <span
                  className="text-emerald-700 font-black text-lg"
                  suppressHydrationWarning
                >
                  {calculatedTotalPrice.toLocaleString('fa-IR')}
                  <span className="text-sm mr-1">تومان</span>
                </span>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="px-5 pb-5 md:pb-4">
            <div className="w-full fixed md:static left-0 right-0 bg-white md:bg-transparent bottom-0 z-40 px-5 py-3 md:py-0 md:px-0 border-t md:border-0 border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none">
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-6 rounded-xl font-Bold text-sm md:text-base transition-all duration-300 transform shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 bg-gradient-to-l from-emerald-500 to-secondary-500 text-white hover:from-emerald-600 hover:to-secondary-600"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                تایید و تکمیل سفارش
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthRequiredModal
        ref={authModalRef}
        onNavigateToAuth={handleNavigateToAuth}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default CartComponents;
