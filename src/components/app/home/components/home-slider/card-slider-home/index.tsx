// "use client";
// import { BASE_URL } from "@/constants/url";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// type MockData = {
//   src: string;
//   description: string;
//   link: string;
//   btnText: string;
// };

// type ApiData = {
//   id: number;
//   url: string;
//   title: string;
//   description: string | null;
//   active: boolean;
//   indexNumber: number;
//   color: string;
//   link: string | null;
// };

// type ProductItemProps = {
//   data: MockData | ApiData;
//   isApiData: boolean;
// };

// const CardSliderHome: React.FC<ProductItemProps> = ({ data, isApiData }) => {
//   const imageUrl = isApiData ? (data as ApiData).url : (data as MockData).src;
//   const sliderLink = isApiData ? (data as ApiData).link : (data as MockData).link;
//   const backgroundColor = isApiData ? (data as ApiData).color : undefined;

//   return (
//     <div
//       className="relative h-[150px] md:h-[400px]"
//       style={backgroundColor ? { backgroundColor } : undefined}
//     >
//       <Image
//         src={`${BASE_URL}${imageUrl}`}
//         alt={isApiData ? (data as ApiData).title : (data as MockData).description}
//         fill
//         style={{ objectFit: "cover" }}
//         quality={100}
//         unoptimized={true} // برای تصاویر خارجی
//         onError={(e) => {
//           (e.currentTarget as any).src = "/images/default-slider.jpg"; // fallback تصویر پیشفرض
//         }}
//       />

//       {sliderLink && (
//         <Link href={sliderLink}>
//           <button className="text-xl text-white bg-[#FFFFFF33] p-2 rounded-full absolute bottom-4 right-4">
//             {isApiData ? "مشاهده" : (data as MockData).btnText}
//           </button>
//         </Link>
//       )}
//     </div>
//   );
// };

// export default CardSliderHome;
