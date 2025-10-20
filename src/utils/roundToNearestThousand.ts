// utils/roundToNearestThousand.ts

/**
 * گرد کردن عدد به نزدیک‌ترین مضرب 1000 بالاتر
 * @param value - عدد ورودی که باید گرد شود (نوع: number)
 * @returns عدد گرد شده به نزدیک‌ترین مضرب 1000 (نوع: number)
 */
export function roundToNearestThousand(value: number): number {
  return Math.ceil(value / 1000) * 1000;
}
