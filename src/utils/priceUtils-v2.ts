import { ProductVariant } from '@/components/base/product-card/type';

export const calculateFinalPriceV2 = (
  variants: ProductVariant[],
  isPartner: boolean
) => {
  if (!variants.length) {
    return { colors: [] };
  }

  const colorsMap = new Map();

  variants.forEach((variant) => {
    const basePrice = isPartner
      ? Number(variant.partnerPrice)
      : Number(variant.customerPrice);

    const specialPrice = isPartner
      ? Number(variant.partnerSpecialPrice) || basePrice
      : Number(variant.customerSpecialPrice) || basePrice;

    const finalPrice = specialPrice;

    const discountPercentage =
      finalPrice < basePrice
        ? Math.round(((basePrice - finalPrice) / basePrice) * 100)
        : 0;

    const colorId = variant.color?.id;
    if (!colorId) return;

    if (!colorsMap.has(colorId)) {
      colorsMap.set(colorId, {
        variantId: variant.id,
        id: variant.color.id,
        mainColor: variant.color.mainColor,
        subColor: variant.color.subColor,
        color: variant.color.color,
        image: variant.image,
        price: finalPrice,
        basePrice: basePrice,
        discountText: discountPercentage ? `${discountPercentage}%` : '',
        isDefault: false,
        statuses: {
          freeDelivery: false,
          fastDelivery: false,
          installmentAvailibility: false,
          isInPersonPurchase: false,
          payOnSite: false,
        },
        productId: variant.productId,
        quantity: variant.quantity || 0,
        maximumOrder: isPartner ? undefined : variant.maximumOrder,
        partnerMaximumOrder: isPartner
          ? variant.partnerMaximumOrder
          : undefined,
        partnerMinimumOrder: isPartner
          ? variant.partnerMinimumOrder
          : undefined,
      });
    } else {
      const existingColor = colorsMap.get(colorId);
      existingColor.quantity += variant.quantity || 0;
    }

    const colorData = colorsMap.get(colorId);

    if (variant.freeDelivery) colorData.statuses.freeDelivery = true;
    if (variant.fastDelivery) colorData.statuses.fastDelivery = true;
    if (variant.installmentAvailibility)
      colorData.statuses.installmentAvailibility = true;
    if (variant.isInPersonPurchase)
      colorData.statuses.isInPersonPurchase = true;
    if (variant.payOnSite)
      colorData.statuses.payOnSite = true;
  });

  let minPrice = Infinity;
  let minPriceColorId = null;

  colorsMap.forEach((color) => {
    if (color.price < minPrice) {
      minPrice = color.price;
      minPriceColorId = color.id;
    }
  });

  if (minPriceColorId !== null) {
    colorsMap.get(minPriceColorId).isDefault = true;
  }

  return {
    colors: Array.from(colorsMap.values()).map((color) => ({
      ...color,
      statuses: {
        freeDelivery: color.statuses.freeDelivery,
        fastDelivery: color.statuses.fastDelivery,
        installmentAvailibility: color.statuses.installmentAvailibility,
        isInPersonPurchase: color.statuses.isInPersonPurchase,
        payOnSite: color.statuses.payOnSite,
      },
    })),
  };
};
