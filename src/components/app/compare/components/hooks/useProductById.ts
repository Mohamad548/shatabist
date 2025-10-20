import { useState, useEffect } from "react";
import { ProductType, ProductVariant } from "@/components/base/product-card/type";
import { fetchProductByIdAPI } from "../utils/apiHelpers";
import { mockProducts } from "../constants/mockData";

export const useProductById = (productId?: string) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setError(null);
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const apiProduct = await fetchProductByIdAPI(productId);

        if (apiProduct) {
          setProduct(apiProduct);
          return;
        }

        const foundProduct = mockProducts.find(p => p.id.toString() === productId);

        if (foundProduct) {
          const productType: ProductType = {
            id: foundProduct.id,
            title: foundProduct.title,
            short_description: foundProduct.title.substring(0, 100),
            productVariants: foundProduct.price
              ? [
                  {
                    id: 1,
                    customerPrice: foundProduct.price.toString(),
                    customerSpecialPrice:
                      foundProduct.originalPrice?.toString() || foundProduct.price.toString(),
                    discount: foundProduct.discount?.toString() || "0",
                    quantity: 10,
                    colorId: 1,
                    stockId: 1,
                    image: foundProduct.imageUrl || "",
                    installmentAvailibility: false,
                    maximumOrder: 5,
                    partnerMaximumOrder: 5,
                    partnerMinimumOrder: 1,
                    partnerPrice: foundProduct.price.toString(),
                    partnerSpecialPrice:
                      foundProduct.originalPrice?.toString() || foundProduct.price.toString(),
                    productId: foundProduct.id,
                    color: { id: 1, mainColor: "default", subColor: "default", color: "default" },
                    stock: { id: 1, name: "موجود" },
                    productVariantProperties: [],
                    isInPersonPurchase: false,
                    payOnSite: false,
                    iframe: false,
                  } as ProductVariant,
                ]
              : [],
            productImages: foundProduct.imageUrl
              ? [
                  {
                    id: 1,
                    url: foundProduct.imageUrl,
                    thumbnail: true,
                    alt: foundProduct.title,
                    productId: foundProduct.id,
                    type: "main",
                  },
                ]
              : [],
            productProperties: Object.entries(foundProduct.features || {}).map(([key, value], index) => ({
              productId: foundProduct.id,
              propertyId: index + 1,
              title: key,
              description: value,
              priority: false,
            })),
          };
          setProduct(productType);
        } else {
          setError(`Product with ID ${productId} not found`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, isLoading, error };
};
