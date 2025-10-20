'use client';
import Button from '@/components/base/button';
import { PageLevelLocalization } from '@/constants/localization';
import { sideBarProfile } from '@/constants/mock-data/profile';
import clsxm from '@/utils/clsxm';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from Next.js
import { usePathname } from 'next/navigation';
import { LogoutModal } from '../base/profile-modals';
import { useUserStore } from '@/stores/useUserStore';
import { SmallLoading } from '@/components/base/loading/SmallLoading';
import { useState } from 'react';

type sideBarType = {
  vipUser: boolean;
  className?: string;
};
function SideBar({ vipUser = false, className }: sideBarType) {
  const { ProfileUser } = PageLevelLocalization;
  const pathname = usePathname();
  const { user } = useUserStore();
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const fullName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : null;

  // VIP Modal Component
  const VipModal = () => (
    <div
      className={clsxm(
        'fixed inset-0 z-50 flex items-center justify-center transition-all duration-300',
        isVipModalOpen ? 'visible opacity-100' : 'invisible opacity-0'
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsVipModalOpen(false)}
      />

      {/* Modal Content */}
      <div
        className={clsxm(
          'relative bg-white rounded-2xl p-6 mx-4 max-w-md w-full shadow-2xl transform transition-all duration-300',
          isVipModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        )}
        dir="rtl"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsVipModalOpen(false)}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            امکانات ویژه شتا20
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            این فرصت استثنایی را از دست ندهید! با ارسال اطلاعات حقیقی یا حقوقی
            خود، از مزایای همکاری با ما بهره‌مند شوید.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-600"
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
            </div>
            <span className="text-sm text-green-800 font-medium">
              خرید اقساطی بدون بهره
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span className="text-sm text-blue-800 font-medium">
              همکاری تجاری
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z"
                />
              </svg>
            </div>
            <span className="text-sm text-amber-800 font-medium">
              تخفیفات اختصاصی
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
            onClick={() => {
              setIsVipModalOpen(false);
              // Add navigation logic here
            }}
          >
            <div className="flex items-center justify-center gap-2">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              درخواست خرید اقساطی
            </div>
          </Button>

          <Button
            className="w-full py-3 rounded-xl border-2 border-green-500 text-green-600 hover:bg-green-50 font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
            onClick={() => {
              setIsVipModalOpen(false);
              // Add navigation logic here
            }}
          >
            <div className="flex items-center justify-center gap-2">
              {/* <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg> */}
              درخواست همکاری
            </div>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={clsxm(
          'border md:w-2/5 lg:w-1/3 xl:w-1/4  rounded-md p-6 flex-col gap-4 hidden md:flex border-gray-200 ',
          pathname === '/profile-user' && 'flex',
          className
        )}
      >
        <div className="flex flex-col md:justify-center justify-between items-center gap-2 border-b mb-2 relative overflow-hidden bg-gradient-to-br from-white via-secondary-50/30 to-primary-50/20 border border-secondary-100/50 rounded-2xl p-6">
          <div className="flex flex-col gap-2 items-center">
            <div className="relative w-14 md:w-full h-14">
              <Image
                src="/svg/profile/user-octagon.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="Profile Image"
                quality={100}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              {user ? (
                <>
                  <h3 className="font-regular">
                    {fullName?.trim() || '  بدون نام کاربری'}
                  </h3>
                  <Link
                    href="/profile-user/user-info"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-400 transition-colors"
                  >
                    <span>{user.phone_number}</span>
                    <div className="relative w-4 h-4">
                      <Image
                        src="/svg/profile/edit-2.svg"
                                  fill
    style={{ objectFit: "contain" }}
                        alt="Edit"
                        quality={100}
                      />
                    </div>
                  </Link>
                </>
              ) : (
                <SmallLoading />
              )}
              {user && fullName === null && (
                <div
                  className="mb-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 w-full text-center relative shadow-sm hover:shadow-md transition-all duration-300"
                  dir="rtl"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      ⚠️
                    </div>
                    <h3 className=" text-amber-700 text-xs">
                      احراز هویت مورد نیاز است
                    </h3>
                  </div>
                  <p className="text-amber-700 text-xs leading-relaxed mb-3">
                    برای استفاده از تمام امکانات، اطلاعات خود را تکمیل کنید.
                  </p>
                  <Link
                    href="/profile-user/user-info"
                    className="inline-flex items-center justify-center gap-1 bg-amber-500  text-white px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-1"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    شروع احراز هویت
                  </Link>
                </div>
              )}

              {user && fullName !== null && (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div
                    className="mb-2 bg-[#e3f8ef] border border-[#059f5c] rounded-lg p-3 w-full text-center relative shadow-sm transition-all duration-300"
                    dir="rtl"
                  >
                    <div className="flex items-center justify-center gap-2 ">
                      <div className="w-6 h-6 bg-[#059f5c] rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
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
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs md:text-sm text-[#059f5c]">
                          وضعیت احراز هویت:{' '}
                        </span>
                        <span className="text-xs md:text-sm text-[#059f5c] font-Bold">
                          تاییدشده
                        </span>
                      </div>
                    </div>
                    {/* <div className="flex items-center justify-center gap-1 px-2 py-1 bg-emerald-100 rounded-md">
                    <svg
                      className="w-3 h-3 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="text-emerald-700 text-xs font-medium">
                      حساب محافظت شده
                    </span>
                  </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Link
          href="/profile-user"
          className={clsxm(
            ' rounded-md p-2 flex gap-2 items-center',
            pathname === '/profile-user' &&
              'bg-[#e3f8ef] text-[#059f5c] font-Medium'
          )}
        >
          <div className="flex justify-between w-full items-center ">
            <div className="flex gap-2 items-center">
              <div className="relative w-6 h-6">
                <Image
                  src={
                    pathname === '/profile-user'
                      ? '/svg/elementActive.svg'
                      : '/svg/element-4.svg'
                  }
                         fill
    style={{ objectFit: "contain" }}
                  alt=""
                  quality={100}
                />
              </div>
              <span className="text-sm">داشبورد</span>
            </div>
            <span className="w-4 h-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
          </div>
        </Link>
        <div
          className={clsxm(
            'pt-4 md:flex flex-col gap-4 hidden',
            pathname === '/profile-user' && 'flex'
          )}
        >
          {sideBarProfile.map((item) => {
            const isActive = pathname.startsWith(`/profile-user/${item.slug}`);

            return (
              <Link
                key={item.id}
                href={`/profile-user/${item.slug}`}
                className={clsxm(
                  'rounded-md p-2 flex gap-2 items-center ',
                  isActive && 'bg-[#e3f8ef] text-[#059f5c] font-Medium'
                )}
              >
                <div className="flex justify-between w-full items-center">
                  {/* آیکون و متن */}
                  <div className="flex gap-2 items-center">
                    <div className="relative w-6 h-6">
                      <Image
                        src={isActive ? item.activeSrc : item.src}
                                 fill
    style={{ objectFit: "contain" }}
                        alt={item.name}
                        quality={100}
                      />
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </div>

                  {/* فلش به چپ */}
                  <span className="w-4 h-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="px-2 py-4">
          <LogoutModal />
        </div>
        {/* {vipUser && <HeadContent className="md:hidden" />}
        <div className="hidden md:block">
          <StatusOrders />
        </div> */}

        {/* {vipUser && (
          <div
            className={clsxm(
              "rounded-md p-4 hidden md:flex flex-col gap-3 border-gray-200 border-t",
              pathname === "/profile-user" && "flex"
            )}
          >
            <div className="w-full text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-sm mb-2 text-gray-800">
                امکانات ویژه شتا20
              </h3>
              <p className="font-regular text-xs text-gray-500 leading-relaxed mb-4">
                فرصت‌های استثنایی همکاری و خرید اقساطی را کشف کنید
              </p>
            </div>

            <Button
              onClick={() => setIsVipModalOpen(true)}
              className="py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                مشاهده امکانات ویژه
              </div>
            </Button>
          </div>
        )} */}
      </div>

      {/* VIP Modal */}
      <VipModal />
    </>
  );
}

export default SideBar;
