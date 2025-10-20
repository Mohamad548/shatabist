import HomeComponent from '@/components/app/home/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "شرکت شتا۲۰ | واردکننده رسمی و تخصصی موبایل، تبلت و لوازم دیجیتال",
  description:
    "شرکت شاهین تجارت اطمینان همراه با برند شتا۲۰، بیش از ده سال تجربه در فروش و واردات موبایل، تبلت و لوازم دیجیتال. ارسال سریع، تضمین کیفیت و بهترین قیمت.",
  keywords: [
    'شتا۲۰',
    'فروشگاه اینترنتی',
    'خرید آنلاین موبایل',
    'تبلت',
    'قسطی فروشی',
    'ارسال سریع',
    'محصولات باکیفیت',
  ],
  authors: [{ name: "شرکت شتا۲۰", url: "https://shata20.ir" }],
  openGraph: {
    title: "فروشگاه اینترنتی شتا۲۰",
    description:
      "شرکت شاهین تجارت اطمینان همراه با برند شتا۲۰، با بیش از ده سال سابقه در فروش و واردات موبایل، تبلت و لوازم دیجیتال. ارسال سریع و تضمین کیفیت.",
    url: "https://shata20.ir",
    siteName: "Shata20",
    locale: "fa_IR",
    type: "website",
  
  },
};

export default function Home() {
  return <HomeComponent />;
}
