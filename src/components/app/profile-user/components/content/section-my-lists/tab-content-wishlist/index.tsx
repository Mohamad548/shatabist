'use client';
import React from 'react';
import { ProductCard } from '@/components/base/product-card';
import {
  useAddToFavorites,
  useUserFavorite,
} from '@/components/app/profile-user/hooks';
import { BASE_URL } from '@/constants/url';
import ShataLoading from '@/components/base/loading/shata-loading';

interface FavoriteProduct {
  id: number;
  variantId: number;
  variant: {
    customerPrice: number;
    image: string;
    product: {
      title: string;
      slug: string;
    };
  };
}

const TabContentWishlist: React.FC = () => {
  const { data, isPending } = useUserFavorite();

  if (isPending) {
    return (
      <ShataLoading
        size="medium"
        showText={true}
        text="در حال بارگذاری لیست علاقه مندی ها..."
      />
    );
  }

  if (data?.userFavorites.length === 0) {
    return (
      <div className="text-center py-4">
        <h3 className="text-gray-500">
          هیچ محصولی به لیست علاقه مندی ها اضافه نشده.
        </h3>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-5 justify-start  rounded-md">
      {data?.userFavorites.map((product: FavoriteProduct) => {
        const variant = product.variant;
        const productData = variant.product;
        return (
          <div key={product.id} className="hover:shadow-primary p-2 border-gray-200 border flex flex-col justify-between gap-4">
            <ProductCard
              price={variant.customerPrice.toString()}
              name={productData.title}
              imageSrc={
                variant?.image
                  ? `${BASE_URL}${variant.image}`
                  : '/images/Products/default-product.webp'
              }
              panelCart={true}
              id={product.variantId.toString()}
              cardImageSize="w-40 h-40 m-4"
              withLink={true}
              slug={product.variant.product.slug}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TabContentWishlist;
