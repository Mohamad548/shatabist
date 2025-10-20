import ManageModal from '@/components/base/modal';
import { ProductCard } from '@/components/base/product-card';
import { ProductType } from '@/components/base/product-card/type';
import Slider from '@/components/base/slider';
import { BASE_URL } from '@/constants/url';
import { useColorStore } from '@/stores/colorStore';
import { getThumbnailImageUrl } from '@/utils/get-thumbnail-image-url';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import Gallery from './gallery';
import ToolsBar from './gallery/tool-bar';
import ProductImageSlider from '../../product-imageslider';
export type productImageType = {
  id: number;
  productId: number;
  url: string;
  thumbnail: boolean;
};

const ProductImage = ({ product }: { product?: ProductType }) => {
  const { selectedImage } = useColorStore();

  const imageUrl = getThumbnailImageUrl(product?.productImages);
  return (
    <div className="relative flex flex-col md:flex-row gap-2 rounded-2xl md:max-w-1/3 md:w-1/3 ">
      <ToolsBar
        iframe={typeof product?.iframe === 'string' ? product?.iframe : null}
        productId={product?.id}
      />

      <ManageModal
        triggerContent={
          <div className="flex flex-col gap-3">
            <div className="hidden md:flex relative cursor-pointer bg-gray-100  md:h-[300px] w-full  rounded-lg  2xl:h-[400px]">
              <Image
                src={
                  selectedImage
                    ? `${BASE_URL}${selectedImage}`
                    : imageUrl || '/images/Products/default-product.webp'
                } // تصویر انتخابی را می‌گذاریم
                       fill
    style={{ objectFit: "contain" }}
                alt="Product Image"
                quality={100}
              />
            </div>
            <div className="block md:hidden bg-gray-100 rounded-md">
              <ProductImageSlider images={product?.productImages || []} />
            </div>
            <ul className="hidden md:flex gap-3 cursor-pointer">
              {product?.productImages?.slice(0, 4)?.map((image) => (
                <li
                  key={image.id}
                  className="relative h-14 w-14 rounded-xl overflow-hidden bg-gray-100"
                >
                  <Image
                    src={image?.url ? `${BASE_URL}${image.url}` : imageUrl}
                                fill
    style={{ objectFit: "contain" }}
                    alt={`${image.id}`}
                    quality={100}
                  />
                </li>
              ))}

              {(product?.productImages?.length ?? 0) > 4 && (
                <li className="relative h-16 w-16 rounded-xl overflow-hidden blur-sm opacity-80">
                  <Image
                    src={imageUrl}
                               fill
    style={{ objectFit: "contain" }}
                    alt="more-images"
                    quality={100}
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7">
                    <Image
                      src="/svg/more-square.svg"
                                 fill
    style={{ objectFit: "contain" }}
                      alt="More"
                      quality={100}
                    />
                  </div>
                </li>
              )}
            </ul>
          </div>
        }
        classNameModale="w-full"
        className="fixed inset-0 z-50 w-full"
        cancelLabel={
          <div className="">
            <Image
              src="/svg/profile/close-circle.svg"
              alt="close-modal"
              width={20}
              height={20}
            />
          </div>
        }
        cancelBoxClass="absolute left-5 top-7"
        fadeIn="animate-openCircle"
        fadeOut="animate-closeCircle"
        modalBodyClass="h-screen w-full block relative p-0"
      >
        {/* اسلایدر اصلی */}
        <Gallery product={product} />
      </ManageModal>
    </div>
  );
};

export default ProductImage;
