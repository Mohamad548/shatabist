// "use client";

// import React, { useRef } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import clsxm from "@/utils/clsxm";
// import Button from "@/components/base/button/index";
// import CardSliderHome from "./card-slider-home";
// import { SwiperItems } from "@/constants/mock-data/swiper";
// import { useGetSliders } from "@/components/app/profile-user/hooks";

// function SliderHome() {
//   const { data, isLoading } = useGetSliders();
//   const { sliders } = data || {};
//   const swiperRef = useRef<any>(null);

//   // Filter active sliders and sort by indexNumber
//   const activeSliders =
//     sliders
//       ?.filter((slider: any) => slider.active)
//       .sort((a: any, b: any) => a.indexNumber - b.indexNumber) || [];

//   // Show mock data if no sliders or still loading
//   const slidersToShow = activeSliders.length > 0 ? activeSliders : SwiperItems;
//   const isApiData = activeSliders.length > 0;

//   return (
//     <div className={clsxm(" h-48 md:h-96 overflow-hidden")}>
//       <div className={clsxm("relative h-full flex items-center")}>
//         <Button
//           className={clsxm(
//             "px-2 absolute hidden sm:block z-20 lg:left-44 lg:top-60 left-20 top-72"
//           )}
//           onClick={() => swiperRef.current?.slidePrev()}
//         >
//           <Image
//             src="/svg/Polygon.svg"
//             alt="Previous slide"
//             quality={100}
//             width={40}
//             height={40}
//           />
//         </Button>

//         <Swiper
//           modules={[Navigation, Autoplay, Pagination]}
//           loop={true}
//           autoplay={{ delay: 5000 }}
//           speed={2000}
//           onBeforeInit={(swiper) => {
//             swiperRef.current = swiper;
//           }}
//           pagination={{
//             clickable: true,
//             bulletClass: "swiper-pagination-bullet slider-bullet",
//             bulletActiveClass:
//               "swiper-pagination-bullet-active slider-bullet-active",
//             clickableClass:
//               "sm:flex sm:!w-40 sm:!left-12 sm:!bottom-10 lg:!bottom-20 lg:!left-36 justify-center",
//           }}
//           breakpoints={{
//             480: {
//               slidesPerView: 1,
//             },
//           }}
//           className="w-full"
//         >
//           {slidersToShow.map((data: any, index: number) => (
//             <SwiperSlide
//               className={clsxm("flex flex-col items-center h-full")}
//               key={isApiData ? data.id : index}
//             >
//               <CardSliderHome data={data} isApiData={isApiData} />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <Button
//           className={clsxm(
//             "px-2 absolute hidden sm:block z-20 lg:left-52 lg:top-60 sm:left-28 sm:top-72"
//           )}
//           onClick={() => swiperRef.current?.slideNext()}
//         >
//           <Image
//             src="/svg/prev.svg"
//             alt="Next slide"
//             quality={100}
//             width={40}
//             height={40}
//           />
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default SliderHome;
