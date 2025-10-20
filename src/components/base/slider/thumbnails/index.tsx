import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import clsxm from "@/utils/clsxm";
import { slides } from "@/components/app/product/components/product-detail/product-image/gallery/data";
import UserFeedback from "@/components/app/product/components/product-detail/components/user-feedback";
import { Breakpoints } from "../type-slider";
import { ProductType } from "@/components/base/product-card/type";

interface Slide {
  id: number;
  category: {
    name: string;
    title: string;
  };
  imageSrc: string[];
  name: string;
  userFeedback?: {
    userName: string;
    commentTitle: string;
    description: string;
    likes: number;
    dislikes: number;
    commentDate: string;
  };
}

interface ThumbnailsProps<T extends ProductType> {
  DataArray: T[];
  breakpointsThumbs?: Breakpoints;
  classThumbsSwiper: string;
}

export default function Thumbnails<T extends ProductType>({
  DataArray,
  breakpointsThumbs,
  classThumbsSwiper,
}: ThumbnailsProps<T>) {
  const swiperRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<string>("Official");
  const [currentComment, setCurrentComment] = useState<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const officialSlides = slides.filter(
    (slide) => slide.category.name === "Official",
  );
  const totalProductImages = officialSlides.length;

  const updateComment = (index: number) => {
    const userSlides = slides.filter(
      (slide) => slide.category.name === "Users",
    );
    if (index < userSlides.length) {
      setCurrentComment(userSlides[index].userFeedback);
    }
  };

  const handleOfficial = () => {
    setActiveTab("Official");
    swiperRef.current?.swiper.slideToLoop(0);
    setCurrentComment(null);
  };

  const handleUsers = () => {
    setActiveTab("Users");
    swiperRef.current?.swiper.slideToLoop(totalProductImages);
    updateComment(0);
  };

  const handleSlideChange = (swiper: any) => {
    if (swiper.realIndex < totalProductImages) {
      setActiveTab("Official");
      setCurrentComment(null);
    } else {
      setActiveTab("Users");
      updateComment(swiper.realIndex - totalProductImages);
    }
  };

  return (
    <>
      <div className="tabs flex gap-5">
        <button
          className={clsxm(
            "px-4 py-2 rounded-md",
            activeTab === "Official"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black",
          )}
          onClick={handleOfficial}
        >
          رسمی
        </button>
        <button
          className={clsxm(
            "px-4 py-2 rounded-md",
            activeTab === "Users"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black",
          )}
          onClick={handleUsers}
        >
          کاربران
        </button>
      </div>
      <div className="flex flex-col">
        <Swiper
          ref={swiperRef}
          navigation={true}
          loop={true}
          modules={[Navigation, Thumbs]}
          onSlideChange={handleSlideChange}
          thumbs={{ swiper: thumbsSwiper }}
          className="mainSwiper"
        >
          {slides.map((slide: Slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-40 h-40">
                <Image
                  src={slide.imageSrc[0]}
                  alt={slide.name}
                          fill
    style={{ objectFit: "contain" }}
                  quality={100}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={5}
          spaceBetween={10}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="thumbSwiper mt-4 absolute top-0"
        >
          {slides.map((slide: Slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-20 h-20 cursor-pointer">
                <Image
                  src={slide.imageSrc[0]}
                  alt={slide.name}
                           fill
    style={{ objectFit: "contain" }}
                  quality={100}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {currentComment && (
          <div className="mt-4 p-4 absolute top-0 left-0 bg-white border">
            <UserFeedback
              userName={currentComment.userName}
              date={currentComment.commentDate}
              description={currentComment.description}
              commentTitle={currentComment.commentTitle}
              rating={4}
              likes={currentComment.likes}
              dislikes={currentComment.dislikes}
            />
          </div>
        )}
      </div>
    </>
  );
}
