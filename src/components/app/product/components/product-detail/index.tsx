import React, { useMemo } from "react";
import ProductImage from "./product-image";
import ProductActionBox from "../base/product-action-box";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/base/button";
import CheckInstallment from "./components/check-installment";
import ManageModal from "@/components/base/modal";
import { ProductType } from "@/components/base/product-card/type";
import { StatusType, useColorStore } from "@/stores/colorStore";
import ToolsBar, { toolsBar } from "./product-image/gallery/tool-bar";
import { useCommentStatsStore } from "@/stores/comment-stats-store";
import { useScrollStore } from "@/stores/product-scroll-store";
import ShareProduct from "./product-image/gallery/tool-bar/itemes/share-product";
import FavoriteButton from "./product-image/gallery/tool-bar/itemes/favorite-button";
import AddToListButton from "./product-image/gallery/tool-bar/itemes/add-to-list";
import InstallmentCalculator from "@/components/app/installment-plan/components/installment-calculator";
import Iframe from './product-image/gallery/tool-bar/itemes/iframe';

interface StatusItem {
  id: number;
  src: string;
  text: string;
  key?: keyof StatusType;
}
function ProductDetail({
  productId,
  product,
  productColors,
}: {
  product?: ProductType;
  productColors?: any;
  productId?: number;
}) {
  const { status } = useColorStore();

  const items: StatusItem[] = [
    {
      id: 1,
      src: '/svg/truck-tick.svg',
      text: 'ارسال رایگان',
      key: 'freeDelivery',
    },
    {
      id: 2,
      src: '/svg/truck-fast-black.svg',
      text: 'ارسال فوری',
      key: 'fastDelivery',
    },
    {
      id: 3,
      src: '/svg/money-time-black.svg',
      text: 'امکان خرید قسطی',
      key: 'installmentAvailibility',
    },
    {
      id: 4,
      src: '/svg/box.svg',
      text: 'امکان خرید حضوری',
      key: 'payOnSite',
    },
    {
      id: 5,
      src: '/svg/box.svg',
      text: 'پرداخت درب محل',
      key: 'isInPersonPurchase',
    },
  ];

  const { averageRate, imageIds, totalComments } = useCommentStatsStore();
  const scrollToSection = useScrollStore((state) => state.scrollToSection);
  const areAnyProductsAvailable = useMemo(
    () =>
      productColors?.some(
        (p: { quantity?: number }) => p.quantity && p.quantity > 0
      ),
    [productColors]
  );
  return (
    <section className="flex select-none">
      {/* گالری محصول با جزئیات محصول */}
      <div className=" w-full flex flex-col md:flex-row gap-4">
        {/* گالری محصول */}
        <ProductImage product={product} />
        {/* جزئیات محصول */}
        <div className="flex-1 relative">
          {/* هدر صفحه  */}
          <div className="flex justify-between items-center my-2">
            <div className="flex justify-between w-full items-center">
              <div className="flex text-emerald-600 text-sm md:text-sm font-bold md:gap-4 gap-1">
                <Link href={`/brand/${product?.brand?.slug}`}>
                  {product?.brand?.title}
                </Link>
                <span>/</span>
                <Link
                  href={`/pcat/${product?.category?.parent?.slug}/${product?.category?.slug}`}
                >
                  {product?.category?.title}
                </Link>
              </div>
              <div className="md:hidden flex items-center">
                <ManageModal
                  triggerContent={
                    <div className="relative h-5 w-5 ml-1 flex-shrink-0">
                      <Image
                        src="/svg/Share2.svg"
                              fill
    style={{ objectFit: "contain" }}
                        alt="اشتراک گذاری"
                        quality={100}
                      />
                    </div>
                  }
                  className="fixed inset-0 z-50"
                >
                  <ShareProduct />
                </ManageModal>
                <FavoriteButton className="h-11 w-11" />
                <ManageModal
                  triggerContent={
                    <div className="relative text-base text-end w-5 h-5 flex justify-center items-center rotate-90 font-Bold ">
                      ...
                    </div>
                  }
                  fadeIn=" animate-slideUp"
                  fadeOut="animate-slideDown"
                  modalBodyClass="absolute bottom-0 left-0 right-0  z-50 w-full h-1/3 flex justify-start items-center "
                  className="fixed inset-0 z-40"
                  cancelLabel={
                    <div className="border border-gray-600 rounded-full p-1 w-6 h-6 text-gray-800 text-xs">
                      ✕
                    </div>
                  }
                  cancelBoxClass="absolute left-2 top-2 md:hidden"
                >
                  <ul className="w-full">
                    {toolsBar.map((item) => (
                      <Link href={item.href ?? ''} key={item.id}>
                        <li
                          key={item.id}
                          className=" flex gap-2 bg-white border-y border-gray-300 cursor-pointer hover:bg-gray-50 "
                        >
                          <ManageModal
                            triggerContent={
                              <div className="relative h-12 w-12">
                                <Image
                                  className="p-3"
                                  src={item.src}
                                              fill
    style={{ objectFit: "contain" }}
                                  alt={item.content}
                                  quality={100}
                                />
                              </div>
                            }
                            className="fixed inset-0 z-50"
                          >
                            <p className="text-sm text-gray-700 p-2">
                              {item.content}
                            </p>
                          </ManageModal>
                          <p className="text-sm text-gray-700 p-2">
                            {item.content}
                          </p>
                        </li>
                      </Link>
                    ))}
                    {product?.iframe && (
                      <Iframe
                        iframe={product?.iframe as unknown as string}
                        className='bottom-1/3'
                      />
                    )}

                    <AddToListButton />
                  </ul>
                </ManageModal>
              </div>
            </div>
          </div>
          {/* نام محصول */}
          <div className="relative">
            <div className="relative">
              <h3 className="font-bold text-base text-gray-800">
                {product?.title}
              </h3>
              <h3 className="font-regular mt-2 text-xs text-gray-400">
                {product?.sub_title}
              </h3>
            </div>
          </div>
          <div className="flex gap-2">
            {/* ویژگی و مشخصات محصول */}
            <div className=" w-full">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap md:flex-nowrap md:justify-start gap-2 my-5">
                  {product?.productProperties
                    ?.filter((item) => item.priority) // فقط موارد با priority: true
                    ?.sort((a, b) => a.priorityIndex - b.priorityIndex) // مرتب‌سازی بر اساس priorityIndex
                    ?.slice(0, 3)
                    ?.map((item) => (
                      <h3
                        key={item.property_value_id}
                        className="text-white bg-secondary-500 rounded-lg px-2 py-1 text-xs whitespace-nowrap"
                      >
                        {item.property_value?.description}
                      </h3>
                    ))}
                </div>
                {product?.productProperties &&
                  product.productProperties.length > 0 && (
                    <div className="grid gap-2">
                      {/* عنوان */}
                      <h3 className="font-semibold row-start-1 col-start-1 text-base text-gray-800 md:mb-3">
                        ویژگی‌های محصول
                      </h3>

                      {/* لیست ویژگی‌ها */}
                      <ul className="font-regular row-start-2 col-span-2 hidden-scrollbar text-gray-500 text-sm flex md:flex-col gap-2 md:list-disc overflow-scroll">
                        {product.productProperties
                          .sort((a, b) => a.priorityIndex - b.priorityIndex) // مرتب‌سازی بر اساس اولویت
                          .slice(0, 8)
                          .map((item) => (
                            <li
                              key={item.property_value_id}
                              className="py-2 md:p-0 px-4 border md:border-0 rounded-md cursor-pointer md:cursor-text"
                            >
                              <div className="flex flex-col md:flex-row justify-between md:justify-start items-start gap-2">
                                <h3 className="flex justify-start items-center text-body-2-compact whitespace-nowrap">
                                  {item.property_value?.property?.title ??
                                    '---'}
                                </h3>
                                <span className="md:block hidden">:</span>
                                <span className="text-gray-900 whitespace-nowrap">
                                  {item.property_value?.description ?? '---'}
                                </span>
                              </div>
                            </li>
                          ))}
                      </ul>

                      {/* دکمه مشاهده همه */}
                      <Button
                        onClick={() => scrollToSection('info')}
                        className="flex md:row-start-3 row-start-1 text-emerald-600 gap-2 transition-all border border-transparent items-center justify-end md:justify-start rounded-md"
                      >
                        <h3 className="font-semibold text-base text-center">
                          مشاهده همه
                        </h3>
                        <Image
                          width={24}
                          height={24}
                          src="/svg/arrow-left-green.svg"
                          alt="amazing"
                          className=""
                        />
                      </Button>
                    </div>
                  )}
              </div>
              {/* هشدار */}
              <div className=" flex mt-6  gap-4">
                {/* سامانه همتا */}
                <ManageModal
                  triggerContent={
                    <div className="flex items-center cursor-pointer text-gray-600 ">
                      <div className="relative h-6 w-10">
                        <Image
                          className=""
                          src="/svg/danger.svg"
                                      fill
    style={{ objectFit: "contain" }}
                          alt="Gallery Image"
                          quality={100}
                        />
                      </div>
                      <strong className="text-sm">هشدار سامانه همتا</strong>
                    </div>
                  }
                  modalBodyClass="md:w-1/4 mx-10"
                  cancelLabel={
                    <div className="">
                      <Image
                        src="/svg/profile/close-circle.svg"
                        alt="close-modal"
                        width={20}
                        height={20}
                      />
                    </div>
                  }
                  className="fixed inset-0 z-50"
                  cancelBoxClass="absolute left-5 top-5"
                >
                  <div className="font-regular  text-sm text-justify line-clamp-6">
                    <h3 className="font-Bold pb-2">هشدار سامانه همتا:</h3>
                    <hr />
                    <h3 className="text-gray-500 pt-2">
                      در صورت انجام معامله، از فروشنده کد فعالسازی را گرفته و
                      حتما در حضور ایشان، دستگاه را از طریق #7777*، برای سیمکارت
                      خود فعالسازی نمایید. آموزش تصویری در آدرس اینترنتی
                      hmti.ir/06
                    </h3>
                  </div>
                </ManageModal>

                {/*شرایط مرجوعی کالا */}
                <ManageModal
                  triggerContent={
                    <div className="flex items-center cursor-pointer text-gray-600  ">
                      <div className="relative h-6 w-10">
                        <Image
                          src="/svg/3d-rotate.svg"
                                     fill
    style={{ objectFit: "contain" }}
                          alt="Gallery Image"
                          quality={100}
                        />
                      </div>
                      <strong className="text-sm"> شرایط مرجوعی کالا</strong>
                    </div>
                  }
                  className="fixed inset-0 z-50"
                  modalBodyClass="md:w-1/4 mx-10"
                  cancelLabel={
                    <div className="">
                      <Image
                        src="/svg/profile/close-circle.svg"
                        alt="close-modal"
                        width={20}
                        height={20}
                      />
                    </div>
                  }
                  cancelBoxClass="absolute left-5 top-5"
                >
                  <div className="font-regular text-sm  text-justify">
                    <h3 className="font-Bold pb-2">شرایط مرجوعی کالا:</h3>
                    <hr />
                    <h3 className="text-gray-500 pt-2">
                      در گروه موبایل با دلیل انصراف از خرید تنها در صورتی مورد
                      قبول است که پلمب کالا باز نشده باشد. تمام گوشی‌های شتا20
                      ضمانت رجیستری دارند. در صورت وجود مشکل رجیستری، می‌توانید
                      بعد از مهلت قانونی ۳۰ روزه، گوشی خریداری‌شده را مرجوع
                      کنید.
                    </h3>
                  </div>
                </ManageModal>
              </div>
              {/* خرید قسطی */}
              {status?.installmentAvailibility && (
                <div className=" md:hidden border my-3 rounded-md border-gray-200 p-4 flex flex-col gap-6">
                  <h3 className="font-semibold text-sm text-gray-800">
                    خرید اقساطی محصول
                  </h3>
                  <h3 className="font-regular text-xs text-gray-400">
                    فقط با ماهی 10,000,000 تومانء (12ماه)
                  </h3>
                  <ManageModal
                    triggerContent={
                      <Button className="font-semibold text-sm text-emerald-600 text-center py-3 w-full border-2 border-emerald-600 rounded-md hover:text-white hover:bg-emerald-600 transition-all">
                        خرید اقساطی
                      </Button>
                    }
                    cancelLabel={
                      <div className="max-h absolute top-5 left-5">
                        <Image
                          src="/svg/profile/close-circle.svg"
                          alt="close-modal"
                          width={25}
                          height={25}
                        />
                      </div>
                    }
                    className="fixed inset-0 z-50"
                    modalBodyClass=" overflow-y-auto max-h-[90vh]"
                  >
                    <InstallmentCalculator
                      showProductInfo={true}
                      installmentStatus={true}
                    />
                  </ManageModal>
                </div>
              )}
            </div>

            {/* جعبه اقدامات محصول  */}
            <div className="hidden md:block relative bottom-0 w-full max-w-80">
              <div className="flex justify-between my-2 ">
                <div className="text-gray-500 font-regular text-[10px] flex gap-1 items-center pt-1">
                  <h3>کدکالا</h3>:<h3>{product?.id}</h3>
                </div>
                <div className="flex items-center">
                  <h3 className="text-warning-500 font-regular text-sm pt-1">
                    {averageRate}
                  </h3>
                  <div className="relative h-4 w-4  rounded-xl overflow-hidden">
                    <Image
                      className=""
                      src="/svg/star.svg"
                             fill
    style={{ objectFit: "contain" }}
                      alt="Gallery Image"
                      quality={100}
                    />
                  </div>

                  <div
                    onClick={() => scrollToSection('review')}
                    className="text-gray-500 cursor-pointer font-regular text-[10px]"
                  >
                    ({totalComments} نظر ثبت شده)
                  </div>
                </div>
              </div>

              <div className="border  rounded-md border-gray-200  flex flex-col gap-1">
                <ProductActionBox
                  productColors={productColors}
                  productId={productId}
                  className="md:static md:pb-4"
                />
                {areAnyProductsAvailable &&
                  (() => {
                    const filteredItems = items.filter((item) =>
                      item.key ? status[item.key] : true
                    );

                    return filteredItems.length > 0 ? (
                      <>
                        <hr />
                        <div className="grid grid-cols-2 gap-3 pr-4 pb-6">
                          {filteredItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-1 items-center"
                            >
                              <div className="relative h-6 w-6">
                                <Image
                                  src={item.src}
                                          fill
    style={{ objectFit: "contain" }}
                                  alt={item.text}
                                  quality={100}
                                />
                              </div>
                              <h3 className="font-medium text-xs text-gray-600">
                                {item.text}
                              </h3>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null;
                  })()}
              </div>
              {/* خرید قسطی */}
              {areAnyProductsAvailable && status?.installmentAvailibility && (
                <div className="border my-3 rounded-md border-gray-200 p-4 flex flex-col gap-6">
                  <h3 className="font-semibold text-sm text-gray-800">
                    خرید اقساطی محصول
                  </h3>
                  <h3 className="font-regular text-xs text-gray-400">
                    فقط با ماهی 10,000,000 تومانء (12ماه)
                  </h3>
                  <ManageModal
                    triggerContent={
                      <Button className="font-semibold text-sm text-emerald-600 text-center py-3 w-full border-2 border-emerald-600 rounded-md hover:text-white hover:bg-emerald-600 transition-all">
                        خرید اقساطی
                      </Button>
                    }
                    cancelLabel={
                      <div className="max-h absolute top-5 left-5">
                        <Image
                          src="/svg/profile/close-circle.svg"
                          alt="close-modal"
                          width={25}
                          height={25}
                        />
                      </div>
                    }
                    modalBodyClass="w-4/5 overflow-y-auto max-h-[88vh] md:max-h-[90vh] "
                    className="fixed inset-0 z-50"
                  >
                    <InstallmentCalculator
                      showProductInfo={true}
                      installmentStatus={ false}
                    />
                  </ManageModal>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
