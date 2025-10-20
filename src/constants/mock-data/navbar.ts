import { PageLevelLocalization } from "@/constants/localization";
import { routes } from "../routes";

const { home: homeLocalization } = PageLevelLocalization;

export const MenuItem = [
  { name: homeLocalization.shop, id: 1, link: routes.shop, src: "" },
  // { name: homeLocalization.collaborationPanel, id: 3, link: "", src: "" },
  { name: homeLocalization.installmentPurchase, id: 2, link: routes.installmentPlan, src: "" },
  { name: homeLocalization.aboutUs, id: 3, link: routes.about, src: "" },
  // { name: homeLocalization.contactUs, id: 4, link: routes.contact, src: "" },
  // { name: homeLocalization.storeGuide, id: 3, link: "", src: "" },
  // { name: homeLocalization.shataMagazine, id: 4, link: routes.blog, src: "" },
];

export const ProductCategory = [
  {
    id: 1,
    name: "گوشی موبابل اپل",
    subCategory: [
      {
        id: 1,
        name: "سری 11",
      },
      {
        id: 2,
        name: "سری 12",
      },
      {
        id: 3,
        name: "سری 13",
      },
    ],
  },
  {
    id: 2,
    name: "گوشی موبابل سامسونگ",
    subCategory: [
      {
        id: 1,
        name: "سری اس",
      },
      {
        id: 2,
        name: "سری ام",
      },
      {
        id: 3,
        name: "سری آ",
      },
    ],
  },
  {
    id: 3,
    name: "گوشی موبابل شیائومی",
    subCategory: [
      {
        id: 1,
        name: "سری اف",
      },
      {
        id: 2,
        name: "سری پوکو",
      },
      {
        id: 3,
        name: "سری نوت",
      },
    ],
  },
  {
    id: 4,
    name: "گوشی موبابل هانر",
    subCategory: [
      {
        id: 1,
        name: "سری ایکس",
      },
      {
        id: 2,
        name: "سری ایکس ام",
      },
      {
        id: 3,
        name: "سری ایکس اف",
      },
    ],
  },
  {
    id: 5,
    name: "گوشی موبابل تبلت",
    subCategory: [
      {
        id: 1,
        name: "سامسونگ  ",
      },
      {
        id: 2,
        name: "اپل",
      },
      {
        id: 3,
        name: "لنوا",
      },
    ],
  },
  {
    id: 6,
    name: "لوازم جانبی",
    subCategory: [
      {
        id: 1,
        name: "هندزفری، هدفون و هدست",
      },
      {
        id: 2,
        name: "آدپتور و شارژر و کابل",
      },
      {
        id: 3,
        name: "اسپیکیر و بلندگو",
      },
      {
        id: 4,
        name: "ساعت هوشمند و مچ بند",
      },
      {
        id: 5,
        name: "کیف و کاور و مخافظ و گلس",
      },
      {
        id: 6,
        name: "پاوربانک",
      },
    ],
  },
];

export const ItemMenuProfile = [
  // {
  //   id: 1,
  //   icon: "",
  //   name: "کیف پول",
  //   link: routes.profile.dashboard,
  //   src: "/svg/profile/wallet.svg",
  //   value: "200000",
  // },
  // {
  //   id: 2,
  //   icon: "",
  //   name: "اعتبار شما",
  //   link: "",
  //   src: "/svg/profile/wallet-money.svg",
  //   value: "20000",
  // },
  // {
  //   id: 3,
  //   icon: "",
  //   name: " زمان تسویه",
  //   link: "",
  //   src: "/svg/profile/timer.svg",
  //   value: "20000",
  // },
  {
    id: 4,
    icon: "",
    name: "سفارشات",
    link: routes.profile.orders,
    src: "/svg/bag-2.svg",
  },
  {
    id: 6,
    icon: "",
    name: "آدرس‌ها",
    link: routes.profile.addresses,
    src: "/svg/map.svg",
  },
  {
    id: 5,
    icon: "",
    name: "پشتیبانی",
    link: routes.profile.support,
    src: "/svg/messages-2.svg",
  },
];

export const AccessMenuItem = [
  {
    id: 1,
    name: "خانه",
    link: routes.home,
    src: "/svg/Home 2.svg",
    activeSrc: "/svg/HomeActive.svg",
  },
  {
    id: 2,
    name: "سبد خرید",
    link: routes.cart,
    src: "/svg/shopping-cart.svg",
    activeSrc: "/svg/shopping-cart-white.svg",
  },
  {
    id: 3,
    name: "فروشگاه",
    link: routes.shop,
    src: "/svg/Bag 1.svg",
    activeSrc: "/svg/Bag-active.svg",
  },

  {
    id: 4,
    name: "پروفایل کاربری",
    link: routes.profile.dashboard,
    src: "/svg/user-octagon.svg",
    activeSrc: "/svg/user-octagon.svg",
  },
];
