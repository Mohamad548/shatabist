// // Product.jsx
// "use client";
// import BodyProducts from "@/components/app/products/components/body-products/index";
// import Filter from "@/components/app/products/components/filter/index";
// import { ProductType } from "@/components/base/product-card/type";
// import {
//   useCategoriesBuySlug,
//   useProductsBySlug,
// } from "@/components/layout/components/header/hooks";
// import { PageLevelLocalization } from "@/constants/localization";
// import { useState } from "react";
// import { useSearchResults } from "../../search-box/hooks";
// import ItemsSliderProducts from "./slider-products";
// import Link from "next/link";
// import Image from "next/image";

// const { products: productsLocalization } = PageLevelLocalization;

// export interface ProductListProps {
//   categoryPath?: string[] | string; // مسیر دسته‌بندی (اختیاری)
// }

// function ProductList({ categoryPath = [] }: ProductListProps) {
//   let finalSlug: string = "";
//   let requestHook: any = null;
//   const [selectedFilters, setSelectedFilters] = useState<{
//     [propertyId: number]: string[];
//   }>({});

//   if (categoryPath.length === 0) {
//     finalSlug = "all";
//     requestHook = useProductsBySlug;
//   } else if (typeof categoryPath === "string" && categoryPath) {
//     finalSlug = categoryPath;
//     requestHook = useSearchResults;
//   } else if (
//     Array.isArray(categoryPath) &&
//     categoryPath.every((item) => typeof item === "string")
//   ) {
//     finalSlug = categoryPath[categoryPath.length - 1]; // فقط آخرین بخش مسیر دسته‌بندی
//     requestHook = useCategoriesBuySlug;
//   }

//   const { data, isPending } = requestHook(finalSlug);
//   let products: ProductType[] | undefined;
//   let totalProductsCount = 0;

//   if (requestHook === useSearchResults && data?.products?.length > 0) {
//     products = data?.products;
//     totalProductsCount = data?.pagination?.total  data?.products?.length  0;
//   } else if (
//     requestHook === useCategoriesBuySlug &&
//     data?.products?.length > 0
//   ) {
//     products = data?.products;
//     totalProductsCount = data?.pagination?.total  data?.products?.length  0;
//   } else if (requestHook === useProductsBySlug && data?.products?.length > 0) {
//     products = data?.products;
//     totalProductsCount = data?.pagination?.total  data?.products?.length  0;
//   }

//   const handleFilterChange = (
//     propertyId: number,
//     value: string,
//     checked: boolean
//   ) => {
//     setSelectedFilters((prev) => {
//       const prevValues = prev[propertyId] || [];
//       return {
//         ...prev,
//         [propertyId]: checked
//           ? [...prevValues, value]
//           : prevValues.filter((v) => v !== value),
//       };
//     });
//   };

//   const filteredProducts =
//     products?.filter((product) =>
//       Object.entries(selectedFilters).every(([propertyId, values]) => {
//         if (!values.length) return true;
//         // Special case: 'نمایش کالاهای موجود' (id: 1)
//         if (Number(propertyId) === 1 && values.length > 0) {
//           return product.productVariants?.some(
//             (variant) => variant.quantity > 0
//           );
//         }
//         return product.productProperties?.some(
//           (prop) =>
//             prop.property_value?.propertyId === Number(propertyId) &&
//             values.includes(prop.property_value?.description)
//         );
//       })
//     ) ?? [];

//   // چک کردن آیا فیلترهایی اعمال شده‌اند یا خیر
//   const hasActiveFilters = Object.values(selectedFilters).some(
//     (values) => values.length > 0
//   );

//   // اگر فیلتری اعمال شده، از تعداد محصولات فیلتر شده استفاده کن
//   // در غیر این صورت از تعداد کل محصولات API استفاده کن
//   const finalProductsCount = hasActiveFilters
//     ? filteredProducts.length
//     : totalProductsCount;