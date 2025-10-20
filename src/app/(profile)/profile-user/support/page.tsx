import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پشتیبانی | شتا۲۰",
  description: "دسترسی به بخش پشتیبانی و ارتباط با تیم پشتیبانی شتا۲۰ در پنل کاربری",
};

const Support = dynamic(
  () =>
    import("@/components/app/profile-user/components/content/section-support"),
  { ssr: false } // فقط در کلاینت رندر شود
);

function SupportPage() {
  return <Support />;
}

export default SupportPage;
