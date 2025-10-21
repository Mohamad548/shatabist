// // app/(site)/terms/page.tsx
// import { getTermsServer } from '@/components/app/profile-user/services';
// import Terms from '@/components/terms';
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'قوانین و مقررات | شرکت شتا۲۰',
//   description:
//     'شرایط و قوانین استفاده از خدمات و خرید کالا از فروشگاه اینترنتی شتا۲۰. لطفاً پیش از خرید، این موارد را به دقت مطالعه فرمایید.',
// };

// export default async function TermsPage() {
//   const terms = await getTermsServer();
//   return <Terms initialTerms={terms} />;
// }



import React from 'react';


function TermsPage() {
  return  <div> قوانین</div>;
}

export default TermsPage;
