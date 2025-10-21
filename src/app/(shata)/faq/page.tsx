import { FaqTypeProps, getFaqServer } from "@/components/app/profile-user/services";
import FAQClient from "@/components/FAQ/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سوالات متداول | شرکت شتا۲۰",
  description: "سوالات متداول کاربران در استفاده از خدمات و خرید کالا از فروشگاه شتا۲۰",
};

// ISR: HTML اولیه هر 12 ساعت بازسازی می‌شود
export const revalidate = 43200;

export default async function FaqPage() {
  const initialData = await getFaqServer(); // داده اولیه از سرور
  return <FAQClient initialData={initialData} />;
}


