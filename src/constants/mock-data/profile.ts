interface ProfileItem {
  id: number;
  name: string;
  src: string;
  activeSrc: string;
  slug: string;
}

export const sideBarProfile: ProfileItem[] = [
  {
    id: 1,
    name: "سفارشات",
    src: "/svg/bag-2.svg",
    activeSrc: "/svg/bagActive.svg",
    slug: "orders",
  },
  {
    id: 2,
    name: "اقساط",
    src: "/svg/cards.svg",
    activeSrc: "/svg/cardsActive.svg",
    slug: "installment",
  },
  {
    id: 3,
    name: "آدرس‌ها",
    src: "/svg/map.svg",
    activeSrc: "/svg/MAPACTIVE.svg",
    slug: "addresses",
  },
  {
    id: 4,
    name: "لیست‌های‌ من",
    src: "/svg/heart.svg",
    activeSrc: "/svg/heartActive.svg",
    slug: "my-list-products",
  },
  // {
  //   id: 5,
  //   name: "اعلانات",
  //   src: "/svg/notification-bing.svg",
  //   activeSrc: "/svg/notification-bingActive.svg",
  //   slug: "notifications",
  // },
  {
    id: 6,
    name: "دیدگاه و پرسش‌ها",
    src: "/svg/message.svg",
    activeSrc: "/svg/messageActive.svg",
    slug: "comments",
  },
  {
    id: 7,
    name: "پشتیبانی",
    src: "/svg/messages-2.svg",
    activeSrc: "/svg/messagesActive2.svg",
    slug: "support",
  },
  {
    id: 8,
    name: "اطلاعات کاربری",
    src: "/svg/profileUser.svg",
    activeSrc: "/svg/profileUserActive.svg",
    slug: "user-info",
  },
];

// types.ts

export interface City {
  id: number;
  name: string;
  slug: string;
  province_id: number;
}

export interface Province {
  id: number;
  name: string;
  slug: string;
  tel_prefix: string;
}

export interface AddressType {
  id: number;
  title: string;
  userId: number;
  province_id: number;
  city_id: number;
  hood: string;
  lat: number;
  long: number;
  postalCode: string;
  pelak: string;
  vahed: string;
  details: string;
  ownReceiver: boolean;
  receiverFullName: string;
  receiverName?: string;
  receiverLastname?: string;
  receiverPhoneNumber: string;
  city: {
    id: number;
    name: string;
    slug: string;
    province_id: number;
  };
  province: {
    id: number;
    name: string;
    slug: string;
    tel_prefix: string;
  };
}

// export const userAddresses = [
//   {
//     id: 1,
//     userId: 1,
//     province_id: 1,
//     city_id: 1,
//     hood: "حیابان امام   سپیده",
//     lat: 12.3364,
//     long: 123,
//     postalCode: "asd",
//     pelak: "asdasd",
//     vahed: "asd",
//     details: "asd",
//     ownReceiver: true,
//     receiverName: "محمد",
//     receiverLastname: "محمودی",
//     city: {
//       id: 1,
//       name: "تهران",
//       slug: "zxccccc",
//       province_id: 1,
//     },
//     province: {
//       id: 1,
//       name: "تهران",
//       slug: "asdczxc",
//       tel_prefix: "zxczxc",
//     },
//   },
//   {
//     id: 2,
//     userId: 1,
//     province_id: 1,
//     city_id: 1,
//     hood: "District 1",
//     lat: 35.6892,
//     long: 51.389,
//     postalCode: "1234567890",
//     pelak: "45",
//     vahed: "3",
//     details: "This is a test address for the user.",
//     ownReceiver: true,
//     receiverName: "Ali",
//     receiverLastname: "Rezaei",
//     city: {
//       id: 1,
//       name: "sdzxczxc",
//       slug: "zxccccc",
//       province_id: 1,
//     },
//     province: {
//       id: 1,
//       name: "asdasd",
//       slug: "asdczxc",
//       tel_prefix: "zxczxc",
//     },
//   },
// ];

export const orderDetails = {
  id: 1,
  userId: 1,
  status: "PENDING",
  totalPrice: 3920200,
  itemCount: 1,
  packagingType: "ECONOMIC",
  deliveryType: "SEND_BY_COURIER",
  delivery_code: null,
  shippingId: 1,
  wrapping: false,
  paymentType: "CASH",
  userAddressId: 1,
  trackingNumber: null,
  deliveryId: null,
  dateOfSend: null,
  created_at: "2024-10-06T17:24:14.385Z",
  updated_at: "2024-10-06T17:24:14.385Z",
  deliveryMan: null,
  userAddress: {
    id: 1,
    userId: 1,
    province_id: 1,
    city_id: 1,
    hood: "asdasd",
    lat: 12.3364,
    long: 123,
    postalCode: "asd",
    pelak: "asdasd",
    vahed: "asd",
    details: "asd",
    ownReceiver: true,
    receiverName: "asdasd",
    receiverLastname: "asdasd",
    city: {
      id: 1,
      name: "کرمانشاه",
      slug: "zxccccc",
      province_id: 1,
    },
    province: {
      id: 1,
      name: "ایران",
      slug: "asdczxc",
      tel_prefix: "zxczxc",
    },
  },
  orderItems: [
    {
      id: 4,
      orderId: 4,
      variantId: 4,
      quantity: 2,
      serialNumber: "SERIAL456",
      price: 1500000,
      variant: {
        id: 4,
        image: "/images/product/Rectangle 9.png",
        colorId: 4,
        stockId: 4,
        quantity: 40,
        maximumOrder: 5,
        partnerMaximumOrder: 2,
        partnerMinimumOrder: 1,
        customerPrice: "1600000",
        partnerPrice: "1500000",
        customerSpecialPrice: "1550000",
        partnerSpecialPrice: "1480000",
        discount: "6",
        productId: 4,
        color: {
          id: 4,
          mainColor: "Blue",
          subColor: "Light Blue",
          color: "Blue",
        },
        stock: {
          id: 4,
          name: "Warehouse 4",
        },
        product: {
          id: 4,
          title:
            "گوشی موبایل اپل مدل iPhone 13 Pro CH دو سیم‌ کارت ظرفیت 512 گیگابایت و 6 گیگابایت رم - نات اکتیو",
          sub_title: "sub_title4",
          description: "description4",
          short_description: "short_description4",
          brandId: 4,
          publish: true,
          slug: "product4",
          relatedProductsIds: [1, 3],
          tagIds: [4, 5],
          shippingIds: [1, 4],
          serieId: 4,
          categoryId: 4,
          created_at: "2024-09-28T12:00:00.000Z",
          productImages: [
            {
              id: 4,
              productId: 4,
              url: "/images/product/Rectangle 9.png",
              thumbnail: true,
            },
          ],
        },
      },
    },
    {
      id: 5,
      orderId: 4,
      variantId: 4,
      quantity: 1,
      serialNumber: "SERIAL456",
      price: 1600000,
      variant: {
        id: 4,
        image: "/images/product/Rectangle 9.png",
        colorId: 4,
        stockId: 4,
        quantity: 40,
        maximumOrder: 5,
        partnerMaximumOrder: 2,
        partnerMinimumOrder: 1,
        customerPrice: "1600000",
        partnerPrice: "1600000",
        customerSpecialPrice: "1550000",
        partnerSpecialPrice: "1480000",
        discount: "6",
        productId: 4,
        color: {
          id: 4,
          mainColor: "Blue",
          subColor: "Light Blue",
          color: "Blue",
        },
        stock: {
          id: 4,
          name: "Warehouse 4",
        },
        product: {
          id: 4,
          title:
            "گوشی موبایل اپل مدل iPhone 13 Pro CH دو سیم‌ کارت ظرفیت 512 گیگابایت و 6 گیگابایت رم - نات اکتیو",
          sub_title: "sub_title4",
          description: "description4",
          short_description: "short_description4",
          brandId: 4,
          publish: true,
          slug: "product4",
          relatedProductsIds: [1, 3],
          tagIds: [4, 5],
          shippingIds: [1, 4],
          serieId: 4,
          categoryId: 4,
          created_at: "2024-09-28T12:00:00.000Z",
          productImages: [
            {
              id: 4,
              productId: 4,
              url: "/images/product/Rectangle 9.png",
              thumbnail: true,
            },
          ],
        },
      },
    },
  ],
  payments: [
    {
      paymentMethod: "instalmaent",
    },
  ],
  user: {
    id: 1,
    first_name: "محمد",
    last_name: "محمودی",
    avatar: null,
    phone_number: "09210848772",
    email: null,
  },
  shipping: {
    id: 1,
    name: "asdasd",
    description: "asdasd",
    price: "200",
  },
};

export const companyAddresses = [
  {
    id: 1,
    title: "دفتر مرکزی",
    userId: 1,
    province_id: 1,
    city_id: 1,
    hood: "حیابان امام   سپیده",
    lat: 12.3364,
    long: 123,
    postalCode: "asd",
    pelak: "asdasd",
    vahed: "asd",
    details: "asd",
    ownReceiver: true,
    receiverFullName: "محمد محمودی",
    receiverPhoneNumber: "09123456789",
    city: {
      id: 1,
      name: "تهران",
      slug: "zxccccc",
      province_id: 1,
    },
    province: {
      id: 1,
      name: "تهران",
      slug: "asdczxc",
      tel_prefix: "zxczxc",
    },
  },
];

interface Color {
  id: number;
  mainColor: string;
  subColor: string;
  color: string;
}

interface Stock {
  id: number;
  name: string;
}

interface ProductImage {
  id: number;
  productId: number;
  url: string;
  thumbnail: boolean;
}

interface Product {
  id: number;
  title: string;
  sub_title: string;
  description: string;
  short_description: string;
  brandId: number;
  publish: boolean;
  slug: string;
  relatedProductsIds: number[];
  tagIds: number[];
  shippingIds: number[];
  serieId: number;
  categoryId: number;
  created_at: string;
  productImages: ProductImage[];
}

interface Variant {
  id: number;
  image: string;
  colorId: number;
  stockId: number;
  quantity: number;
  maximumOrder: number;
  partnerMaximumOrder: number;
  partnerMinimumOrder: number;
  customerPrice: string;
  partnerPrice: string;
  customerSpecialPrice: string;
  partnerSpecialPrice: string;
  discount: string;
  productId: number;
  color: Color;
  stock: Stock;
  product: Product;
}

interface OrderItem {
  id: number;
  orderId: number;
  variantId: number;
  quantity: number;
  serialNumber: string;
  price: number;
  variant: Variant;
}

interface User {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  national_id: string;
  birth_date: string;
  refresh_token: string;
  otp_code: string;
  account_status: boolean;
  avatar: string;
  role: string;
  email_verify_token: string | null;
  email_verify_expire: string | null;
  otp_expiry: string;
  created_at: string;
  updated_at: string;
}

