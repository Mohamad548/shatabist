import { ProductVariant } from "@/components/base/product-card/type";

export const calculateFinalPrice = (variants: ProductVariant[], isPartner: boolean) => {
  if (!variants.length) {
    return { finalPrice: "ناموجود", discountText: "", initialPrice: 0, colors: [] };
  }

  let minPrice: number | null = null;
  let initialPrice = 0;
  const colorsMap = new Map<number, { id: number; mainColor: string; subColor: string; color: string }>();

  variants.forEach((variant) => {
    const quantity = variant.quantity ?? 0;
    const basePrice = isPartner ? Number(variant.partnerPrice) : Number(variant.customerPrice);
    const specialPrice = isPartner ? Number(variant.partnerSpecialPrice) || basePrice : Number(variant.customerSpecialPrice) || basePrice;

    if (quantity > 0) {
      if (minPrice === null || specialPrice < minPrice) {
        minPrice = specialPrice;
        initialPrice = basePrice;
      }
    }

    // استخراج رنگ‌ها
    const colorId = variant.color?.id;
    if (colorId && !colorsMap.has(colorId)) {
      colorsMap.set(colorId, {
        id: variant.color?.id,
        mainColor: variant.color?.mainColor,
        subColor: variant.color?.subColor,
        color: variant.color?.color,
      });
    }
  });

  if (minPrice === null || minPrice === 0) {
    return { finalPrice: "ناموجود", discountText: "", initialPrice: 0, colors: Array.from(colorsMap.values()) };
  }

  const discountPercentage = minPrice < initialPrice ? Math.round(((initialPrice - minPrice) / initialPrice) * 100) : 0;
  return { finalPrice: minPrice, discountText: discountPercentage ? `${discountPercentage}%` : "", initialPrice, colors: Array.from(colorsMap.values()) };
};
