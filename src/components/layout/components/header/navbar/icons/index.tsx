"use client";
import { LogoutModal } from "@/components/app/profile-user/components/base/profile-modals";
import SearchBox from "@/components/app/search-box";
import ManageModal from "@/components/base/modal";
import IconSize from "@/constants/icon-size";
import { PageLevelLocalization } from "@/constants/localization";
import { ItemMenuProfile } from "@/constants/mock-data/navbar";
import { routes } from "@/constants/routes";
import { useUserStore } from "@/stores/useUserStore";
import { useCartStore } from "@/stores/useCartStore";
import { Popover, Transition } from "@headlessui/react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
const { home: homeLocalization } = PageLevelLocalization;

export default function HeaderIcons() {
  const user = useUserStore((state) => state.user);
  const { totalQuantity } = useCartStore();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = getCookie("token");
    setIsLogin(!!token);
  }, [user]);

  const fullName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : "کاربر شتا20";

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex gap-6 items-center  flex-2 ">
      {!isLogin ? (
        <Link
          href={routes.login}
          className="hidden md:flex items-center gap-2 border  border-gray-200 px-2 rounded-xl h-10"
        >
          <Image
            src="/svg/user-octagon.svg"
            width={IconSize.lg}
            height={IconSize.lg}
            alt="user-octagon"
          />
          <div>{!isLogin && <h3>{homeLocalization.loginLogout}</h3>}</div>
        </Link>
      ) : (
        <div className="hidden md:flex items-center gap-2 border  border-gray-200 px-3 rounded-xl h-10">
          <Popover>
            <div
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className="pt-1 z-50"
            >
              <Popover.Button className="group inline-flex items-center rounded-md text-base font-medium hover:text-opacity-100 focus:outline-none  focus-visible:ring-opacity-75 mb-2">
                {fullName === "کاربر شتا20" ? (
                  <div className="relative">
                    <span className="w-1.5 h-1.5 bg-warning-500 rounded-full absolute bottom-1"></span>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/svg/user-octagon.svg"
                    width={IconSize.lg}
                    height={IconSize.lg}
                    alt="user-octagon"
                  />
                  <span className="flex font-Bold border-gray-200  ">
                    {fullName}
                  </span>
                </div>
              </Popover.Button>
              <Transition
                as={Fragment}
                show={isOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 -translate-x-1"
                leaveTo="opacity-0 translate-x-1"
              >
                <Popover.Panel className="absolute z-50 left-40 top-32">
                  <div className="bg-white/95 backdrop-blur-none rounded-2xl shadow-primary border border-gray-100 min-w-[280px] overflow-hidden">
                    {/* Decorative gradient top */}
                    <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>

                    <div className="p-6">
                      {/* User Profile Section */}
                      <Link
                        href={routes.profile.dashboard}
                        className="flex items-center gap-4 p-3 rounded-xl bg-gray-25 hover:bg-gray-50 transition-all duration-200 group mb-4"
                      >
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <Image
                              src="/svg/user-octagon.svg"
                              width={20}
                              height={20}
                              alt="user-icon"
                              className="filter brightness-0 invert"
                            />
                          </div>
                          {fullName === "کاربر شتا20" && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-Medium text-gray-900 truncate text-sm">
                            {fullName}
                          </h3>
                          <p className="text-gray-500 text-xs mt-0.5">
                            {user?.phone_number}
                          </p>
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Image
                            src="/svg/arrowLeftProfilw.svg"
                            width={16}
                            height={16}
                            alt="arrow"
                            className="text-gray-400"
                          />
                        </div>
                      </Link>

                      {/* Authentication Badge */}
                      {fullName === "کاربر شتا20" && (
                        <Link
                          href="/profile-user/user-info"
                          className="flex items-center justify-center gap-2 w-full mb-4 p-3 bg-warning-100 hover:bg-warning-200 border border-warning-200 rounded-xl transition-all duration-200 group"
                        >
                          <div className="w-5 h-5 bg-warning-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              !
                            </span>
                          </div>
                          <span className="text-warning-700 font-Medium text-sm">
                            تکمیل احراز هویت
                          </span>
                          <div className="opacity-60 group-hover:opacity-100 transition-opacity">
                            <Image
                              src="/svg/arrowLeftProfilw.svg"
                              width={14}
                              height={14}
                              alt="arrow"
                              className="text-warning-600"
                            />
                          </div>
                        </Link>
                      )}

                      {/* Menu Items */}
                      <div className="space-y-1">
                        {ItemMenuProfile.map((item, index) => (
                          <Link
                            key={item?.id}
                            href={item?.link}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                          >
                            <div className="w-9 h-9 bg-gray-100  group-hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors">
                              <Image
                                src={item.src}
                                width={18}
                                height={18}
                                alt={item.name}
                                className="group-hover:filter group-hover:brightness-0 group-hover:saturate-100 group-hover:hue-rotate-90 transition-all"
                              />
                            </div>
                            <span className="text-gray-700 group-hover:text-gray-900 font-regular text-sm flex-1">
                              {item.name}
                            </span>
                            <div className="opacity-0 group-hover:opacity-60 transition-opacity">
                              <Image
                                src="/svg/arrowLeftProfilw.svg"
                                width={14}
                                height={14}
                                alt="arrow"
                                className="text-gray-400"
                              />
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 my-2"></div>
                      <div className="flex items-center gap-3 p-2 mr-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group cursor-pointer">
                        <LogoutModal />
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </Popover>
          <div>{!isLogin && <h3>کاربر شتا20</h3>}</div>
        </div>
      )}
      <Link
        href={routes.cart}
        className="md:border-r border-r-gray-200 md:pr-4 hidden md:block relative"
      >
        <div className="relative">
          <Image
            src="/svg/shopping-cart.svg"
            width={IconSize.lg}
            height={IconSize.lg}
            alt="shopping cart"
          />
          {totalQuantity > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] shadow-lg">
              {totalQuantity > 99 ? "99+" : totalQuantity}
            </div>
          )}
        </div>
      </Link>
      <ManageModal
        triggerContent={
          <div className="md:border-r border-r-gray-200 md:pr-4 md:hidden">
            <Image
              src="/svg/Search 2.svg"
              width={IconSize.lg}
              height={IconSize.lg}
              alt="menu"
              className=""
            />
          </div>
        }
        className="fixed inset-0 z-50"
        modalBodyClass="absolute top-0 bottom-0 left-0 right-0 pt-5"
        cancelLabel={
          <div className=" z-10 max-h border rounded-md p-1 text-gray-700 ">
            <Image
              src="/svg/profile/close-circle.svg"
              alt="close-modal"
              width={30}
              height={30}
            />
          </div>
        }
        cancelBoxClass="absolute left-2  top-5"
      >
        {({ closeModal }) => (
          <SearchBox closeModal={closeModal} />
        )}
      </ManageModal>
    </div>
  );
}
