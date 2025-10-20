// "use client";
// import { IRenderItemProps } from "@/components/base/slider/type-slider";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const CartCategory = ({
//   imageSrc = "",
//   description,
//   link,
// }: IRenderItemProps) => (
//   <Link
//     href={link || "/"}
//     className="flex flex-col justify-center items-center py-16"
//   >
//     <div className="relative h-full">
//       {imageSrc ? (
//         <Image
//           src={imageSrc}
//           width={200}
//           height={200}
//           alt="cover"
//           quality={100}
//         />
//       ) : (
//         <div className="w-200 h-200 bg-gray-200 flex items-center justify-center">
//           <span>No Image</span>
//         </div>
//       )}
//     </div>
//     <h3 className="pt-4 font-semibold text-base text-gray-800">
//       {description}
//     </h3>
//   </Link>
// );

// export default CartCategory;
