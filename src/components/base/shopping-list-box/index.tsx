"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductCard } from "../product-card";
import { useUserPurchases } from "@/components/app/profile-user/hooks";
import { BASE_URL } from "@/constants/url";
import ShataLoading from "../loading/shata-loading";

interface ProductImage {
  url: string;
}

interface Product {
  title: string;
  productImages: string;
}

interface Variant {
  [x: string]: any;
  customerPrice: string;
  discount: string;
  product: Product;
}

interface PurchaseProduct {
  id: number;
  variantId: number;
  variant: Variant;
}

interface Purchase {
  id: number;
  productPurchaseList: PurchaseProduct[];
}

function ShoppingListBox({ shoppingId }: { shoppingId: string }) {
  const router = useRouter();
  const { data, isPending } = useUserPurchases();
  const { userPurchasesList } = data || [];

  if (isPending) {
    return (
      <ShataLoading
        size="medium"
        showText={true}
        text="در حال بارگذاری لیست خرید..."
      />
    );
  }

  if (data?.userPurchasesList.length === 0) {
    return (
      <div className="text-center py-4">
        <h3 className="text-gray-500">
          هیچ محصولی به لیست علاقه مندی ها اضافه نشده.
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 border-2 rounded-2xl border-gray-100 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <Image
            src="/svg/arrow-rights.svg"
            alt="arrow-left"
            width={20}
            height={0}
            className="cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />
          <h4 className="font-Bold">جزییات لیست خرید</h4>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-5 justify-start  rounded-md">
        {data?.userPurchasesList.flatMap((purchase: Purchase) =>
          purchase?.productPurchaseList?.map((product: PurchaseProduct) => {
            const variant = product?.variant;
            const productData = variant?.product;
            return (
              <div
                key={product?.id}
                className="hover:shadow-primary p-2 border-gray-200 border flex flex-col justify-between gap-4"
              >
                <ProductCard
                  price={variant?.customerPrice}
                  name={productData?.title}
                  imageSrc={
                    variant?.image
                      ? `${BASE_URL}${variant?.image}`
                      : "/images/Products/default-product.webp"
                  }
                  panelCart={true}
                  id={product?.variantId?.toString()}
                  cardImageSize="w-40 h-40 m-4"
                  withLink={true}
                  // slug={productData?.slug}
                  // slug={product.variant.product.slug}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ShoppingListBox;
