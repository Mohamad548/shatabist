import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سفارش‌های من | شتا۲۰",
  description: "مشاهده و مدیریت سفارش‌های شما در شتا۲۰",
};

const Orders = dynamic(
  () =>
    import("@/components/app/profile-user/components/content/section-orders"),
  { ssr: false } // فقط در کلاینت رندر شود
);

const OrdersPage = () => {
  return <Orders />;
};

export default OrdersPage;
