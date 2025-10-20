'use client';
import Button from '@/components/base/button/index';
import { ProductType } from '@/components/base/product-card/type';
import { useUserStore } from '@/stores/useUserStore';
import clsxm from '@/utils/clsxm';
import { getThumbnailImageUrl } from '@/utils/get-thumbnail-image-url';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Thumbnails from './thumbnails';
import { SliderProps } from './type-slider';
import { BASE_URL } from '@/constants/url';
import { useColorStore } from '@/stores/colorStore';
import { calculateFinalPrice } from '@/utils/priceUtils';
import { calculateAverageRate } from '@/utils/calculate-average-rate';

const Slider = <T extends ProductType>({
  DataArray = [],
  classNameBtnNext,
  classNameBtnPrev,
  prevChildren,
  nextChildren,
  RenderItem,
  classTitleSlider,
  titleSlider,
  classSwiperSlide,
  classCounterSlider,
  breakpoints,
  classMainSlider,
  pagination,
  fade,
  autoplay,
  classNameFade,
  SkeletonLoader,
  classNameCard,
  cardImageSize,
  containerSwiper,
  showOnlyImage,
  panelCart,
  withLink = false,
  footerComponent,
  thumbs = false,
  breakpointsThumbs,
  classThumbsSwiper = 'w-12 h-12',
  partner,
}: SliderProps<T>) => {
  const swiperRef = useRef<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null); // مدیریت Swiper بندانگشتی‌ها
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (DataArray.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [DataArray]);

  
  const renderSwiperSlides = (data: T, cardImageSize: string) => {
    const variant = data?.productVariants?.[0];

    const { finalPrice, discountText, initialPrice } = calculateFinalPrice(
      data?.productVariants ?? [],
      !!partner
    );
    const imageUrl = getThumbnailImageUrl(data?.productImages);

    return (
      <RenderItem
        initialPrice={initialPrice}
        slug={data?.slug}
        price={finalPrice}
        discount={discountText}
        key={data?.id}
        name={data?.title}
        classNameCard={classNameCard}
        cardImageSize={cardImageSize}
        imageSrc={
          imageUrl
            ? imageUrl
            : data?.url
              ? `${BASE_URL}${data.url}`
              : '/images/Products/default-product.webp'
        }
rate={calculateAverageRate(data?.comments)} // <-- اینجا استفاده می‌شود
        description={data?.short_description}
        showOnlyImage={showOnlyImage}
        panelCart={panelCart}
        withLink={withLink}
        partner={partner}
      />
    );
  };

  if (isLoading) {
    return SkeletonLoader;
  }

  return (
    <div className={clsxm('', classMainSlider)}>
      {titleSlider && (
        <div className={clsxm(' ', classTitleSlider)}>{titleSlider}</div>
      )}

      <div className={clsxm('', classCounterSlider)}>
        <Button
          className={clsxm('px-2', classNameBtnPrev)}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          {prevChildren}
        </Button>

        <Swiper
          key={`${DataArray.length}-${JSON.stringify(breakpoints)}`}
          modules={[Navigation, Autoplay, Pagination, Thumbs]}
          loop={true}
          autoplay={autoplay}
          speed={2000}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={pagination}
          thumbs={{ swiper: thumbsSwiper }}
          breakpoints={breakpoints}
          className={clsxm('rounded-r-md border-gray-200', containerSwiper)}
        >
          {DataArray.map((data) => (
            <SwiperSlide
              key={data.id}
              className={clsxm('flex flex-col items-center', classSwiperSlide)}
            >
              {renderSwiperSlides(data, cardImageSize as string)}
            </SwiperSlide>
          ))}
          {fade && <div className={classNameFade}></div>}
        </Swiper>

        <Button
          className={clsxm('px-2', classNameBtnNext)}
          onClick={() => swiperRef.current?.slideNext()}
        >
          {nextChildren}
        </Button>
      </div>

      {thumbs && (
        <div className="w-1/3 border py-2 rounded-lg shadow-primary mx-auto">
          <Thumbnails
            DataArray={DataArray}
            breakpointsThumbs={breakpointsThumbs}
            classThumbsSwiper={classThumbsSwiper}
          />
        </div>
      )}

      {footerComponent && <div>{footerComponent}</div>}
    </div>
  );
};

export default Slider;
