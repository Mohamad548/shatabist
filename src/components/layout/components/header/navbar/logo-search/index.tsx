'use client';
import Logo from '@/components/base/logo';
import ManageModal from '@/components/base/modal';
import IconSize from '@/constants/icon-size';
import Image from 'next/image';
import Accordion from '@/components/base/accordion';
import Link from 'next/link';
import clsxm from '@/utils/clsxm';
import { useCategories } from '../../hooks';
import { Category } from '@/components/layout/components/header/navbar/product-categories';
import { BASE_URL } from '@/constants/url';
import SearchBox from '@/components/app/search-box';
import { localization } from '@/constants/localization';
import { MenuItem } from '@/constants/mock-data/navbar';
import ShataLoading from '@/components/base/loading/shata-loading';

export default function LogoSearch() {
  const { data, isPending } = useCategories();
  const getCategoryIconSrc = (icon: string | null | undefined) => {
    if (!icon) return '/images/default-icon.png';
    if (typeof icon === 'string' && icon.startsWith('/uploads')) {
      return `${BASE_URL}${icon}`;
    }
    return null;
  };
  return (
    <div className="flex items-center gap-3 md:gap-8 md:flex-1 ">
      <ManageModal
        triggerContent={
          <Image
            src="/svg/menu.svg"
            width={IconSize.lg}
            height={IconSize.lg}
            alt="menu"
            className="md:hidden"
          />
        }
        className="fixed inset-0 z-50"
        modalBodyClass="absolute top-0 bottom-0 left-0 right-0 p-0"
        cancelLabel={
          <div className="max-h border rounded-md p-1 text-gray-700">
            <Image
              src="/svg/profile/close-circle.svg"
              alt="close-modal"
              width={20}
              height={20}
            />
          </div>
        }
        cancelBoxClass="absolute left-3 top-4"
      >
        {({ closeModal }) => (
          <div className="overflow-y-auto">
            <div className="w-full">
              <h3 className="text-gray-700 font-semibold text-sm p-6">
                منو و دسته بندی
              </h3>
              <hr />
              <div className="px-4 ">
                <div className="px-2 mt-6 mb-6 ">
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="grid grid-cols-3 gap-3">
                      {MenuItem.map((menu, index) => {
                        // Appropriate icons for each service
                        const categoryIcons = [
                          '/svg/bag-2.svg', // Store (فروشگاه)
                          '/svg/deal.svg', // Panel (پنل همکاری)
                          '/svg/cards.svg', // Installments (خرید اقساطی)
                          '/svg/info-circle.svg', // Guide (راهنمای فروشگاه)
                          '/svg/note-add.svg', // Magazine (مجله شتا)
                        ];

                        const gradients = [
                          'from-emerald-400 to-emerald-500', // Store - Green
                          'from-blue-400 to-blue-500', // Panel - Blue
                          'from-orange-400 to-orange-500', // Installments - Orange
                          'from-purple-400 to-purple-500', // Guide - Purple
                          'from-pink-400 to-pink-500', // Magazine - Pink
                        ];

                        return (
                          <Link
                            key={menu.id}
                            href={menu.link || '#'}
                            onClick={closeModal}
                            className="group flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 ease-out transform hover:-translate-y-1"
                          >
                            {/* Icon Container with Gradient */}
                            <div
                              className={clsxm(
                                'w-12 h-12 rounded-full  bg-gradient-to-br flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300',
                                gradients[index % gradients.length]
                              )}
                            >
                              <Image
                                src={
                                  categoryIcons[index] || '/svg/element-4.svg'
                                }
                                width={24}
                                height={24}
                                alt={menu.name}
                                className="filter brightness-0 invert"
                              />
                            </div>

                            {/* Text */}
                            <div className="text-center">
                              <h5 className="text-xs md:text-sm font-regular text-gray-800 group-hover:text-emerald-600 transition-colors duration-200 leading-tight whitespace-nowrap">
                                {menu.name}
                              </h5>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {isPending ? (
                  <ShataLoading
                    size="medium"
                    showText={true}
                    text="در حال بارگذاری دسته بندی ها..."
                  />
                ) : (
                  data?.categories?.map((category: Category, index: number) => (
                    <Accordion
                      key={category.id}
                      title={
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center p-2">
                            <Image
                              alt={category.title}
                              src={
                                getCategoryIconSrc(category?.icon) ||
                                '/images/default-icon.png'
                              }
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <h3 className="font-semibold text-gray-900">
                              {category.title}
                            </h3>
                            {category.children?.length > 0 ? (
                              <span className="text-xs text-gray-500">
                                {category.children?.length || 0} زیردسته
                              </span>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      }
                      itemLast={index + 1}
                      itemRange={data?.categories?.length}
                      classname="px-2.5 py-0"
                    >
                      <div className="px-4 pb-4">
                        {category.children?.length > 0 ? (
                          <div className="grid gap-2 grid-cols-1">
                            {category.children.map((subcategory: Category) => (
                              <div key={subcategory.id}>
                                <Link
                                  href={`/pcat/${category.slug}/${subcategory.slug}`}
                                  className="flex w-full items-center justify-center px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg- -50 hover:border-emerald-200 hover:text-emerald-700 text-sm font-medium transition-colors"
                                  onClick={closeModal}
                                >
                                  {subcategory.title}
                                </Link>
                                {subcategory?.children?.length > 0 && (
                                  <div className="mt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      {subcategory.children.map(
                                        (subSubcategory: Category) => (
                                          <Link
                                            key={subSubcategory.id}
                                            href={`/pcat/${category.slug}/${subcategory.slug}/${subSubcategory.slug}`}
                                            className="group flex flex-col items-center gap-5 p-2 border-2 border-gray-100 rounded-lg"
                                            onClick={closeModal}
                                          >
                                            {subSubcategory?.icon ? (
                                              <div className="w-full py-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100  border border-gray-200 flex items-center justify-center ">
                                                <Image
                                                  alt={subSubcategory.title}
                                                  src={
                                                    getCategoryIconSrc(
                                                      subSubcategory?.icon
                                                    ) ||
                                                    '/images/default-icon.png'
                                                  }
                                                  width={50}
                                                  height={50}
                                                  className="object-contain"
                                                />
                                              </div>
                                            ) : (
                                              <div className="w-full rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center  ">
                                                <span className="text-black text-lg font-bold">
                                                  {subSubcategory.title.charAt(
                                                    0
                                                  )}
                                                </span>
                                              </div>
                                            )}
                                            <span className="text-xs font-bold text-gray-800 text-center leading-tight line-clamp-2">
                                              {subSubcategory.title}
                                            </span>
                                          </Link>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Link
                            href={`/pcat/${category.slug}`}
                            className="flex items-center justify-center p-3 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"
                            onClick={closeModal}
                          >
                            مشاهده محصولات
                          </Link>
                        )}
                      </div>
                    </Accordion>
                  ))
                )}
                {/* شتا سرویس ها - Beautiful Grid Menu */}
              </div>
            </div>
          </div>
        )}
      </ManageModal>
<Link href="/" className="hidden md:flex relative items-center w-36 h-14">
  <Image
    src="/logo/Shata20-logotype-logo-Green-Cricle-5-515px.png"
    alt="logo-shata"
    width={135}
    height={50}
    style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
  />
</Link>
      {/* <div className="hidden md:flex  relative w-20 h-20 md:w-20 md:h-20 items-center">
        <Logo
          src=""
          alt="logo-shata"
          cardImageSize="h-10 w-10 md:h-24 md:w-24 lg:h-32 lg:w-32"
        />
      </div> */}

      {/* باکس جستجو */}
      <div className="flex-1 hidden md:block mx-4">
        <ManageModal
          modalBodyClass="w-full rounded-none absolute top-0 flex justify-center"
          triggerContent={
            <>
              <div className="w-full flex bg-gray-50 border rounded-xl py-2 cursor-pointer">
                <div className="relative h-5 w-5 pr-10">
<Image
  src="/svg/search-normal.svg"
  alt="search icon"
  fill
  sizes="(max-width: 768px) 100vw, 20px" // برای موبایل 100% عرض، وگرنه 20px
  style={{ objectFit: 'contain' }}
/>
                </div>
                <p className="text-gray-400">{localization.search}</p>
              </div>
            </>
          }
          className="fixed inset-0 z-50"
          cancelLabel={
            <div>
              <Image
                src="/svg/btnColse.svg"
                alt="close-modal"
                width={42}
                height={42}
              />
            </div>
          }
          cancelBoxClass="flex ml-20 mr-2 items-start mt-0.5"
        >
          {({ closeModal }) => <SearchBox closeModal={closeModal} />}
        </ManageModal>
      </div>
    </div>
  );
}
