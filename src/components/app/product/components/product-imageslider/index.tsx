import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ProductImage } from '@/components/base/product-card/type';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { BASE_URL } from '@/constants/url';
import { getThumbnailImageUrl } from '@/utils/get-thumbnail-image-url';

const ProductImageSlider = ({ images }: { images: ProductImage[] }) => {
  const imageUrl = getThumbnailImageUrl(images);
  if (!images || images.length === 0) {
    return (
      <div className="relative w-96 h-96">
        <Image
          src="/images/Products/default-product.webp"
          alt={`  عکسی ثبت نشده`}
          fill
          style={{ objectFit: 'contain' }}
          quality={100}
        />
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      className="w-full h-auto rounded-md"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-96 h-96">
            <Image
              src={img?.url ? `${BASE_URL}${img.url}` : imageUrl}
              alt={`${img.id}`}
              fill
              style={{ objectFit: 'contain' }}
              quality={100}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductImageSlider;
