import { ProductType } from "@/components/base/product-card/type";
import { calculateFinalPrice } from "@/utils/priceUtils";
import { getThumbnailImageUrl } from "@/utils/get-thumbnail-image-url";
import { CompareProduct, APIProduct } from "../types";

/**
 * Converts ProductType (from search API) to CompareProduct format
 * Handles feature extraction from multiple possible data structures
 */
export const convertProductTypeToCompareProduct = (
  product: ProductType
): CompareProduct => {
  const priceData = calculateFinalPrice(product?.productVariants ?? [], false);

  // اگر finalPrice عدد نیست (مثلاً "ناموجود")، undefined قرار بده
  const finalPrice =
    typeof priceData.finalPrice === "number" ? priceData.finalPrice : undefined;
  const initialPrice =
    typeof priceData.initialPrice === "number" ? priceData.initialPrice : undefined;

  const compareProduct: CompareProduct = {
    id: product.id,
    title: product.title,
    price: finalPrice,
    originalPrice: initialPrice,
    discount:
      product?.productVariants?.[0]?.discount &&
      typeof product.productVariants[0].discount === "string"
        ? parseFloat(product.productVariants[0].discount)
        : undefined,
    rating: undefined, // ProductType doesn't have rating field
    imageUrl:
      getThumbnailImageUrl(product?.productImages) || "/images/placeholder.png",
    features: {},
  };

  // Extract features
  if (product.productProperties) {
    product.productProperties.forEach((prop) => {
      if (prop.title && prop.description) {
        compareProduct.features[prop.title] = prop.description;
      }
    });
  }

  return compareProduct;
};


/**
 * Converts API response to CompareProduct format
 * Ready for when real API endpoints are available
 */
export const createProductFromAPI = (
  apiProduct: APIProduct
): CompareProduct => {
  return {
    id: apiProduct.id,
    title: apiProduct.title || apiProduct.name || `Product ${apiProduct.id}`,
    price: apiProduct.price || apiProduct.finalPrice,
    originalPrice: apiProduct.originalPrice || apiProduct.regularPrice,
    discount: apiProduct.discount,
    rating: apiProduct.rating || apiProduct.averageRating,
    imageUrl:
      apiProduct.imageUrl || apiProduct.thumbnail || "/images/placeholder.png",
    features: apiProduct.features || apiProduct.specifications || {},
  };
};

/**
 * Extracts all unique feature keys from an array of products
 * Used for building the comparison table headers
 */
export const extractFeatureKeys = (products: CompareProduct[]): string[] => {
  return Array.from(
    new Set(products.flatMap((product) => Object.keys(product.features || {})))
  );
};

/**
 * Checks if a product with the given ID already exists in the comparison list
 */
export const isProductAlreadyAdded = (
  products: CompareProduct[],
  productId: number
): boolean => {
  return products.some((product) => product.id === productId);
};

/**
 * Validates if a product has the minimum required data for comparison
 */
export const isValidCompareProduct = (product: CompareProduct): boolean => {
  return !!(
    product.id &&
    product.title &&
    (product.price || product.originalPrice)
  );
};
