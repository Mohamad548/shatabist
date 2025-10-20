import { ProductType } from "@/components/base/product-card/type";

/**
 * Fetches a product by ID from the API
 * TODO: Replace with real API endpoint when backend is ready
 */
export const fetchProductByIdAPI = async (
  productId: string
): Promise<ProductType | null> => {
  try {
    // TODO: Uncomment when real API is ready
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}`
    // );
    // if (!response.ok) throw new Error('Product not found');
    // const productData = await response.json();
    // return productData;

    // Mock implementation for now
    // console.log(`[Mock] Fetching product with ID: ${productId}`);
    return null;
  } catch (error) {
    // console.error("Error fetching product:", error);
    return null;
  }
};

/**
 * Builds the compare URL with product parameter
 */
export const buildCompareUrl = (productId?: number): string => {
  const baseUrl = "/compare";
  return productId ? `${baseUrl}?product=${productId}` : baseUrl;
};

/**
 * Extracts product ID from URL search params
 */
export const extractProductIdFromParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}): string | undefined => {
  const productParam = searchParams.product;

  if (!productParam) return undefined;

  return Array.isArray(productParam) ? productParam[0] : productParam;
};

/**
 * Validates environment setup for API integration
 */
export const validateAPISetup = (): boolean => {
  if (typeof window === "undefined") return true; // SSR

  const hasApiUrl = !!process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!hasApiUrl) {
    console.warn(
      "NEXT_PUBLIC_API_BASE_URL not found. Using mock data. Set this environment variable when APIs are ready."
    );
  }

  return hasApiUrl;
};

/**
 * Rate limiting helper for API calls
 */
export const createRateLimiter = (maxCalls: number, timeWindow: number) => {
  const calls: number[] = [];

  return {
    canMakeCall: (): boolean => {
      const now = Date.now();
      const windowStart = now - timeWindow;

      // Remove old calls outside the time window
      while (calls.length > 0 && calls[0] < windowStart) {
        calls.shift();
      }

      return calls.length < maxCalls;
    },
    recordCall: (): void => {
      calls.push(Date.now());
    },
  };
};
