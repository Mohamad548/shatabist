import InstallmentPlan from '@/components/app/installment-plan/components';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'خرید اقساطی | شرکت شتا۲۰',
  description:
    'امکان خرید انواع موبایل و تبلت به صورت قسطی از فروشگاه اینترنتی شتا۲۰ با شرایط آسان و ارسال سریع.',
  keywords: [
    'شتا۲۰',
    'خرید قسطی موبایل',
    'خرید قسطی تبلت',
    'فروشگاه اینترنتی',
    'پرداخت اقساطی',
    'ارسال سریع',
  ],
  openGraph: {
    title: 'خرید قسطی | فروشگاه شتا۲۰',
    description:
      'امکان خرید انواع موبایل و تبلت به صورت قسطی از فروشگاه اینترنتی شتا۲۰ با شرایط آسان و ارسال سریع.',
    url: 'https://shata20.ir/installment-plan',
    siteName: 'Shata20',
    locale: 'fa_IR',
    type: 'website',

  },
};
// function InstallmentPlanPage() {
//   return <InstallmentPlan />;
// }

// export default InstallmentPlanPage;


function InstallmentPlanPage() {
  return  <div>صفحه  دلخواه</div>;
}

export default InstallmentPlanPage;
