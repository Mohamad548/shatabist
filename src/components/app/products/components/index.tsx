// import React from "react";
// import BodyProducts from "./body-products";
// import type { ProductType } from "@/components/base/product-card/type";

// export interface ProductListProps {
//   initialProducts?: ProductType[];
//   total: number;
//   limit: number;
//   page?: number;
//   type?: "shop" | "category" | "brand" | "search" | "tag";
//   slug?: string[]
// }

// export default function ProductList({
//   initialProducts = [],
//   total,
//   limit,
//   page = 1,
//   slug = [],


// }: ProductListProps) {
//   return (
//     <div className="flex flex-col gap-4 max-w-full mx-4 md:mx-40 mt-2">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* ✅ فیلتر */}
//         <div className="w-full lg:w-1/4">
//           {/* <Filter /> */}
//         </div>

//         {/* ✅ لیست محصولات */}
//         <div className="w-full lg:w-3/4">
//           <BodyProducts
//             isPending={false}
//             products={initialProducts}
//             total={total}
//             page={page}
//             limit={limit}
//             slug={slug} 
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
