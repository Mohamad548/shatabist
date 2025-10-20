import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اقساط من | شتا۲۰",
  description: "مشاهده و مدیریت خریدهای قسطی شما در پنل کاربری شتا۲۰",
};

const Installment = dynamic(
  () =>
    import(
      "@/components/app/profile-user/components/content/section-installment"
    ),
  { ssr: false } // فقط در کلاینت رندر شود
);

function InstallmentPage() {
  return <Installment />;
}

export default InstallmentPage;
