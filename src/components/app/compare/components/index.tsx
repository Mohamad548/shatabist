/**
 * PRODUCT COMPARISON SYSTEM - REFACTORED
 *
 * Clean, modular architecture with separated concerns:
 * ✅ Organized into focused, reusable components
 * ✅ Custom hooks for state and API management
 * ✅ Utility functions for data transformation
 * ✅ TypeScript interfaces for type safety
 * ✅ Optimized performance and maintainability
 *
 * FEATURES IMPLEMENTED:
 * ✅ Default product from single page via URL parameter (?product=ID)
 * ✅ Add/remove products functionality with 4 product limit
 * ✅ Real-time search integration using useSearchResults hook
 * ✅ Features comparison table with all product specifications
 * ✅ Responsive design for mobile and desktop
 * ✅ API-ready structure for easy backend integration
 *
 * STRUCTURE:
 * /components/ - UI components (header, grid, table, modal, etc.)
 * /hooks/ - Custom hooks (useProductById, useCompareProducts)
 * /utils/ - Helper functions (data conversion, API calls)
 * /types/ - TypeScript interfaces
 * /constants/ - Mock data and configuration
 */

"use client";
import React, { useState, useEffect } from "react";
import { CompareProps } from "./types";
import { useProductById } from "./hooks/useProductById";
import { useCompareProducts } from "./hooks/useCompareProducts";
import { convertProductTypeToCompareProduct } from "./utils/productConverter";

// Component imports
import CompareHeader from "./components/CompareHeader";
import ProductGrid from "./components/ProductGrid";
import FeaturesTable from "./components/FeaturesTable";
import ActionButtons from "./components/ActionButtons";
import HelpfulTips from "./components/HelpfulTips";
import AddProductModal from "./components/AddProductModal";

const Compare: React.FC<CompareProps> = ({ initialProductId }) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Fetch initial product if provided via URL
  const { product: initialProduct, isLoading: loadingInitialProduct } =
    useProductById(initialProductId);

  // Convert initial product to compare format when available
  const initialCompareProduct = initialProduct
    ? convertProductTypeToCompareProduct(initialProduct)
    : undefined;

  // Use comparison products hook for state management
  const {
    compareProducts,
    isModalOpen,
    allFeatureKeys,
    excludeIds,
    canAddMore,
    stats,
    addProduct,
    removeProduct,
    clearAllProducts,
    openModal,
    closeModal,
  } = useCompareProducts(initialCompareProduct);

  // Initialize with fetched product when ready
  useEffect(() => {
    if (initialCompareProduct && !loadingInitialProduct) {
      // The hook will handle initialization automatically
    }
  }, [initialCompareProduct, loadingInitialProduct]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-bounce"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <CompareHeader
          productsCount={stats.productsCount}
          maxProducts={stats.maxProducts}
        />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Products Grid Section */}
          <ProductGrid
            products={compareProducts}
            onRemoveProduct={removeProduct}
            onAddProductClick={openModal}
            canAddMore={canAddMore}
            maxProducts={stats.maxProducts}
            hoveredProduct={hoveredProduct}
            setHoveredProduct={setHoveredProduct}
          />

          {/* Features Comparison Section */}
          <FeaturesTable
            products={compareProducts}
            featureKeys={allFeatureKeys}
            canAddMore={canAddMore}
          />

          {/* Action Buttons */}
          <ActionButtons
            products={compareProducts}
            onClearAll={clearAllProducts}
          />

          {/* Helpful Tips Section */}
          <HelpfulTips />
        </div>

        {/* Add Product Modal */}
        <AddProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddProduct={addProduct}
          excludeIds={excludeIds}
        />
      </div>
    </div>
  );
};

export default Compare;
