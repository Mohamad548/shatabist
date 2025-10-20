// // src/app/shop/brand/[slug]/page.tsx
// import type { Metadata } from "next";
// import ProductList from "@/components/app/products/components";
// import { getBrandProductsApi } from "@/components/app/search-box/services";

// export const dynamic = "force-dynamic"; // SSR

// interface BrandPageProps {
//   params: { slug: string };
//   searchParams: { page?: string; limit?: string };
// }

// export default async function BrandPage({ params, searchParams }: BrandPageProps) {
//   const brandSlug = params.slug;
//   const page = parseInt(searchParams.page || "1");
//   const limit = parseInt(searchParams.limit || "16");
//   const offset = (page - 1) * limit;

//   // fetch محصولات برند و نام برند
//   const { products, pagination, brandTitle } = await getBrandProductsApi(brandSlug, offset, limit);

//   return (
//     <ProductList
//       initialProducts={products}
//       total={pagination?.total || 0} // total واقعی
//       page={page}
//       limit={limit}
//       type="brand"
//       slug={[brandSlug]} // برای Pagination
//     />
//   );
// }

// // ✅ متادیتای داینامیک برند
// export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
//   const brandSlug = params.slug;

//   // fetch برند فقط برای گرفتن نام برند
//   const { brandTitle } = await getBrandProductsApi(brandSlug, 0, 1);

//   return {
//     title: `محصولات برند ${brandTitle || brandSlug} | شتا۲۰`,
//     description: `مشاهده محصولات برند "${brandTitle || brandSlug}" در فروشگاه اینترنتی شتا۲۰. خرید آسان و ارسال سریع.`,
//     openGraph: {
//       title: `برند ${brandTitle || brandSlug} | شتا۲۰`,
//       description: `محصولات برند "${brandTitle || brandSlug}" در فروشگاه شتا۲۰.`,
//       type: "website",
//       locale: "fa_IR",
//       url: `https://shata20.ir/shop/brand/${brandSlug}`,
//     },
//     alternates: {
//       canonical: `https://shata20.ir/shop/brand/${brandSlug}`,
//     },
//   };
// }
