import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import clsxm from '@/utils/clsxm';
import UserFeedback from '../../components/user-feedback';
import { ProductType } from '@/components/base/product-card/type';
import { BASE_URL } from '@/constants/url';
import { useGetProductComments } from '@/components/app/product/hooks';
export default function Gallery({ product }: { product?: ProductType }) {
  const {
    data: commentsData,
    isLoading,
    error,
  } = useGetProductComments(product?.id ?? 0);

  const comments = commentsData?.data?.comments ?? [];

  const swiperRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<string>('Official');
  const [slideActive, setSlideActive] = useState<number>(0);
  const [currentComment, setCurrentComment] = useState<any>(null);

  const [opacity, setOpacity] = useState<boolean>(false);
  const totalProductImages = product?.productImages?.length ?? 0;
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const updateComment = (index: number) => {
    let slideIndex = 0;
    for (const comment of comments ?? []) {
      slideIndex += comment?.commment_images?.length;
      if (index < slideIndex) {
        setCurrentComment(comment);
        break;
      }
    }
  };
  const handleOfficial = () => {
    setOpacity(false);
    setActiveTab('Official');
    setSlideActive(0);
    swiperRef.current?.swiper.slideToLoop(0); // Slide index starts from 0
    setCurrentComment(null); // برای رسمی نیازی به کامنت نیست
  };

  const handleUsers = () => {
    setOpacity(false);
    setActiveTab('Users');
    swiperRef.current?.swiper.slideToLoop(totalProductImages); // Slide index starts from 0
    updateComment(0); // نمایش اولین کامنت کاربران
  };

  const handleSlideChange = (swiper: any) => {
    setOpacity(false);
    setSlideActive(swiper.realIndex);
    if (swiper.realIndex < totalProductImages) {
      setActiveTab('Official');
      setCurrentComment(null); // برای رسمی نیازی به کامنت نیست
    } else {
      setActiveTab('Users');
      updateComment(swiper.realIndex - totalProductImages);
    }
  };

  ////////////

  return (
    <div
      className={clsxm(
        'relative  h-screen flex flex-col items-stretch  justify-around md:justify-start'
      )}
    >
      {/* تب های فعال */}
      <div
        className={clsxm(
          '  absolute top-0 md:static right-1/2 translate-x-1/2   md:translate-x-0 transition-all duration-500 flex justify-center select-none'
        )}
      >
        <div className="flex justify-center gap-5 border px-6 py-2 rounded-md border-gray-400 mt-5 ">
          <button
            className={clsxm(
              'px-4 py-1 text-sm rounded-md',
              activeTab === 'Official'
                ? 'bg-emerald-100/50 text-emerald-500'
                : 'bg-gray-100'
            )}
            onClick={handleOfficial}
          >
            رسمی
          </button>
          {(comments ?? []).length > 0 && (
            <button
              className={clsxm(
                'px-4 py-1 text-sm rounded-md',
                activeTab === 'Users'
                  ? 'bg-emerald-100/50 text-emerald-500'
                  : 'bg-gray-100'
              )}
              onClick={handleUsers}
            >
              کاربران
            </button>
          )}
        </div>
      </div>

      {/* اسلایدر اصلی */}
      <div className="flex mt-5  ">
        <div
          className={clsxm(
            'w-full flex items-center h-full gap-3 relative max-w-screen-xl mx-auto'
          )}
        >
          {/*  دکمه کاستوم شده قبلی  */}
          <button
            className={clsxm(
              'relative w-9 h-9 border-2 border-gray-600 bg-gray-200 text-white p-2 rounded-full shadow-primary hover:bg-gray-300',
              slideActive === 0 ? 'hidden' : ' hidden md:block'
            )}
            onClick={() => swiperRef.current?.swiper.slidePrev()} // حرکت به اسلاید قبلی
          >
            <Image
              src="/svg/Vectorslide.svg"
              alt=""
                     fill
    style={{ objectFit: "contain" }}
              quality={100}
              className="p-1.5 rotate-180 select-none"
            />
          </button>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Thumbs]}
            onSlideChange={handleSlideChange} // اضافه کردن این رویداد
            thumbs={{ swiper: thumbsSwiper }} // همگام‌سازی با Thumbs
            className="w-[500px] "
          >
            {(product?.productImages ?? []).map((slide) => (
              <SwiperSlide
                key={slide.id}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setOpacity((prev) => !prev);
                  }
                }}
              >
                <div key={slide.id} className="  relative w-full h-[500px]">
                  <Image
                    src={`${BASE_URL}${slide.url}`}
                    alt={`${slide.id}`}
                            fill
    style={{ objectFit: "contain" }}
                    quality={100}
                  />
                </div>
              </SwiperSlide>
            ))}
            {comments?.map(
              (comment: {
                id: React.Key | null | undefined;
                commment_images: any[];
              }) => (
                <div key={comment.id}>
                  {comment?.commment_images &&
                    comment?.commment_images.length > 0 &&
                    comment?.commment_images.map((slide) => (
                      <SwiperSlide
                        key={slide.id}
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            setOpacity((prev) => !prev);
                          }
                        }}
                      >
                        <div className="flex">
                          <div className="relative w-[500px] h-[500px]">
                            <Image
                              src={`${BASE_URL}${slide.imageUrl}`}
                              alt={`Image ${slide.id}`}
                              width={500} // تنظیم عرض
                              height={500} // تنظیم ارتفاع
                              style={{ objectFit: 'contain' }} // استفاده از style برای objectFit
                              quality={100}
                              className="select-none"
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </div>
              )
            )}
          </Swiper>

          {/* نمایش کامنت فعال */}
          {currentComment && (
            <UserFeedback
              opacity={opacity}
              userName={`${currentComment.user.profile.first_name} ${currentComment.user.profile.last_name}`}
              date={new Date(currentComment.createdAt).toLocaleDateString()} // تبدیل تاریخ به فرمت قابل خواندن
              description={currentComment.content} // استفاده از محتوا برای توضیحات
              commentTitle={currentComment.title} // عنوان کامنت هم محتوا است
              rating={currentComment.rate} // نمره کامنت
              likes={currentComment?.likeCount} // اگر داده‌ای برای لایک‌ها دارید، به آن اضافه کنید
              dislikes={currentComment?.dislikeCount}
              commentId={currentComment?.id}
              productId={currentComment?.productId}
              // اگر داده‌ای برای دیسلایک‌ها دارید، به آن اضافه کنید
            />
          )}
          {/* دکمه کاستوم شده بعدی */}
          <button
            className={clsxm(
              ' absolute z-10 left-0 w-9 h-9 border-2  border-gray-600 bg-gray-200 text-white p-2 rounded-full shadow-primary ',
              swiperRef.current?.swiper.realIndex ===
                swiperRef.current?.swiper.slides.length - 1
                ? 'hidden'
                : ' hidden  md:block'
            )}
            onClick={() => swiperRef.current?.swiper.slideNext()} // حرکت به اسلاید بعدی
          >
            <Image
              src="/svg/Vectorslide.svg"
              alt=""
                         fill
    style={{ objectFit: "contain" }}
              quality={100}
              className="p-1.5"
            />
          </button>
        </div>
      </div>

      {/* ThumbsSwiper */}
      <div
        className={clsxm(
          ' md:static absolute z-10 w-full  items-center mr-10 bottom-10 md:max-w-screen-md max-w-prose py-2 mx-auto mt-2 rounded-md bg-gray-200 transition-all duration-500',
          opacity
            ? ' opacity-0 pointer-events-none md:opacity-100'
            : 'md:opacity-100 '
        )}
      >
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={8}
          spaceBetween={5}
          watchSlidesProgress={true}
          modules={[Thumbs]}
        >
          {(product?.productImages ?? [])?.map((slide) => (
            <SwiperSlide key={slide.id} className="mr-4">
              <div className="relative w-20 h-20  cursor-pointer">
                <Image
                  src={`${BASE_URL}${slide?.url}`}
                  alt={`${slide.id}`}
                              fill
    style={{ objectFit: "contain" }}
                  quality={100}
                />
              </div>
            </SwiperSlide>
          ))}
          {(comments ?? []).map(
            (comment: {
              id: React.Key | null | undefined;
              commment_images: any[];
            }) => (
              <div key={comment.id}>
                {comment?.commment_images?.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative w-20 h-20 cursor-pointer">
                      <Image
                        src={`${BASE_URL}${slide.imageUrl}`}
                        alt={`Thumbnail ${slide.id}`}
                                  fill
    style={{ objectFit: "contain" }}
                        quality={100}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
}
