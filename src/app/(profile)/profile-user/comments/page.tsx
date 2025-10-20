import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "نظرات من | شتا۲۰",
  description: "مشاهده و مدیریت نظرات ثبت‌شده شما در پنل کاربری شتا۲۰",
};

const Comments = dynamic(
  () =>
    import("@/components/app/profile-user/components/content/section-comments"),
  { ssr: false } // فقط در کلاینت رندر شود
);

const CommentsPage = () => {
  return <Comments />;
};

export default CommentsPage;
