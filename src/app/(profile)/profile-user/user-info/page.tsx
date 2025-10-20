import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اطلاعات کاربری | شتا۲۰",
  description: "مشاهده و مدیریت اطلاعات شخصی و پروفایل شما در پنل کاربری شتا۲۰",
};

const UserInfo = dynamic(
  () =>
    import(
      "@/components/app/profile-user/components/content/section-user-info"
    ),
  { ssr: false } // فقط در کلاینت رندر شود
);

const UserInfoPage = () => {
  return <UserInfo />;
};

export default UserInfoPage;
