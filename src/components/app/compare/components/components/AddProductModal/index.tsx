import React, { useState, useRef, useEffect } from "react";
import ManageModal from "@/components/base/modal";
import { ProductType } from "@/components/base/product-card/type";
import { ProductCard } from "@/components/base/product-card";
import { useSearchResults } from "@/components/app/search-box/hooks";
import { convertProductTypeToCompareProduct } from "../../utils/productConverter";
import { AddProductModalProps } from "../../types";
import { getThumbnailImageUrl } from "@/utils/get-thumbnail-image-url";
import { calculateFinalPrice } from "@/utils/priceUtils";

/**
 * Modal component for adding new products to comparison
 * Features real-time search integration with product selection
 */
const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  excludeIds,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef<any>(null);

  // Use the real search hook for API integration
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchResults(searchQuery);

  // Filter out products that are already in comparison
const results: any = searchResults;
const availableProducts: ProductType[] =
  results?.products?.filter(
    (product: ProductType) => !excludeIds.includes(product.id)
  ) || [];

  const handleProductSelect = (product: ProductType) => {
    // Use the helper function to convert ProductType to CompareProduct
    const compareProduct = convertProductTypeToCompareProduct(product);

    onAddProduct(compareProduct);
    onClose();
    setSearchQuery("");
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.openModal();
    } else {
      modalRef.current?.closeModal();
      setSearchQuery(""); // Clear search when modal closes
    }
  }, [isOpen]);

  // Search state conditions
  const hasMinimumChars = searchQuery.length >= 3;
  const isEmptySearch = searchQuery.length === 0;
  const hasNoResults =
    hasMinimumChars && !isSearchLoading && availableProducts.length === 0;
  const hasResults = hasMinimumChars && availableProducts.length > 0;

  return (
    <ManageModal
      ref={modalRef}
      className="fixed inset-0 z-50"
      modalBodyClass="w-[90%] md:w-[85%] lg:w-[80%] max-w-4xl h-[80vh] md:h-[75vh] max-h-[600px] bg-white rounded-xl shadow-lg overflow-y-auto"
      activeOverlay={true}
      onClose={onClose}
      triggerContent={<div />}
    >
      <div className="flex flex-col h-full">
        {/* Modal Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  افزودن محصول جدید
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  محصول مورد نظر خود را جستجو و انتخاب کنید
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex-shrink-0 p-4 bg-gray-50 border-b border-gray-100">
          <div className="relative">
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="نام محصول مورد نظر خود را وارد کنید..."
              className="w-full pr-10 pl-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors duration-200"
              autoFocus
            />
            {isSearchLoading && (
              <div className="absolute inset-y-0 left-3 flex items-center">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Search Guide */}
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <svg
              className="w-3 h-3 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>برای جستجو حداقل ۳ کاراکتر وارد کنید</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Empty Search State */}
          {isEmptySearch && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                شروع جستجو
              </h3>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                نام محصولی که می‌خواهید به مقایسه اضافه کنید را در کادر بالا
                تایپ کنید
              </p>
            </div>
          )}

          {/* Minimum Characters Warning */}
          {searchQuery.length > 0 && searchQuery.length < 3 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                تکمیل جستجو
              </h3>
              <p className="text-gray-500 text-sm">
                لطفاً حداقل ۳ کاراکتر وارد کنید تا جستجو آغاز شود
              </p>
            </div>
          )}

          {/* Loading State */}
          {isSearchLoading && hasMinimumChars && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                در حال جستجو...
              </h3>
              <p className="text-gray-500 text-sm">
                لطفاً صبر کنید، محصولات در حال بارگذاری هستند
              </p>
            </div>
          )}

          {/* Error State */}
          {searchError && hasMinimumChars && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                خطا در جستجو
              </h3>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                متأسفانه در حال حاضر امکان جستجو وجود ندارد. لطفاً دوباره تلاش
                کنید
              </p>
            </div>
          )}

          {/* No Results State */}
          {hasNoResults && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                محصولی یافت نشد
              </h3>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                برای عبارت "{searchQuery}" محصولی یافت نشد. لطفاً با کلمات دیگری
                جستجو کنید
              </p>
            </div>
          )}

          {/* Results Grid */}
          {hasResults && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h3 className="text-base font-semibold text-gray-800">
                    نتایج جستجو
                  </h3>
                  <div className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    {availableProducts.length} محصول
                  </div>
                </div>
              </div>

              {/* Products Grid - Same layout as main products page */}
              <div className="md:grid md:grid-cols-4 overflow-hidden gap-3">
                {availableProducts.map((product) => {
                  const partner = false;
                  const { finalPrice, discountText, initialPrice } =
                    calculateFinalPrice(
                      product?.productVariants ?? [],
                      !!partner
                    );
                  const imageUrl = getThumbnailImageUrl(product?.productImages);

                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="cursor-pointer hover:bg-blue-50 transition-colors duration-200 rounded-lg"
                    >
                      <ProductCard
                        initialPrice={initialPrice}
                        imageSrc={
                          imageUrl || "/images/Products/default-product.webp"
                        }
                        price={finalPrice}
                        discount={discountText}
                        name={product.title}
                        slug={product.slug}
                        withLink={false}
                        description={product.short_description}
                        classNameCard="p-3 flex flex-col gap-2 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:shadow-md transition-all duration-200 bg-white"
                        cardImageSize="w-full h-32 sm:h-36"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </ManageModal>
  );
};

export default AddProductModal;
