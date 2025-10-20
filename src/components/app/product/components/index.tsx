"use client";
import ProductHeader from "./product-header";
import ProductDetail from "./product-detail";
import ProductAccessories from "./product-accessories";
import ProductDescription from "./product-description";
import { useProductsBySlug } from "@/components/layout/components/header/hooks";
import { calculateFinalPriceV2 } from "@/utils/priceUtils-v2";
import { useUserStore } from "@/stores/useUserStore";
import { useGetCart } from "../../profile-user/hooks";
import ShataLoading from "@/components/base/loading/shata-loading";

interface IProps {
  params: { slug: string };
}

export default function SingleProduct({ params }: IProps) {
  const { data, isPending: isProductPending } = useProductsBySlug(params.slug);
  const { isPending: isCartPending } = useGetCart();
  const product = data?.products && data?.products[0];
  const partner = false;
  const { colors: productColors } = calculateFinalPriceV2(
    product?.productVariants ?? [],
    !!partner
  );
  const { id: productId } = product ?? {};

  const isLoading = isProductPending || isCartPending;
  // اگر داده‌ها در حال بارگذاری هستند
  if (isLoading) {
    return (
      <ShataLoading size="medium" showText={true} text="در حال بارگذاری..." />
    );
  }
  return (
    <main className="flex flex-col mx-5 gap-6 xl:mx-40 md:mx-20">
      {/* هدر یا نقشه سایت در تک محصول */}
      <ProductHeader product={product} />

      {/* جزئیات محصول */}
      <ProductDetail
        productColors={productColors}
        product={product}
        productId={productId}
      />

      {/* لوازم جانبی محصول */}
      <ProductAccessories productId={product?.id} />

      {/* توضیحات محصول */}
      <ProductDescription productColors={productColors} product={product} productId={productId} />
    </main>
  );
}
