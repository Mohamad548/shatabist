'use client';
import { DeleteListFavorites } from '@/components/app/profile-user/components/base/profile-modals';
import { localization } from '@/constants/localization';
import clsxm from '@/utils/clsxm';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../button';
import { IRenderItemProps } from '../slider/type-slider';
import { useAddToCart } from '@/components/app/product/hooks';
import { useGetCart } from '@/components/app/profile-user/hooks';
import toast from 'react-hot-toast';

export const ProductCard = ({
  initialPrice,
  colorName,
  id,
  slug,
  imageSrc,
  classNameCard,
  name,
  price = 'ناموجود',
  discount,
  rate,
  iMeI, ///سریال گوشی
  quantity, // دریافت مقدار تعداد
  color, // دریافت مقدار رنگ
  subColor,
  onDelete,
  onAddToCart,
  cardImageSize = 'w-60 h-52',
  showOnlyImage = false,
  panelCart = false,
  orderDetail = false,
  moodCheckoutCart = false, // فعال باشد orderDetail حالت سبد خرید >> باید حالت
  moodCheckoutCartNext = false, //   های بعدی حالت  خرید >> باید حالت های orderDetail و حالت moodCheckoutCart فعال باشند  ,
  onClick,
  maxOrder,
  minOrder,
  isPending,
  moodInvoice = false,
  withLink = true,
  isPendingTransaction,
  variantId,
  onQuantityChange,
}: IRenderItemProps) => {
  const Wrapper: React.ElementType = withLink ? Link : 'div';
  const {
    mutate: addToCart,
    isPending: isPendingAddToCart,
    isSuccess,
  } = useAddToCart();
  const [localQuantity, setLocalQuantity] = useState(quantity ?? 0);
  const { data: currentCartData, isPending: isCartPending } = useGetCart();

  const handleIncrease = () => {
    if (maxOrder && localQuantity >= maxOrder) {
      toast.error('حداکثر تعداد قابل سفارش رسید');
      return;
    }

    const newQty = localQuantity + 1;
    setLocalQuantity(newQty);
    onQuantityChange?.(newQty);

    if (!currentCartData) return;

    const prioIndexToUse = 0;

    const userCart = currentCartData.userCarts.find(
      (cart: { prioIndex: number }) => cart.prioIndex === prioIndexToUse
    );

    const isNewItem = !userCart?.items.some(
      (item: { variantId: number | undefined }) => item.variantId === variantId
    );
    const updatedCartItems = userCart
      ? isNewItem
        ? [
            ...userCart.items.map(
              (item: { variantId: any; quantity: any }) => ({
                variantId: item.variantId,
                quantity: item.quantity,
              })
            ),
            { variantId: variantId!, quantity: newQty },
          ]
        : userCart.items.map(
            (item: { variantId: number | undefined; quantity: any }) =>
              item.variantId === variantId
                ? { variantId: item.variantId, quantity: newQty }
                : { variantId: item.variantId, quantity: item.quantity }
          )
      : [{ variantId: variantId!, quantity: newQty }];

    addToCart(
      {
        prioIndex: prioIndexToUse,
        cartItems: updatedCartItems,
      },
      {
        onSuccess: () => {
          if (isNewItem) {
            toast.success('کالا با موفقیت به سبد اضافه شد');
          } else {
            toast.success('تعداد کالا با موفقیت بروزرسانی شد');
          }
        },
        onError: () => {
          toast.error('خطا در بروزرسانی سبد خرید');
        },
      }
    );
  };

  const handleDecrease = () => {
    if (localQuantity <= minOrder!) {
      onDelete?.();
      return;
    }

    const newQty = localQuantity - 1;
    setLocalQuantity(newQty);
    onQuantityChange?.(newQty);

    if (!currentCartData) return;

    const prioIndexToUse = 0;

    const userCart = currentCartData.userCarts.find(
      (cart: { prioIndex: number }) => cart.prioIndex === prioIndexToUse
    );

    const updatedCartItems = userCart
      ? userCart.items.map(
          (item: { variantId: number | undefined; quantity: any }) =>
            item.variantId === variantId
              ? { variantId: item.variantId, quantity: newQty }
              : { variantId: item.variantId, quantity: item.quantity }
        )
      : [];

    addToCart(
      {
        prioIndex: prioIndexToUse,
        cartItems: updatedCartItems,
      },
      {
        onSuccess: () => {
          toast.success('تعداد کالا با موفقیت کاهش یافت');
        },
        onError: () => {
          toast.error('خطا در کاهش تعداد کالا');
        },
      }
    );
  };

  return (
    <>
      <div className={clsxm('', classNameCard, orderDetail ? '' : '')}>
        <Wrapper
          {
            ...(withLink
              ? { href: `/p/${slug}`, onClick } // برای Link، هم href و هم onClick را به تگ <a> می‌دهیم
              : {}) // برای div فقط onClick را ارسال می‌کنیم
          } // استفاده صحیح از `:` برای تخصیص مقدار
          className={clsxm(
            'rounded-lg flex justify-center   row-start-1 items-center',
            !moodCheckoutCart && orderDetail
              ? 'col-start-1 row-span-4 min-w-16 max-w-36 my-2'
              : moodCheckoutCart
                ? 'row-span-3 md:col-start-1 md:row-span-4 md:row-start-1 md:col-span-4'
                : moodCheckoutCartNext || orderDetail
                  ? 'row-span-4 col-start-1 col-span-2 md:col-start-1'
                  : moodInvoice
                    ? 'row-span-3 col-start-1 md:row-span-2 m-auto'
                    : 'row-end-5 min-w-20'
          )}
        >
          <div className={clsxm('relative', cardImageSize)}>
            <Image
              className="bg-gray-100 md:rounded-lg"
              fill
              style={{ objectFit: 'contain' }}
              alt="Phone Icon"
              quality={100}
              src={imageSrc || '/images/Products/default-product.webp'}
            />
          </div>
        </Wrapper>
        {/* عنوان محصول */}
        {!showOnlyImage && (
          <>
            <div
              className={clsxm(
                'line-clamp-2 leading-6 text-sm',
                !moodCheckoutCart && orderDetail
                  ? 'col-start-2 col-span-3 row-span-1 md:row-span-1'
                  : moodCheckoutCart
                    ? 'col-start-2 pt-2 md:pt-0 px-1 col-span-3 row-span-3 md:col-span-8 md:col-start-4 row-start-1'
                    : moodCheckoutCartNext
                      ? 'row-span-2 col-span-2 col-start-3 md:col-span-8 leading-6 row-start-1'
                      : moodInvoice
                        ? 'col-span-3 md:col-span-8'
                        : 'col-start-2 col-span-3'
              )}
            >
              <Link
                className=" text-xs md:text-sm md:font-Medium line-clamp-2"
                href={`/p/${slug}`}
                onClick={onClick}
              >
                {name}
              </Link>
            </div>
            {moodCheckoutCartNext && onAddToCart && (
              <div className="flex justify-center items-center row-start-5 md:col-span-4 md:col-start-3  md:row-start-4 col-span-3 col-start-1 text-white  my-2 md:my-0 font-semibold px-4 rounded-md ">
                <Button
                  onClick={onAddToCart}
                  className="bg-emerald-500  text-white py-2 my-2 md:my-0 font-semibold px-4 rounded-md "
                >
                  افزودن به سبد خرید
                </Button>
              </div>
            )}
            {moodCheckoutCartNext && onDelete && (
              <div className="col-span-1 flex justify-center items-center row-start-5 md:row-start-4 md:col-span-2  my-2 md:my-0 col-start-4 md:col-start-6 ">
                <Button
                  onClick={onDelete}
                  className="flex gap-1 py-2 px-4 justify-center  font-regular text-xs select-none cursor-pointer 
                      rounded-md border hover:border-warning-700
                      transition-all box-border  items-center"
                >
                  <div className="relative h-6 w-6">
                    <Image
                      src="/svg/profile/trash.svg"
                              fill
    style={{ objectFit: "contain" }}
                      alt="Phone Icon"
                      quality={100}
                    />
                  </div>
                  <h3>حذف</h3>
                </Button>
              </div>
            )}
            {/* //عدد */}
            {(moodCheckoutCart || orderDetail || moodInvoice) && (
              <div
                className={clsxm(
                  'py-1 flex gap-1 border rounded-md md:border-none justify-center items-center',
                  moodCheckoutCartNext &&
                    'border-none shadow-none gap-5 md:my-4 w-full md:w-1/2',
                  !moodCheckoutCart &&
                    (orderDetail && iMeI
                      ? 'row-start-5 md:row-start-3 md:col-start-3 col-start-4'
                      : orderDetail && !iMeI && 'row-start-4 col-start-4'),
                  moodCheckoutCart
                    ? 'row-start-5 col-start-3 col-span-2 border-none md:col-span-2 md:row-start-3 md:col-start-6 md:justify-start'
                    : moodInvoice && 'col-start-4 row-start-2'
                )}
              >
                {
                  //////////////////
                }
                <div className="flex items-center border px-2 py-1  md:border  rounded-xl border-gray-200">
                  {/* دکمه افزایش */}
                  {moodCheckoutCart && !moodCheckoutCartNext && (
                    <span
                      onClick={handleIncrease}
                      className={clsxm(
                        ' w-6 h-6 justify-center items-center rounded-md flex my-1 cursor-pointer select-none transition-all',
                        typeof maxOrder === 'number' &&
                          localQuantity >= maxOrder &&
                          'opacity-50 cursor-not-allowed'
                      )}
                    >
                      +
                    </span>
                  )}

                  {/* نمایش مقدار */}
                  {!moodCheckoutCartNext && (
                    <h3
                      className={clsxm(
                        'rounded-xl py-1 w-5 text-gray-800 text-sm h-5 flex items-center justify-center select-none',
                        !moodCheckoutCart
                          ? 'bg-gray-100'
                          : 'text-emerald-500 px-8'
                      )}
                    >
                      {localQuantity}
                    </h3>
                  )}

                  {/* دکمه کاهش یا حذف */}
                  {moodCheckoutCart && !moodCheckoutCartNext && (
                    <span
                      onClick={handleDecrease}
                      className=" w-6 h-6 justify-center items-center rounded-md flex cursor-pointer select-none hover:bg-gray-50 transition-all"
                    >
                      {typeof minOrder === 'number' &&
                      localQuantity > minOrder ? (
                        '-'
                      ) : (
                        // آیکون سطل زباله
                        <div className="relative h-5 w-5">
                          <Image
                            src="/svg/trashred.svg"
                            fill
                            className="object-contain"
                            alt="Remove icon"
                          />
                        </div>
                      )}
                    </span>
                  )}

                  {/* متن عدد */}
                  {!moodCheckoutCart && (
                    <h3 className="text-gray-800 text-sm">عدد</h3>
                  )}
                </div>
              </div>
            )}

            {/* امکانات */}
            {/* {(moodCheckoutCart || moodCheckoutCartNext) && (
              <Link
                href={`/p/${slug}`}
                className={clsxm(
                  "flex  mt-2 md:gap-4 bg-red-500 font-regular text-xs md:text-sm text-gray-400 ",
                  moodCheckoutCart &&
                    "max-h-5 row-start-4 md:row-start-3 col-span-4  md:col-start-4 md:col-span-8",
                  moodCheckoutCartNext &&
                    "row-start-5 col-span-4 md:col-span-6 mb-3 md:col-start-3 md:row-start-4",
                )}
              >
                <div className="flex gap-1 w-full  md:w-auto items-center bg-yellow-300">
                  <div className="relative md:h-5 md:w-5 h-4 w-4">
                    <Image
                      src={"/svg/truck-fast-gray.svg"}
             fill
    style={{ objectFit: "contain" }}
                      alt="Phone Icon"
                      quality={100}
                    />
                  </div>
                  <h3> ارسال فوری</h3>
                </div>
                <div className="flex gap-1 w-full md:w-auto items-center">
                  <div className="relative md:h-5 md:w-5 h-4 w-4">
                    <Image
                      src={"/svg/money-time.svg"}
                           fill
    style={{ objectFit: "contain" }}
                      alt="Phone Icon"
                      quality={100}
                    />
                  </div>
                  <h3> خریداقساطی</h3>
                </div>
                <div className="flex gap-1 w-full md:w-auto items-center">
                  <div className="relative md:h-5 md:w-5 h-4 w-4">
                    <Image
                      src={"/svg/money-time.svg"}
                             fill
    style={{ objectFit: "contain" }}
                      alt="Phone Icon"
                      quality={100}
                    />
                  </div>
                  <h3> خریداقساطی</h3>
                </div>
              </Link>
            )} */}

            {/* دکمه انتقال به خرید بعدی  */}
            {moodCheckoutCart && (
              <div
                onClick={() => {
                  if (onAddToCart) onAddToCart();
                }}
                className="flex justify-end text-emerald-500 font-regular text-xs select-none cursor-pointer 
                      transition-all box-border col-span-3 md:col-span-3  row-start-6 col-start-2 md:col-start-9 md:row-start-4"
              >
                <Button className="flex gap-1 items-center rounded-xl border border-transparent py-2 px-4 hover:bg-gray-100">
                  <h3>انتقال به خرید بعدی</h3>
                  <div className="relative h-4 w-4">
                    <Image
                      src="/svg/arrow-left-green.svg"
                             fill
    style={{ objectFit: "contain" }}
                      alt="Phone Icon"
                      quality={100}
                    />
                  </div>
                </Button>
              </div>
            )}
            {/* رنگ محصول */}
            {(moodCheckoutCart ||
              orderDetail ||
              moodCheckoutCartNext ||
              moodInvoice) && (
              <div
                className={clsxm(
                  ' flex gap-2  items-center select-none relative',
                  orderDetail && iMeI
                    ? 'row-start-4 col-start-2 col-span-2 md:row-start-3'
                    : orderDetail &&
                        !iMeI &&
                        'row-start-4 col-start-2 col-span-2 md:row-start-3',
                  moodCheckoutCart
                    ? 'col-start-2 row-start-3 col-span-3 md:col-span-2 md:row-start-3 md:col-start-4 pr-1'
                    : moodCheckoutCartNext
                      ? 'row-start-3 col-start-3 md:col-start-3 md:row-start-3 col-span-3'
                      : moodInvoice && 'row-start-2 col-span-2  md:col-start-2'
                )}
              >
                <span
                  className={clsxm(
                    'min-w-5 min-h-5  rounded-full border border-gray-500 p-1',
                    moodInvoice
                      ? 'md:min-w-5 md:min-h-5'
                      : 'md:min-w-7 md:min-h-7'
                  )}
                  style={{ backgroundColor: color }}
                ></span>
                <h3 className="text-gray-800 text-sm ">{colorName}</h3>
                {/* نمایش رنگ */}
              </div>
            )}
            {/* گارانتی  */}
            {orderDetail && (
              <div
                className={clsxm(
                  ' text-gray-800 text-sm  h-full first-line:flex justify-start flex-col gap-1  items-center',
                  orderDetail
                    ? 'row-start-3 md:row-start-2 col-span-3 md:col-span-1 col-start-2 md:col-start-3'
                    : ''
                )}
              >
                <div className="flex w-full h-full items-center">
                  <h3 className="">گارانتی 18 ماه شرکتی</h3>
                </div>
              </div>
            )}

            {/* // {رجسنری} */}
            {orderDetail && (
              <div
                className={clsxm(
                  'row-start-2 col-span-3 md:col-span-1 col-start-2 w-full  text-gray-800 text-sm flex justify-start flex-col gap-1 items-center'
                )}
              >
                <div className="flex w-full items-center h-full">
                  <h3 className="">رجیستر شده + کد فعال سازی</h3>
                </div>
              </div>
            )}
            {(orderDetail ||
              moodCheckoutCart ||
              moodCheckoutCartNext ||
              moodInvoice) && (
              <>
                {/* قیمت و تخفیف محصول */}

                <div
                  className={clsxm(
                    'flex gap-2 md:gap-4 items-center select-none',
                    moodCheckoutCart
                      ? 'row-start-5 col-span-2 md:col-start-8 md:col-span-1 md:row-start-3 gap-1'
                      : orderDetail && iMeI
                        ? 'row-start-6 col-start-2 md:col-start-4 md:row-start-4 col-span-4 md:col-span-1'
                        : moodCheckoutCartNext
                          ? 'row-start-4 col-start-3 col-span-2 md:col-start-5 md:pr-4 md:row-start-3 md:col-span-1'
                          : moodInvoice
                            ? 'row-start-3 col-span-3 md:col-start-5 md:row-start-2'
                            : 'row-start-5 col-start-2 md:row-start-4 col-span-3 md:col-span-1'
                  )}
                >
                  {Number(discount) > 0 && (
                    <span className="bg-success-500 text-white text-xs px-2 py-0.5 rounded-xl">
                      %{Number(discount)}
                    </span>
                  )}

                  {initialPrice !== price && (
                    <h3 className="line-through decoration-red-700 text-gray-800 text-sm font-regular ">
                      {initialPrice !== undefined
                        ? initialPrice.toLocaleString('fa-IR')
                        : ''}
                    </h3>
                  )}

                  <div className="flex gap-1 items-center ">
                    <h3 className="font-Medium  ">
                      {price?.toLocaleString('fa-IR')}
                    </h3>
                    <h3 className="text-xs">تومانء</h3>
                  </div>
                </div>

                {/* سریال  */}

                {orderDetail && (
                  <div className=" text-gray-800 text-sm flex items-center w-full row-start-5 md:row-start-2 col-start-1 md:col-start-4 col-span-3 md:col-span-1 ">
                    <h3 className="pl-1">IMEI:</h3>
                    <h3>
                      {iMeI ? (
                        iMeI
                      ) : (
                        <h3 className="text-xs text-gray-500">
                          درانتظارثبت...
                        </h3>
                      )}
                    </h3>
                  </div>
                )}
              </>
            )}
            {!panelCart &&
              !orderDetail &&
              !moodCheckoutCart &&
              !moodCheckoutCartNext &&
              !moodInvoice && (
                <Link
                  href={`/p/${slug}`}
                  className="flex  justify-between items-center text-xs font-normal leading-5 col-start-2 col-span-3"
                >
                  {price !== 'ناموجود' && (
                    <div className="flex gap-1 items-center bg-green-100 px-[6px] py-[2px] border border-secondary-500/50 rounded-md">
                      <Image
                        src="/svg/truck-fast.svg"
                        alt="truck-fast"
                        width={16}
                        height={16}
                      />
                      <div className="text-secondary-700 ">
                        {localization.immediateShipping}
                      </div>
                    </div>
                  )}
                  {rate && (
                    <div className="flex gap-2 items-center">
                      <div className="text-warning-500">{rate}</div>
                      <Image
                        src="/svg/star.svg"
                        alt="star"
                        width={16}
                        height={16}
                      />
                    </div>
                  )}
                </Link>
              )}
            {/* /////قیمت نهایی و تخفیف محصول  */}
            {!orderDetail &&
              !moodCheckoutCart &&
              !moodCheckoutCartNext &&
              !moodInvoice && (
                <>
                  {price === 'ناموجود' ? (
                    // نمایش برای محصولات ناموجود
                    <div className="flex flex-col gap-2 col-start-2 col-span-3">
                      {/* <div className="text-gray-700 text-sm font-bold">
                        ناموجود
                      </div> */}
                      <button className="group flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-red-50 to-red-50 border border-red-200 rounded-md text-red-700 text-xs font-medium transition-all duration-200 hover:from-red-100 hover:to-red-100 hover:border-red-300 hover:shadow-sm active:scale-95 w-full">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse "></div>
                        <span className="whitespace-nowrap text-xs md:text-[15px] leading-tight">
                          ناموجود
                        </span>
                      </button>
                    </div>
                  ) : (
                    // نمایش قیمت برای محصولات موجود
                    <div
                      className={clsxm(
                        'flex items-center col-start-2 col-span-3',
                        discount ? 'justify-between' : 'justify-end'
                      )}
                    >
                      {discount && (
                        <div className="bg-success-500 rounded-lg px-2 py-[1px] text-white text-xs font-normal leading-5">
                          {discount}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="text-left">
                          {discount ? (
                            <>
                              <div className="text-xs font-Medium leading-5 ">
                                {typeof price === 'number'
                                  ? price.toLocaleString('fa-IR')
                                  : price}
                              </div>
                              <div className="line-through text-gray-400 text-xs font-normal leading-5 ">
                                {initialPrice?.toLocaleString('fa-IR')}
                              </div>
                            </>
                          ) : (
                            <div className="text-xs font-Medium leading-5 ">
                              {initialPrice?.toLocaleString('fa-IR')}
                            </div>
                          )}
                        </div>
                        <h3 className="text-xs">{localization.toman}</h3>
                      </div>
                    </div>
                  )}
                </>
              )}
          </>
        )}
      </div>
      {panelCart && (
        <div className="flex gap-2 justify-between pb-3">
          <Link
            href={`/p/${slug}`}
            className="border whitespace-nowrap py-2 px-4 rounded-md border-emerald-500 bg-emerald-100/30 text-sm font-semibold text-emerald-500 hover:bg-emerald-500 hover:text-white transition-al"
          >
            مشاهده محصول
          </Link>
          {name !== undefined && id !== undefined && (
            <DeleteListFavorites name={name} id={id.toString()} />
          )}
        </div>
      )}
    </>
  );
};
