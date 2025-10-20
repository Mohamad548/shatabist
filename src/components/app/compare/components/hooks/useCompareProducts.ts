import { useState, useEffect, useCallback } from "react";
import { CompareProduct } from "../types";
import { mockProducts, MAX_PRODUCTS } from "../constants/mockData";
import {
  extractFeatureKeys,
  isProductAlreadyAdded,
  isValidCompareProduct,
} from "../utils/productConverter";

/**
 * Custom hook to manage the comparison products list
 * Handles adding, removing, and state management of compared products
 */
export const useCompareProducts = (initialProduct?: CompareProduct) => {
  const [compareProducts, setCompareProducts] = useState<CompareProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize with provided product or default mock product
  useEffect(() => {
    if (initialProduct && isValidCompareProduct(initialProduct)) {
      setCompareProducts([initialProduct]);
    } else if (compareProducts.length === 0) {
      // Always ensure we have at least one product for demo purposes
      const defaultProduct = mockProducts[0];
      if (isValidCompareProduct(defaultProduct)) {
        setCompareProducts([defaultProduct]);
      }
    }
  }, [initialProduct]);

  // Computed values
  const canAddMore = compareProducts.length < MAX_PRODUCTS;
  const allFeatureKeys = extractFeatureKeys(compareProducts);
  const excludeIds = compareProducts.map((p) => p.id);

  // Add product to comparison
  const addProduct = useCallback(
    (product: CompareProduct) => {
      if (!isValidCompareProduct(product)) {

        return false;
      }

      if (isProductAlreadyAdded(compareProducts, product.id)) {
   
        return false;
      }

      if (!canAddMore) {
      
        return false;
      }

      setCompareProducts((prev) => [...prev, product]);
      return true;
    },
    [compareProducts, canAddMore]
  );

  // Remove product from comparison
  const removeProduct = useCallback((productId: number) => {
    setCompareProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  }, []);

  // Clear all products and reset to default
  const clearAllProducts = useCallback(() => {
    const defaultProduct = mockProducts[0];
    setCompareProducts(
      isValidCompareProduct(defaultProduct) ? [defaultProduct] : []
    );
  }, []);

  // Replace all products (useful for URL-based initialization)
  const replaceProducts = useCallback((products: CompareProduct[]) => {
    const validProducts = products.filter(isValidCompareProduct);

    if (validProducts.length === 0) {
      const defaultProduct = mockProducts[0];
      setCompareProducts(
        isValidCompareProduct(defaultProduct) ? [defaultProduct] : []
      );
    } else {
      setCompareProducts(validProducts.slice(0, MAX_PRODUCTS));
    }
  }, []);

  // Modal controls
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Statistics for debugging/monitoring
  const stats = {
    productsCount: compareProducts.length,
    featuresCount: allFeatureKeys.length,
    canAddMore,
    maxProducts: MAX_PRODUCTS,
    isEmpty: compareProducts.length === 0,
    isFull: compareProducts.length >= MAX_PRODUCTS,
  };

  return {
    // State
    compareProducts,
    isModalOpen,

    // Computed values
    allFeatureKeys,
    excludeIds,
    canAddMore,
    stats,

    // Actions
    addProduct,
    removeProduct,
    clearAllProducts,
    replaceProducts,
    openModal,
    closeModal,
  };
};
