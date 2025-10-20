import Button from "@/components/base/button";
import { ProductCard } from "@/components/base/product-card";
import React from "react";
import { CartComponentsProps } from "../../../type";
import { calculateFinalPrice } from "@/utils/priceUtils";
import {
  useAddToCartTransaction,
  useDeleteAllCartItems,
  useDeleteCartItem,
} from "@/components/app/profile-user/hooks";
import { BASE_URL } from "@/constants/url";
import Image from "next/image";
import { SmallLoading } from "@/components/base/loading/SmallLoading";
import { ProductVariant } from "@/components/base/product-card/type";
import Link from "next/link";
import ShataLoading from "@/components/base/loading/shata-loading";
import EmptyCart from "../empty-cart";

function adaptProductVariant(variant: any): ProductVariant {
  return {
    ...variant,
    productVariantProperties:
      variant.productVariantProperties?.map((prop: any) => ({
        ...prop,
        property_value: prop.value,
        priorityIndex: 0,
      })) || [],
  };
}

function NextPurchase({ items, isPending }: CartComponentsProps) {
  const { mutate: deleteCartItem, isPending: isPendingDeleteCartItem } =
    useDeleteCartItem();

  const { mutate: addToCartTransaction, isPending: isPendingTransaction } =
    useAddToCartTransaction();
  const partner = false;

  if (isPending || isPendingDeleteCartItem || isPendingTransaction) {
    return <ShataLoading size="large" />;
  }

  if (!items || items.length === 0) {
    return (
      <div className="relative overflow-hidden ">
        {/* Main Container with Creative Layout */}
        <div className="flex flex-col lg:flex-row ">
          {/* Left Side - Visual Journey */}
          <div className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-2 md:p-8 relative">
            <div className="text-center md:space-y-8 relative z-10">
              {/* Creative Cart Visualization */}
              <div className="relative">
                <div className="w-32 h-32 mx-auto relative">
                  {/* Empty Cart with Creative Shadow */}
                  <div className="absolute inset-0 bg-gray-200 rounded-full opacity-20 transform rotate-3"></div>
                  <div className=" h-20 w-20 relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <Image
                      src="/svg/checkout/empty-cart.svg"
                      width={80}
                      height={80}
                      alt="سبد خرید"
                      className="opacity-40"
                    />
                  </div>
                </div>

                {/* Journey Points */}
                <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
              </div>

              {/* Journey Labels */}
              <div className="flex justify-between items-center text-xs text-gray-500 md:px-16">
                <span className=" text-sm md:text-xl font-bold">
                  سبد خرید شما خالی است !
                </span>
              </div>
            </div>
          </div>

          {/*EmptyCart - Content */}
          <EmptyCart />
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8">
      <div className="border w-full rounded-md">
        {/* Product List */}
        <div className="flex w-full justify-between items-center px-4 py-2">
          <h3 className="font-semibold text-sm md:text-base text-gray-800 ">
            لیست خرید بعدی شما
          </h3>
        </div>
        <div className="w-full overflow-hidden flex flex-col gap-1 px-2 md:gap-2 ">
          {items.map((item) => {
            const { finalPrice, discountText, initialPrice, colors } =
              calculateFinalPrice(
                [adaptProductVariant(item.productVariant)],
                !!partner
              );

            return (
              <div key={item.id}>
                {!isPendingTransaction ? (
                  <ProductCard
                    name={item.productVariant.product.title}
                    imageSrc={
                      item.productVariant.image
                        ? `${BASE_URL}${item.productVariant.image}`
                        : "/images/Products/default-product.webp"
                    }
                    classNameCard="md:p-4 grid border-b rounded-md md:gap-x-8 md:grid-cols-11 gap-x-2"
                    initialPrice={initialPrice}
                    price={finalPrice}
                    isPendingTransaction={isPendingTransaction}
                    discount={discountText}
                    colorName={`${
                      item?.productVariant?.color?.mainColor
                    } (${item?.productVariant?.color.subColor})`}
                    slug={String(item.productVariant.product.slug)}
                    quantity={item.quantity}
                    isPending={isPending}
                    color={colors[0]?.color}
                    subColor={colors[0]?.subColor}
                    moodCheckoutCartNext={true}
                    cardImageSize="w-24 h-24 md:w-40 md:h-40"
                    onDelete={() => deleteCartItem(String(item.id))}
                    onAddToCart={() =>
                      addToCartTransaction({
                        cartId: item.cartId,
                        id: item.id,
                        to: "main",
                      })
                    }
                  />
                ) : (
                  <SmallLoading />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* {   جزییات سفارش} */}
      <div>
        <div className="md:border p-4  gap-6 rounded-md flex flex-col ">
          <div className="flex flex-col gap-6 max-w-96 min-w-72 font-Medium text-gray-800">
            <div className="flex justify-between">
              <h3> تعداد کالا </h3>
              <h3>3 عدد </h3>
            </div>
          </div>
          <div className="w-full fixed md:static left-0 right-0 shadow-primary bg-white bottom-1 z-50 px-5 py-5 md:py-0 md:px-0 ">
            <Button className="bg-emerald-500 w-full text-white py-3 font-semibold px-6 rounded-md">
              انتقال همه به سبد خرید
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextPurchase;
