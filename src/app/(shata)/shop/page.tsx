// import ProductList from "@/components/app/products/components";
// import { getProductsServer } from "@/components/layout/components/header/services";
// import type { Metadata } from "next";

// export const dynamic = "force-dynamic";

// export const metadata: Metadata = {
//   title: "فروشگاه اینترنتی موبایل و لوازم جانبی | شرکت شتا۲۰",
//   description:
//     "خرید انواع گوشی موبایل و تبلت به صورت نقد و قسطی از فروشگاه اینترنتی شتا۲۰. ارسال سریع، تضمین قیمت و کیفیت.",
// };

// interface ShopPageProps {
//   searchParams: {
//     page?: string;
//     limit?: string;
//   };
// }

// export default async function ShopPage({ searchParams }: ShopPageProps) {
//   const page = parseInt(searchParams.page || "1");
//   const limit = parseInt(searchParams.limit || "16");
//   const offset = (page - 1) * limit;

//   const productShop = await getProductsServer(offset, limit);

//   return (
//     <ProductList
//       initialProducts={productShop.products || []}
//       total={productShop.total || 0}
//       limit={limit}
//       type="shop"
//       page={page}
//       slug={[]}
//     />
//   );
// }
