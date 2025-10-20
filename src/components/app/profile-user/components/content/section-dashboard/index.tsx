"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import VisitedProducts from "./slider/visited-products";
import MyListProducts from "./slider/my-list-products";
import clsxm from "@/utils/clsxm";
import {
  useGetAllOrders,
  useGetUser,
  useUserFavorite,
  useGetCart,
  useUserNotifications,
} from "../../../hooks";
import { useCartStore } from "@/stores/useCartStore";
type dashboardType = {
  vipUser: boolean;
};
function Dashboard({ vipUser = true }: dashboardType) {
  const { data: ordersData, isPending: ordersLoading } = useGetAllOrders();
  const { data: userData, isPending: userLoading } = useGetUser();
  const { data: favoritesData } = useUserFavorite();
  const { data: cartData } = useGetCart();
  const { data: notificationsData } = useUserNotifications();
  const { totalQuantity, totalPrice } = useCartStore();

  // Calculate comprehensive statistics
  const pendingOrdersCount =
    ordersData?.orders?.filter((order: any) => order.status === "PENDING")
      ?.length || 0;
  const completedOrdersCount =
    ordersData?.orders?.filter((order: any) => order.status === "COMPLETED")
      ?.length || 0;
  const totalOrdersCount = ordersData?.orders?.length || 0;
  const favoritesCount = favoritesData?.userFavorites?.length || 0;
  
  const unreadNotifications =
    notificationsData?.filter((notif: any) => !notif.read)?.length || 0;

  // Calculate order value statistics
  const totalOrderValue =
    ordersData?.orders?.reduce((sum: number, order: any) => {
      return sum + (order.totalPrice || 0);
    }, 0) || 0;

  const recentOrderValue =
    ordersData?.orders?.slice(0, 3).reduce((sum: number, order: any) => {
      return sum + (order.totalPrice || 0);
    }, 0) || 0;

  // const allOrderItems =
  //   data?.orders?.flatMap((order) =>
  //     order.orderItems.map((item) => ({
  //       id: item.id,
  //       title: item.variant.product.title, // اگه title داره
  //       image: item.variant.product.productImages[0]?.url,
  //       price: item.price,
  //       color: item.variant.color.color,
  //     }))
  //   ) || [];

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "صبح بخیر" : currentHour < 18 ? "عصر بخیر" : "شب بخیر";
  const userName = userData?.user?.first_name || "کاربر عزیز";

  return (
    <div className=" flex flex-col gap-6 mx-4 md:mx-0 mt-6 md:mt-0">
      {/* Dynamic Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-secondary-50/30 to-emerald-50/20 border border-secondary-100/50 rounded-2xl p-8">
        {/* Floating Elements */}
        <div className="absolute top-4 right-8 w-20 h-20 bg-secondary-500/10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-6 left-12 w-16 h-16 bg-emerald-500/10 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10 ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 border border-secondary-200/50 ">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-Medium text-gray-600">
                  آنلاین
                </span>
              </div>

              <h1 className="text-3xl font-Bold text-gray-800 leading-tight">
                {greeting} {userName} 👋
              </h1>

              <p className="text-gray-600 font-Medium max-w-md">
                امروز چه کاری می‌توانیم برای شما انجام دهیم؟
              </p>
            </div>

            {/* Interactive Stats */}
            <div className="flex gap-4">
              <Link href="profile-user/orders" className="group cursor-pointer">
                <div className="bg-white/90 backdrop-blur-sm border border-secondary-200/50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-Bold text-secondary-700 group-hover:scale-110 transition-transform">
                      {totalOrdersCount}
                    </div>
                    <div className="text-xs text-gray-500 font-Medium">
                      کل سفارش
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="profile-user/my-list-products"
                className="group cursor-pointer"
              >
                <div className="bg-white/90 backdrop-blur-sm border border-secondary-200/50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-Bold text-red-500 group-hover:scale-110 transition-transform">
                      {favoritesCount}
                    </div>
                    <div className="text-xs text-gray-500 font-Medium">
                      علاقه‌مندی
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* Pending Orders - Active State */}
        <Link
          href="profile-user/orders?activeTab=in_progress"
          className="group block"
        >
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-6 hover:shadow-md transition-all duration-500 hover:-translate-y-1 overflow-hidden">
            {/* Progress Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-amber-600"
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
                <span className="text-3xl font-Bold text-amber-700 group-hover:scale-110 transition-transform">
                  {pendingOrdersCount}
                </span>
              </div>

              <h3 className="font-Bold text-gray-800 mb-2">سفارش‌های جاری</h3>
              <p className="text-sm text-gray-600 mb-3">
                در حال پردازش و ارسال
              </p>

              <div className="flex items-center text-amber-600 group-hover:text-amber-700">
                <span className="text-sm font-Medium">مشاهده جزئیات</span>
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
            </div>
          </div>
        </Link>

        {/* Completed Orders - Success State */}
        <Link href="profile-user/orders?activeTab=sent" className="group block">
          <div className="relative bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/50 rounded-2xl p-6 hover:shadow-md transition-all duration-500 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-emerald-600"
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
                <span className="text-3xl font-Bold text-emerald-700 group-hover:scale-110 transition-transform">
                  {completedOrdersCount}
                </span>
              </div>

              <h3 className="font-Bold text-gray-800 mb-2">سفارش‌های تکمیل</h3>
              <p className="text-sm text-gray-600 mb-3">
                تحویل داده شده با موفقیت
              </p>

              <div className="flex items-center text-emerald-600 group-hover:text-emerald-700">
                <span className="text-sm font-Medium">مشاهده تاریخچه</span>
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
            </div>
          </div>
        </Link>

        {/* Cart Items - Shopping State */}
        <Link href="/checkout/cart" className="group block">
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 hover:shadow-md transition-all duration-500 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:-rotate-12 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
                    />
                  </svg>
                </div>
                <span className="text-3xl font-Bold text-blue-700 group-hover:scale-110 transition-transform">
                  {totalQuantity}
                </span>
              </div>

              <h3 className="font-Bold text-gray-800 mb-2">سبد خرید</h3>
              <p className="text-sm text-gray-600 mb-3">کالاهای انتخابی شما</p>

              <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                <span className="text-sm font-Medium">ادامه خرید</span>
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
            </div>
          </div>
        </Link>

        {/* Notifications - Alert State */}
        {/* <Link href="profile-user/notifications" className="group block">
          <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zm-8-3h8v8H7v-8zm0-2V6a4 4 0 118 0v6"
                    />
                  </svg>
                  {unreadNotifications > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-xs font-Bold">
                        {unreadNotifications}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-3xl font-Bold text-purple-700 group-hover:scale-110 transition-transform">
                  {unreadNotifications}
                </span>
              </div>

              <h3 className="font-Bold text-gray-800 mb-2">اعلان‌ها</h3>
              <p className="text-sm text-gray-600 mb-3">
                پیام‌های جدید و بروزرسانی
              </p>

              <div className="flex items-center text-purple-600 group-hover:text-purple-700">
                <span className="text-sm font-Medium">مشاهده همه</span>
                <svg
                  className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform"
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
            </div>
          </div>
        </Link> */}
      </div>

      {/* Smart Actions Hub */}
      <div className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse"></div>
          <h2 className="text-xl font-Bold text-gray-800">دسترسی هوشمند</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-secondary-200 to-transparent"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              href: "profile-user/orders",
              title: "سفارش‌ها",
              icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
              color: "from-blue-500 to-indigo-600",
            },
            {
              href: "profile-user/favorites",
              title: "علاقه‌مندی‌ها",
              icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
              color: "from-red-500 to-pink-600",
            },
            {
              href: "profile-user/addresses",
              title: "آدرس‌ها",
              icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
              color: "from-green-500 to-emerald-600",
            },
            {
              href: "profile-user/tickets",
              title: "پشتیبانی",
              icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
              color: "from-purple-500 to-violet-600",
            },
            {
              href: "profile-user/my-comments",
              title: "نظرات من",
              icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
              color: "from-yellow-500 to-orange-600",
            },
            {
              href: "profile-user/installment",
              title: "اقساط",
              icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
              color: "from-teal-500 to-cyan-600",
            },
          ].map((action, index) => (
            <Link key={index} href={action.href} className="group">
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden">
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-secondary-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={action.icon}
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-Medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {action.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Personalized Discovery */}
      {/* <div className="space-y-6">
        <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-Bold text-gray-800">
                  تاریخچه بازدیدها
                </h2>
                <p className="text-sm text-gray-500">
                  محصولاتی که اخیراً مشاهده کرده‌اید
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="group/link flex items-center gap-2 text-secondary-600 hover:text-secondary-700 transition-colors"
            >
              <span className="text-sm font-Medium">مشاهده همه</span>
              <svg
                className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
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
            </Link>
          </div>
          <VisitedProducts />
        </div>

        <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-Bold text-gray-800">
                  مجموعه‌های شخصی
                </h2>
                <p className="text-sm text-gray-500">
                  لیست‌های ذخیره شده و علاقه‌مندی‌های شما
                </p>
              </div>
            </div>

            <Link
              href="profile-user/my-lists"
              className="group/link flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <span className="text-sm font-Medium">مدیریت لیست‌ها</span>
              <svg
                className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
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
            </Link>
          </div>
          <MyListProducts />
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
