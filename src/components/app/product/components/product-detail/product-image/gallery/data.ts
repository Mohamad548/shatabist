import { title } from "process";

export type slide = {
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
};

export const slides: slide[] = [
  {
    id: 3,
    category: { name: "Users", title: "کاربران" },
    imageSrc: ["/images/product_image.png", "/images/product_gallery.png"],
    name: "Slide 3",
    userFeedback: {
      userName: "محمد حمیدی",
      commentTitle: "تجربه‌ی استفاده از گوشی",
      likes: 24,
      dislikes: 3,
      commentDate: "۱۴۰۳/۰۴/۲۸",
      description:
        "این گوشی را خریداری کردم و تجربه کلی من بسیار مثبت بود اما در نهایت به مشکل برخوردم.",
    },
  },
  {
    id: 4,
    category: { name: "Users", title: "کاربران" },
    imageSrc: [
      "/images/122.jpeg",
      "/images/123.jpeg",
      "/images/product_gallery.png",
    ],
    name: "Slide 4",

    userFeedback: {
      userName: "علی احمدی",
      commentTitle: "محصول خوب",
      description: "تجربه استفاده من از این محصول عالی بوده است.",
      likes: 15,
      dislikes: 2,
      commentDate: "۱۴۰۳/۰۴/۳۰",
    },
  },

  {
    id: 9,
    category: { name: "Official", title: "رسمی" },
    imageSrc: ["/images/Rectangle 12 (2).png"],
    name: "Slide 9",
  },
];
// export const categories = [
//   { id: 1, category: 'Official', name: 'رسمی' },
//   { id: 2, category: 'Users', name: 'کابران' },
// ];

// export interface CommentImage {
//   id: number;
//   url: string;
//   type: string;
// }

// export interface Comment {
//   id: number;
//   userName: string;
//   commentTitle: string;
//   likes: number;
//   dislikes: number;
//   commentDate: string;
//   description: string;
//   comment_images: CommentImage[];
// }

// export interface ProductVariantProperty {
//   id: number;
//   label: string;
//   value: string;
//   variantId: number;
// }

// export interface Color {
//   id: number;
//   mainColor: string;
//   subColor: string;
//   color: string;
// }

// export interface Stock {
//   id: number;
//   name: string;
// }

// export interface ProductVariant {
//   id: number;
//   image: string;
//   colorId: number;
//   stockId: number;
//   quantity: number;
//   installmentAvailibility: boolean | null;
//   maximumOrder: number;
//   partnerMaximumOrder: number;
//   partnerMinimumOrder: number;
//   customerPrice: string;
//   partnerPrice: string;
//   customerSpecialPrice: string;
//   partnerSpecialPrice: string;
//   discount: string;
//   productId: number;
//   color: Color;
//   stock: Stock;
//   productVariantProperties: ProductVariantProperty[];
// }

// export interface ProductImage {
//   id: number;
//   productId: number;
//   url: string;
//   thumbnail: boolean;
//   type?: string;
// }

// export interface Brand {
//   id: number;
//   title: string;
//   logo: string;
// }

// export interface Category {
//   id: number;
//   title: string;
//   icon: string;
// }

// export interface Serie {
//   id: number;
//   brandId: number;
//   title: string;
//   description: string;
// }

// export interface ProductProperty {
//   title: string;
//   categoryid: number;
// }

// export interface Product {
//   id: number;
//   title: string;
//   sub_title: string;
//   description: string;
//   short_description: string;
//   brandId: number;
//   publish: boolean;
//   slug: string;
//   relatedProductsIds: number[] | null;
//   tagIds: number[] | null;
//   shippingIds: string;
//   serieId: number;
//   categoryId: number;
//   created_at: string;
//   comments: Comment[];
//   productVariants: ProductVariant[];
//   productImages: ProductImage[];
//   brand: Brand;
//   category: Category;
//   serie: Serie;
//   productProperties: ProductProperty[];
// }

// export interface DataProduct {
//   product: Product;
//   Success: boolean;
// }

// const Product = {
//   id: 1,
//   title:
//     'گوشی موبایل اپل مدل iPhone 13 Pro CH دو سیم‌ کارت ظرفیت 512 گیگابایت و 6 گیگابایت رم - نات اکتیو',
//   sub_title:
//     'Samsung Galaxy S24 Ultra Dual SIM 256GB And 12GB RAM Mobile Phone - Vietnam',
//   description: 'description',
//   short_description: 'short_description',
//   brandId: 1,
//   publish: true,
//   slug: 'test',
//   relatedProductsIds: null,
//   tagIds: null,
//   shippingIds: '1',
//   serieId: 1,
//   categoryId: 1,
//   created_at: '2024-10-21T20:51:54.000Z',
//   comments: [
//     {
//       id: 12,
//       userName: 'محمد حمیدی',
//       commentTitle: 'تجربه‌ی استفاده از گوشی',
//       likes: 24,
//       dislikes: 3,
//       commentDate: '۱۴۰۳/۰۴/۲۸',
//       description:
//         'این گوشی را خریداری کردم و تجربه کلی من بسیار مثبت بود اما در نهایت به مشکل برخوردم.',
//       comment_images: [
//         { id: 1, url: '/images/122.jpeg', type: 'Users' },
//         { id: 2, url: '/images/123.jpeg', type: 'Users' },
//         { id: 3, url: '/images/product_gallery.png', type: 'Users' },
//       ],
//     },
//     {
//       id: 2,
//       userName: 'علی رضایی',
//       commentTitle: 'عالی اما کمی گران',
//       likes: 12,
//       dislikes: 2,
//       commentDate: '۱۴۰۳/۰۳/۱۵',
//       description: 'محصول واقعاً با کیفیت است اما قیمتش کمی بالا بود.',
//       comment_images: [
//         { id: 1, url: '/124.jpg', type: 'Users' },
//         { id: 2, url: '/images/123.jpeg', type: 'Users' },
//       ],
//     },
//     {
//       id: 3,
//       userName: 'زهرا محمدی',
//       commentTitle: 'مشکل در عملکرد دوربین',
//       likes: 8,
//       dislikes: 5,
//       commentDate: '۱۴۰۳/۰۲/۱۰',
//       description:
//         'دوربین در نور کم خوب عمل نمی‌کند اما سایر ویژگی‌ها عالی است.',
//       comment_images: [{ id: 1, url: '/images/122.jpeg', type: 'Users' }],
//     },
//     {
//       id: 4,
//       userName: 'مهدی کاظمی',
//       commentTitle: 'ارزش خرید دارد',
//       likes: 30,
//       dislikes: 0,
//       commentDate: '۱۴۰۳/۰۱/۲۰',
//       description: 'محصولی است که ارزش خرید بالایی دارد. حتماً پیشنهاد می‌کنم.',
//       comment_images: [],
//     },
//   ],
//   productVariants: [
//     {
//       id: 1,
//       image: 'test',
//       colorId: 1,
//       stockId: 1,
//       quantity: 31,
//       installmentAvailibility: null,
//       maximumOrder: 15,
//       partnerMaximumOrder: 5,
//       partnerMinimumOrder: 2,
//       customerPrice: '2000000',
//       partnerPrice: '2000000',
//       customerSpecialPrice: '2000000',
//       partnerSpecialPrice: '2000000',
//       discount: '2',
//       productId: 1,
//       color: {
//         id: 1,
//         mainColor: 'Abi',
//         subColor: 'nafti',
//         color: 'Abiiii',
//       },
//       stock: {
//         id: 1,
//         name: '1',
//       },
//       productVariantProperties: [
//         {
//           id: 1,
//           label: 'تعداد سیم‌کارت',
//           value: 'دوسیم‌کارت',
//           variantId: 1,
//         },
//         {
//           id: 2,
//           label: 'حافظه داخلی',
//           value: ' 128 گیگابایت',
//           variantId: 2,
//         },
//         {
//           id: 3,
//           label: 'مقدار رم',
//           value: '۴ گیگابایت',
//           variantId: 1,
//         },
//         {
//           id: 4,
//           label: 'پردازنده',
//           value: 'Apple A15 Bionic',
//           variantId: 1,
//         },
//         {
//           id: 5,
//           label: 'نوع نمایشگر',
//           value: 'Super Retina XDR OLED',
//           variantId: 1,
//         },
//         {
//           id: 6,
//           label: 'سایز نمایشگر',
//           value: '6.1 اینچ',
//           variantId: 1,
//         },
//         {
//           id: 7,
//           label: 'دوربین',
//           value: 'دوگانه ۱۲ مگاپیکسل',
//           variantId: 1,
//         },
//         {
//           id: 8,
//           label: 'باتری',
//           value: '3٬240 میلی‌آمپر بر ساعت',
//           variantId: 1,
//         },
//       ],
//     },
//   ],
//   productImages: [
//     {
//       id: 12,
//       productId: 1,
//       url: '/images/product_gallery.png',
//       thumbnail: true,
//       type: 'Official',
//     },
//     {
//       id: 2,
//       productId: 1,
//       url: '/images/product_gallery.png',
//       thumbnail: false,
//       type: 'Official',
//     },
//     {
//       id: 3,
//       productId: 1,
//       url: '/images/product_image.png',
//       thumbnail: false,
//     },
//     {
//       id: 4,
//       productId: 1,
//       url: '/images/product_gallery.png',
//       thumbnail: false,
//       type: 'Official',
//     },
//   ],
//   brand: {
//     id: 1,
//     title: 'test brand',
//     logo: 'test logo',
//   },
//   category: {
//     id: 1,
//     title: 'asdasd',
//     icon: 'asdasd',
//   },
//   serie: {
//     id: 1,
//     brandId: 1,
//     title: 'a seri',
//     description: 'asda',
//   },
//   productProperties: [
//     { title: 'رجیسترشده + کد فعالسازی', categoryid: 1 },
//     { title: '18 ماه گارانتی شرکتی', categoryid: 2 },
//     { title: 'NOT ACTIVE', categoryid: 3 },
//   ],
// }
