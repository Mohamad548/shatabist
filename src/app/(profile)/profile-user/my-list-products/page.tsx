import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لیست‌های من | شتا۲۰",
  description: "مشاهده و مدیریت لیست‌های محصولات مورد علاقه شما در پنل کاربری شتا۲۰",
};

const MyList = dynamic(
  () =>
    import("@/components/app/profile-user/components/content/section-my-lists"),
  { ssr: false } // فقط در کلاینت رندر شود
);

const MyListProductsPage = () => {
  return <MyList />;
};

export default MyListProductsPage;
