type Color = {
  id: number;
  mainColor: string;
  subColor: string;
  color: string;
};

type ProductVariant = {
  customerPrice: string;
  partnerPrice: string;
  customerSpecialPrice: string;
  partnerSpecialPrice: string;
  maximumOrder: number;
  partnerMaximumOrder: number;
  partnerMinimumOrder: number;
  color?: Color; // ✅ اضافه شد
};

type CartItem = {
  productVariant: ProductVariant;
};

type CartData = {
  items: CartItem[];
};

export function getPriceAndLimits(cartData: CartData, isPartner: boolean) {
  return cartData?.items?.map(({ productVariant }) => {
    const {
      customerPrice,
      partnerPrice,
      customerSpecialPrice,
      partnerSpecialPrice,
      maximumOrder,
      partnerMaximumOrder,
      partnerMinimumOrder,
      color,
    } = productVariant;

    let finalPrice = 0;
    let originalPrice = 0;
    let discountPercent = 0;
    let minOrder = 1;
    let maxOrder = maximumOrder;

    if (isPartner) {
      if (partnerSpecialPrice && partnerSpecialPrice !== "0") {
        finalPrice = Number(partnerSpecialPrice);
        originalPrice = Number(partnerPrice);
      } else {
        finalPrice = originalPrice = Number(partnerPrice);
      }
      minOrder = partnerMinimumOrder;
      maxOrder = partnerMaximumOrder;
    } else {
      if (customerSpecialPrice && customerSpecialPrice !== "0") {
        finalPrice = Number(customerSpecialPrice);
        originalPrice = Number(customerPrice);
      } else {
        finalPrice = originalPrice = Number(customerPrice);
      }
    }

    if (originalPrice > finalPrice) {
      discountPercent = Math.round(
        ((originalPrice - finalPrice) / originalPrice) * 100,
      );
    }

    return {
      finalPrice,
      originalPrice,
      discountPercent,
      minOrder,
      maxOrder,
      color: color?.color as string | undefined,
      subColor: color?.mainColor as string | undefined,
    };
  });
}
