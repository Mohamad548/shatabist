type Localization = {
  search: string;
  toman: string;
  immediateShipping: string;
};
type PageLevelLocalization = {
  home: {
    amazingDiscount: string;
    loginLogout: string;
    productCategories: string;
    collaborationPanel: string;
    installmentPurchase: string;
    shop: string;
    storeGuide: string;
    shataMagazine: string;
    aboutUs: string;
    contactUs: string;
    amazingSlider: { title: string; action: string };
    slider: {
      apple: string;
      samsung: string;
      xiaomi: string;
      accessories: string;
      titleMag: string;
    };
    magShata: {
      more: string;
      action: string;
    };
  };
  products: {
    titleProductPage: string;
    sorting: { name: string; src: string };
    result: string;
    filter: { name: string; src: string };
    ok: string;
    removeFilter: string;
  };
  ProfileUser: {
    Wallet: string;
    YourCredit: string;
    SettlementTime: string;
  };
  blog: {
    blogDetail: {
      blogDetailParagraph: string;
      blogDetailParagraph2: string;
    };
  };
  login: {
    entry: string;
    signIn: string;
    enterNumber: string;
    acceptingRules: {
      accept: string;
      rules: string;
      verb: string;
    };
    verificationCode: string;
    sendMessageCode: (value: string) => string;
    timeRemaining: string;
    confirmation: string;
  };
};
export const localization: Localization = {
  search: "جستجو",
  toman: "تومانء",
  immediateShipping: "ارسال فوری",
};
export const PageLevelLocalization: PageLevelLocalization = {
  home: {
    amazingDiscount:
      "سایت در دست طراحی و راه‌اندازی است ؛ لطفاً توجه داشته باشید که فعلاً امکان خرید فعال نیست و اطلاعات موجودی و قیمت‌ها نهایی نشده‌اند.",
    loginLogout: "ورود / ثبت نام",
    productCategories: "  دسته‌بندی محصولات  ",
    shop: " فروشگاه",
    collaborationPanel: "پنل همکاری",
    installmentPurchase: "خرید اقساطی",
    storeGuide: "راهنمای فروشگاه",
    aboutUs: "درباره ما",
    contactUs: "تماس با ما",
    shataMagazine: "مجله شتا20",
    amazingSlider: { title: "تخفیف شگفت انگیز", action: "مشاهده همه" },
    slider: {
      apple: "اپل",
      samsung: "سامسونگ",
      xiaomi: "شیائومی",
      accessories: "لوازم جانبی",
      titleMag: "مقالات و اخبار",
    },
    magShata: {
      more: "مشاهده",
      action: "مطالعه بیشتر",
    },
  },
  products: {
    titleProductPage: "گوشی های موبایل اپل",
    sorting: { name: "مرتب‌سازی", src: "/svg/Products/sort.svg" },
    result: "240 محصول یافت شد.",
    filter: { name: "فیلتر", src: "/svg/Products/Vector.svg" },
    ok: "تایید",
    removeFilter: "حذف فیلتر",
  },
  ProfileUser: {
    Wallet: "کیف پول",
    YourCredit: "اعتبار شما",
    SettlementTime: "زمان تسویه",
  },
  blog: {
    blogDetail: {
      blogDetailParagraph:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد.",
      blogDetailParagraph2:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد.",
    },
  },
  login: {
    entry: "ورود",
    signIn: "ورود / ثبت‌نام",
    enterNumber: "لطفا شماره موبایل خود را وارد کنید",
    acceptingRules: {
      accept: " ورود شما به معنای پذیرش",
      rules: " قوانین ",
      verb: "است",
    },
    verificationCode: "کد تایید را وارد کنید",
    sendMessageCode: function (value: string) {
      return `کد تایید برای شماره ${value} پیامک شد`;
    },
    timeRemaining: " مانده تا دریافت مجدد کد",
    confirmation: "تایید",
  },
};
