import { ComponentType, ReactNode } from "react";
import { SwiperOptions, ThumbsEvents } from "swiper/types";
import { ProductType } from "@/components/base/product-card/type";

export interface IProduct<T> {
  DataArray?: T[];
  id?: number;
  name: string;
  brand?: string;
  imageSrc: string[]; // اینجا نوع داده فقط string است.
  productCode?: string;
  description?: string;
  rate?: number;
  colors?: Record<number, string>;
  price?: number;
  discount?: number;
  otherProperties?: {
    numberOfSIM?: string;
    internalMemory?: string;
    memory?: string;
    processor?: string;
    displayType?: string;
    screenSize?: string;
    camera?: string;
    battery?: string;
  };
  registered?: boolean;
  activationCode?: boolean;
  active?: string;
  garanti?: string;
}

export interface IRenderItemProps {
  id?: string;
  name?: string;
  slug?: string;
  discount?: string; // Changed from number to string for compatibility with JSON data
  price?: string | number;
  specialPrice?: number; // Added to display the special price
  classNameCard?: string;
  imageSrc?: string;
  rate?: number;
  description?: string;
  shortDescription?: string; // اضافه شد تا توضیح کوتاه را پشتیبانی کند
  link?: string;
  date?: string;
  cardImageSize?: string;
  showOnlyImage?: boolean;
  panelCart?: boolean;
  orderDetail?: boolean;
  quantity?: number;
  color?: string;
  subColor?: string;
  colorHex?: string; // اضافه شد برای نمایش کد رنگ
  moodCheckoutCart?: boolean;
  moodCheckoutCartNext?: boolean;
  moodInvoice?: boolean;
  withLink?: boolean;
  partner?: boolean;
  installmentAvailibility?: boolean; // اضافه شد برای پشتیبانی از خرید اقساطی
  fastDelivery?: boolean; // اضافه شد برای نمایش ارسال سریع
  freeDelivery?: boolean; // اضافه شد برای نمایش ارسال رایگان
  maximumOrder?: number; // اضافه شد برای محدودیت سفارش مشتریان
  partnerMaximumOrder?: number; // اضافه شد برای محدودیت سفارش همکاران
  partnerMinimumOrder?: number; // اضافه شد برای حداقل سفارش همکاران
  stockName?: string; // اضافه شد برای نمایش نام انبار
  initialPrice?: number | undefined;
  iMeI?: string;
  onDelete?: () => void;
  onAddToCart?: () => void;
  counter?: ReactNode;
  maxOrder?: number;
  minOrder?: number;
  isPending?: boolean;
  isPendingTransaction?: boolean;
  onQuantityChange?: (newQty: number) => void;
  onClick?: () => void;
  colorName?:string;
  variantId?:number
}

export type Breakpoints = {
  [key: number]: {
    slidesPerView?: number;
    spaceBetween?: number;
    slidesPerGroup?: number;
    slidesPerColumn?: number;
    slidesPerColumnFill?: string;
    grid?: { rows: number };
  };
};

type PaginationOptions = SwiperOptions["pagination"];
export type SliderProps<T extends ProductType> = {
  DataArray?: T[];
  classNameBtnNext?: string;
  classNameBtnPrev?: string;
  prevChildren?: ReactNode;
  nextChildren?: ReactNode;
  RenderItem: ComponentType<IRenderItemProps>;
  classTitleSlider?: string;
  titleSlider?: ReactNode;
  classSwiperSlide?: string;
  classCounterSlider?: string;
  breakpoints?: Breakpoints;
  classMainSlider?: string;
  pagination?: PaginationOptions;
  fade?: boolean;
  autoplay?: SwiperOptions["autoplay"];
  classNameFade?: string;
  SkeletonLoader?: ReactNode;
  classNameCard?: string;
  cardImageSize?: string;
  containerSwiper?: string;
  showOnlyImage?: boolean;
  panelCart?: boolean;
  footerComponent?: ReactNode;
  withLink?: boolean;
  thumbs?: boolean;
  classThumbsSwiper?: string;
  breakpointsThumbs?: Breakpoints;
  partner?: boolean;
};
