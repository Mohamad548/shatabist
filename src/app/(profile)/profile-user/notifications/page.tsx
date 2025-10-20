import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اعلان‌ها | شتا۲۰",
  description: "مشاهده و مدیریت اعلان‌ها و پیام‌های مرتبط با حساب کاربری شما در شتا۲۰",
};

const Notifications = dynamic(
  () =>
    import(
      "@/components/app/profile-user/components/content/section-notifications"
    ),
  { ssr: false } // فقط در کلاینت رندر شود
);

function NotificationsPage() {
  return <Notifications />;
}

export default NotificationsPage;
