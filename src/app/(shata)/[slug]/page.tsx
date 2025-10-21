// // app/[slug]/page.tsx
// import PageContent from "@/components/app/page";
// import { getPageBySlugApi } from "@/components/app/page/services";
// import { notFound } from "next/navigation";


// interface PageProps {
//   params: { slug: string };
// }

// export default async function Page({ params }: PageProps) {
//   // هر بار که کاربر صفحه را باز می‌کند، این API اجرا می‌شود
//   const data = await getPageBySlugApi(params.slug);

//   if (!data?.page) return notFound();

//   return <PageContent initialData={data} slug={params.slug} />;
// }



import React from 'react';


function Page() {
  return  <div>صفحه  دلخواه</div>;
}

export default Page;


