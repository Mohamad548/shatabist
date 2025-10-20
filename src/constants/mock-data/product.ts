import { ProductType } from "@/components/base/product-card/type";

// export const products: ProductType[] = [
//   {
//     id: 1,
//     title: "گوشی موبایل اپل مدل iPhone 13 Pro CH دو سیم‌ کارت ظرفیت 512 گیگابایت و 6 گیگابایت رم - نات اکتیو",
//     brand: {
//       id: 1,
//       title: "اپل",
//       logo: "/images/brands/apple.png",
//       slug: "apple"
//     },
//     imageSrc: "/images/product/Rectangle 9.png",
//     productCode: "DKP-OOSAAP",
//     description: "",
//     rate: 4,
//     colors: {
//       1: "#F79009FF",
//       2: "#B54708FF",
//       3: "#FEF0C7FF",
//     },
//     price: 65850000,
//     discount: 10,
//     otherProperties: {
//       numberOfSIM: "دو سیم کارت",
//       internalMemory: "128 گیگابایت",
//       memory: "4 گیگابایت",
//       processor: "Apple A15 Bionic",
//       displayType: "Super Retina XDR OLED",
//       screenSize: "6.1 اینچ",
//       camera: "دوگانه ۱۲ مگاپیکسل",
//       battery: "3٬240 میلی‌آمپر بر ساعت",
//     },
//     registered: true,
//     activationCode: true,
//     active: "NOT ACTIVE",
//     garanti: "18 ماه گارانتی شرکتی",
//   },
//   {
//     id: 2,
//     title: "گوشی موبایل اپل مدل iPhone 13 Pro CH دو سیم‌ کارت ظرفیت 512 گیگابایت و 6 گیگابایت رم - نات اکتیو",
//     brand: {
//       id: 1,
//       title: "اپل",
//       logo: "/images/brands/apple.png",
//       slug: "apple"
//     },
//     imageSrc: "/images/product/Rectangle 9.png",
//     productCode: "DKP-OOSAAP",
//     description: "",
//     rate: 4,
//     colors: {
//       1: "#F79009FF",
//       2: "#B54708FF",
//       3: "#FEF0C7FF",
//     },
//     price: 65850000,
//     discount: 10,
//     otherProperties: {
//       numberOfSIM: "دو سیم کارت",
//       internalMemory: "128 گیگابایت",
//       memory: "4 گیگابایت",
//       processor: "Apple A15 Bionic",
//       displayType: "Super Retina XDR OLED",
//       screenSize: "6.1 اینچ",
//       camera: "دوگانه ۱۲ مگاپیکسل",
//       battery: "3٬240 میلی‌آمپر بر ساعت",
//     },
//     registered: true,
//     activationCode: true,
//     active: "NOT ACTIVE",
//     garanti: "18 ماه گارانتی شرکتی",
//   },
//   {
//     id: 3,
//     title: "گوشی موبایل اپل مدل iPhone 13 Pro CH دو سیم‌ کارت ظرفیت 512 گیگابایت و 6 گیگابایت رم - نات اکتیو",
//     brand: {
//       id: 1,
//       title: "اپل",
//       logo: "/images/brands/apple.png",
//       slug: "apple"
//     },
//     imageSrc: "/images/product/Rectangle 9.png",
//     productCode: "DKP-OOSAAP",
//     description: "",
//     rate: 4,
//     colors: {
//       1: "#F79009FF",
//       2: "#B54708FF",
//       3: "#FEF0C7FF",
//     },
//     price: 65850000,
//     discount: 10,
//     otherProperties: {
//       numberOfSIM: "دو سیم کارت",
//       internalMemory: "128 گیگابایت",
//       memory: "4 گیگابایت",
//       processor: "Apple A15 Bionic",
//       displayType: "Super Retina XDR OLED",
//       screenSize: "6.1 اینچ",
//       camera: "دوگانه ۱۲ مگاپیکسل",
//       battery: "3٬240 میلی‌آمپر بر ساعت",
//     },
//     registered: true,
//     activationCode: true,
//     active: "NOT ACTIVE",
//     garanti: "18 ماه گارانتی شرکتی",
//   },
//   {
//     id: 4,
//     title: "گوشی موبایل اپل مدل iPhone 13 Pro CH دو سیم‌ کارت ظرفیت 512 گیگابایت و 6 گیگابایت رم - نات اکتیو",
//     brand: {
//       id: 1,
//       title: "اپل",
//       logo: "/images/brands/apple.png",
//       slug: "apple"
//     },
//     imageSrc: "/images/product/Rectangle 9.png",
//     productCode: "DKP-OOSAAP",
//     description: "",
//     rate: 4,
//     colors: {
//       1: "#F79009FF",
//       2: "#B54708FF",
//       3: "#FEF0C7FF",
//     },
//     price: 65850000,
//     discount: 10,
//     otherProperties: {
//       numberOfSIM: "دو سیم کارت",
//       internalMemory: "128 گیگابایت",
//       memory: "4 گیگابایت",
//       processor: "Apple A15 Bionic",
//       displayType: "Super Retina XDR OLED",
//       screenSize: "6.1 اینچ",
//       camera: "دوگانه ۱۲ مگاپیکسل",
//       battery: "3٬240 میلی‌آمپر بر ساعت",
//     },
//     registered: true,
//     activationCode: true,
//     active: "NOT ACTIVE",
//     garanti: "18 ماه گارانتی شرکتی",
//   },
//   {
//     id: 5,
//     title: "گوشی موبایل اپل مدل iPhone 13 Pro CH دو سیم‌ کارت ظرفیت 512 گیگابایت و 6 گیگابایت رم - نات اکتیو",
//     brand: {
//       id: 1,
//       title: "اپل",
//       logo: "/images/brands/apple.png",
//       slug: "apple"
//     },
//     imageSrc: "/images/product/Rectangle 9.png",
//     productCode: "DKP-OOSAAP",
//     description: "",
//     rate: 4,
//     colors: {
//       1: "#F79009FF",
//       2: "#B54708FF",
//       3: "#FEF0C7FF",
//     },
//     price: 65850000,
//     discount: 10,
//     otherProperties: {
//       numberOfSIM: "دو سیم کارت",
//       internalMemory: "128 گیگابایت",
//       memory: "4 گیگابایت",
//       processor: "Apple A15 Bionic",
//       displayType: "Super Retina XDR OLED",
//       screenSize: "6.1 اینچ",
//       camera: "دوگانه ۱۲ مگاپیکسل",
//       battery: "3٬240 میلی‌آمپر بر ساعت",
//     },
//     registered: true,
//     activationCode: true,
//     active: "NOT ACTIVE",
//     garanti: "18 ماه گارانتی شرکتی",
//   }
// ];

// export const products1: ProductType[] = [
//   {
//     id: 1,
//     name: "گوشی موبایل اپل مدل iPhone 13 Pro CH دو سیم‌ کارت ظرفیت 512 گیگابایت و 6 گیگابایت رم - نات اکتیو",
//     brand: {
//       id: 1,
//       title: "اپل",
//       logo: "/images/brands/apple.png",
//       slug: "apple"
//     },
//     imageSrc: ["/images/product/Rectangle 9.png"],
//     productCode: "DKP-OOSAAP",
//     description: "",
//     rate: 4,
//     colors: {
//       1: "#F79009FF",
//       2: "#B54708FF",
//       3: "#FEF0C7FF",
//     },
//     price: 65850000,
//     discount: 10,
//     otherProperties: {
//       numberOfSIM: "دو سیم کارت",
//       internalMemory: "128 گیگابایت",
//       memory: "4 گیگابایت",
//       processor: "Apple A15 Bionic",
//       displayType: "Super Retina XDR OLED",
//       screenSize: "6.1 اینچ",
//       camera: "دوگانه ۱۲ مگاپیکسل",
//       battery: "3٬240 میلی‌آمپر بر ساعت",
//     },
//     registered: true,
//     activationCode: true,
//     active: "NOT ACTIVE",
//     garanti: "18 ماه گارانتی شرکتی",
//   },
// ];

export type dataItemsSliderProductsType = {
  id: number;
  name: string;
  image: string;
  description: string;
};

export const dataItemsSliderProducts = [
  {
    id: 1,
    name: "سری 15",
    image: "/images/Products/Rectangle 11.png",
    description: "5 محصول",
  },
  {
    id: 2,
    name: "سری 14",
    image: "/images/Products/Rectangle 11.png",
    description: "3 محصول",
  },
  {
    id: 3,
    name: "سری 13",
    image: "/images/Products/Rectangle 11.png",
    description: "5 محصول",
  },
  {
    id: 4,
    name: "سری 12",
    image: "/images/Products/Rectangle 11.png",
    description: "5 محصول",
  },
  {
    id: 5,
    name: "سری 14",
    image: "/images/Products/Rectangle 11.png",
    description: "2 محصول",
  },
  {
    id: 6,
    name: "سری 11",
    image: "/images/Products/Rectangle 11.png",
    description: "5 محصول",
  },
  {
    id: 7,
    name: "سری 14",
    image: "/images/Products/Rectangle 11.png",
    description: "6 محصول",
  },
];

export const filters = [
  { id: 1, name: "نمایش کالاهای موجود" },
  {
    id: 2,
    name: "رنگ",
    values: [
      {
        id: 201,
        name: "قرمز",
        value: "bg-red-400",
      },
      {
        id: 202,
        name: "آبی",
        value: "bg-blue-400",
      },
    ],
  },
  {
    id: 3,
    name: "حافظه",
    values: [
      {
        id: 301,
        name: "تا 128 گیگابایت",
        value: "128",
      },
      {
        id: 302,
        name: "تا 256 گیگابایت",
        value: "256",
      },
    ],
  },
  {
    id: 4,
    name: "رم",
    values: [
      {
        id: 401,
        name: "تا 4 گیگابایت",
        value: "4",
      },
      {
        id: 402,
        name: "تا 8 گیگابایت",
        value: "8",
      },
    ],
  },
  {
    id: 5,
    name: "پردازنده",
    values: [
      {
        id: 501,
        name: "128",
        value: "128",
      },
      {
        id: 502,
        name: "256",
        value: "256",
      },
    ],
  },
  {
    id: 6,
    name: "دوربین",
    values: [
      {
        id: 601,
        name: "تا 48 مگاپیکسل",
        value: "48",
      },
      {
        id: 602,
        name: "تا 100 مگاپیکسل",
        value: "100",
      },
    ],
  },
  {
    id: 7,
    name: "باتری",
    values: [
      {
        id: 701,
        name: "5000 میلی آمپر",
        value: "5000",
      },
      {
        id: 702,
        name: "6000 میلی آمپر",
        value: "6000",
      },
    ],
  },
  {
    id: 8,
    name: "برند",
    values: [
      {
        id: 801,
        name: "سامسونگ",
        value: "samsung",
      },
      {
        id: 802,
        name: "آپل",
        value: "apple",
      },
    ],
  },
  {
    id: 9,
    name: "نمایشگر",
    values: [
      {
        id: 901,
        name: "آمولید",
        value: "amoled",
      },
      {
        id: 902,
        name: "سوپر آمولید",
        value: "superamoled",
      },
    ],
  },
  {
    id: 10,
    name: "رجیستری",
    values: [
      {
        id: 1001,
        name: "آمولید",
        value: "amoled",
      },
      {
        id: 1002,
        name: "سوپر آمولید",
        value: "superamoled",
      },
    ],
  },
  {
    id: 11,
    name: "گارانتی",
    values: [
      {
        id: 1101,
        name: "شتا20",
        value: "شتا20",
      },
      {
        id: 1102,
        name: "داریا",
        value: "داریا",
      },
    ],
  },
  {
    id: 12,
    name: "دسته بندی",
    values: [
      {
        id: 1201,
        name: "ایفون",
        value: "iphone",
      },
      {
        id: 1202,
        name: "سامسونگ",
        value: "samsung",
      },
    ],
  },
  {
    id: 13,
    name: "بازه قیمتی",
    values: [
      {
        id: 1301,
        name: "محدوده قیمت از",
        value: "cheap",
      },
      {
        id: 1302,
        name: "محدوده قیمت تا",
        value: "expensive",
      },
    ],
  },
  { id: 14, name: "نمایش کالاهای ارسال فوری زیر 2 ساعت" },
  { id: 15, name: "نمایش کالاهای ارسال رایگان" },
  { id: 16, name: "نمایش کالاهای امکان پرداخت در محل" },
  { id: 17, name: "نمایش کالاهای امکان خرید حضوری" },
];

export const sortingProductsPage = [
  {
    id: 1,
    name: " پیشنهاد شتا۲۰ ",
  },
  {
    id: 2,
    name: "ارزان‌ترین",
  },
  {
    id: 3,
    name: "گران‌ترین",
  },
  {
    id: 4,
    name: "جدید‌ترین",
  },
  {
    id: 5,
    name: "پربازدید‌ترین",
  },
  {
    id: 6,
    name: "پرتخفیف‌ترین",
  },
  {
    id: 7,
    name: "پرفروش‌ترین",
  },
];
