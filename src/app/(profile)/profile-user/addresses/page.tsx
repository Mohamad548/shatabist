import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "آدرس‌های من | شتا۲۰",
  description: "مدیریت و مشاهده آدرس‌های ثبت‌شده در پنل کاربری شتا۲۰",
};

const Addresses = dynamic(
  () =>
    import(
      "@/components/app/profile-user/components/content/section-addresses"
    ),
  { ssr: false } // فقط در کلاینت رندر شود
);

const AddressesPage = () => {
  return <Addresses />;
};

export default AddressesPage;
