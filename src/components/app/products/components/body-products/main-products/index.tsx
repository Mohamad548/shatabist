import ShataLoading from "@/components/base/loading/shata-loading";
import { ProductCard } from "@/components/base/product-card";
import { ProductType } from "@/components/base/product-card/type";
import { getThumbnailImageUrl } from "@/utils/get-thumbnail-image-url";
import { calculateFinalPrice } from "@/utils/priceUtils";

function MainProducts({
  isPending,
  products,
}: {
  isPending: boolean;
  products: ProductType[];
}) {
  const partner = false;

  if (isPending) {
    return (
      <div className="min-h col-span-4 text-center p-6">
        <ShataLoading
          size="large"
          showText={true}
          text="در حال بارگذاری محصولات..."
        />
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="col-span-4 text-center p-6">
        <p>محصولی یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="md:grid md:grid-cols-4 overflow-hidden gap-4">
      {products.map((product: ProductType) => {
        const { finalPrice, discountText, initialPrice } = calculateFinalPrice(
          product?.productVariants ?? [],
          partner
        );
        const imageUrl = getThumbnailImageUrl(product?.productImages);

        // اگر محصول ناموجود است، قیمت را 'ناموجود' نمایش بده
        const displayPrice = finalPrice === "ناموجود" ? "ناموجود" : finalPrice;

        return (
          <ProductCard
            key={product.id}
            initialPrice={initialPrice}
            imageSrc={imageUrl || "/images/Products/default-product.webp"}
            price={displayPrice}
            discount={discountText}
            name={product.title}
            slug={product.slug}
            withLink={true}
            description={product.short_description}
            classNameCard="p-4 md:flex md:flex-col min-w-20 lg:border
             md:gap-3 grid gap-x-4 grid-cols-3 grid-rows-2 border-b md:border-b-0"
            cardImageSize="w-24 h-24 md:w-60 md:h-52"
          />
        );
      })}
    </div>
  );
}

export default MainProducts;
