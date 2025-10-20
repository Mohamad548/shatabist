"use client";
import { accessoryCardInfo } from "@/constants/mock-data/accessory-card";
import React from "react";
import AccessoryCard from "./accessory-card";
import { useGetRelatedProducts } from "../../hooks";
import { BASE_URL } from "@/constants/url";
import { getThumbnailImageUrl } from "@/utils/get-thumbnail-image-url";
import { getPriceAndLimits } from "@/utils/get-price-and-limits";
import { useUserStore } from "@/stores/useUserStore";
import ShataLoading from "@/components/base/loading/shata-loading";

function ProductAccessories({ productId }: { productId: number }) {
  const { data, isLoading, isError } = useGetRelatedProducts(productId);
  const { user } = useUserStore();

  if (isLoading)
    return (
      <ShataLoading
        size="medium"
        showText={true}
        text="در حال بارگذاری لوازم جانبی..."
      />
    );
  if (isError) return <p>خطا در دریافت لوازم جانبی</p>;

  // فیلتر محصولات موجود و گرفتن اولین واریانت موجود
  const availableProducts = data?.relatedProducts
    ?.map((product: any) => {
      const availableVariant = product?.productVariants?.find(
        (variant: any) =>
          typeof variant?.quantity === "number" && variant.quantity > 0
      );
      if (!availableVariant) return null;

      return {
        ...product,
        availableVariant,
        imageUrl: getThumbnailImageUrl(product?.productImages),
      };
    })
    .filter(Boolean); // حذف محصولات ناموجود

  return availableProducts?.length > 0 ? (
    <section className="flex flex-col gap-6 md:border-2 md:bg-gray-25 md:border-gray-200 p-6 md:rounded-3xl">
      <div className="flex md:justify-center justify-start lg:justify-start">
        <p className="font-Bold">لوازم جانبی</p>
      </div>
      <div className="flex md:flex-col gap-6 md:gap-0 overflow-scroll hidden-scrollbar">
        {availableProducts?.map((product: any) => (
          <AccessoryCard
            key={product.id}
            id={product.id}
            imageSrc={
              product.imageUrl || "/images/Products/default-product.webp"
            }
            imageAlt={product.title || "accessory image"}
            accessoryName={product.title}
            options={[product.availableVariant]} // فقط واریانت موجود
            slug={product.slug}
            discount={product.discount}
          />
        ))}
      </div>
    </section>
  ) : null;
}

export default ProductAccessories;
