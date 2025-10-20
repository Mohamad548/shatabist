import React from "react";
import Image from "next/image";
import { ProductGridProps } from "../../types";

/**
 * Product grid component that displays compared products
 * Handles both desktop and mobile layouts
 */
const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onRemoveProduct,
  onAddProductClick,
  canAddMore,
  maxProducts,
  hoveredProduct,
  setHoveredProduct,
}) => {
  return (
    <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
      {/* Section Header */}
      <div className="relative p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h2 className="text-lg font-semibold text-gray-800">
              محصولات در حال مقایسه
            </h2>
          </div>
          {products.length > 1 && (
            <button
              onClick={() => {
                // Clear all products except the first one
                products
                  .slice(1)
                  .forEach((product) => onRemoveProduct(product.id));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              پاک کردن دیگر محصولات
            </button>
          )}
        </div>
      </div>

      {/* Desktop View - Table Layout for Perfect Alignment */}
      <div className="relative hidden md:block overflow-x-auto">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              هیچ محصولی برای مقایسه انتخاب نشده
            </h3>
            <p className="text-gray-500 mb-6">
              برای شروع مقایسه، محصولی را اضافه کنید
            </p>
            <button
              onClick={onAddProductClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              افزودن محصول
            </button>
          </div>
        ) : (
          <table className="w-full h-full min-h-[400px]">
            <tbody>
              <tr className="h-full">
                {/* Products Section Header - Enhanced Design */}
                <td className="sticky right-0 bg-gradient-to-br from-blue-50 via-green-50 to-indigo-50 px-4 py-3 w-[200px] min-w-[200px] border-r border-gray-200">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex flex-col items-center gap-2">
                      {/* Icon with modern styling */}
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>

                      {/* Title with better typography */}
                      <div className="text-center">
                        <h3 className="font-bold text-gray-800 text-sm leading-tight">
                          محصولات در مقایسه
                        </h3>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span className="text-xs text-gray-500 font-medium">
                            انتخاب شده
                          </span>
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Product Cards */}
                {products.map((product, index) => (
                  <td
                    key={product.id}
                    className="px-4 py-4 border-l border-gray-200 min-w-[200px] w-[200px] last:border-l-0 h-full align-top"
                  >
                    <div
                      className="relative group h-full"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveProduct(product.id)}
                        className="absolute top-2 right-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-200 z-20 opacity-70 hover:opacity-100"
                      >
                        <svg
                          className="w-3.5 h-3.5"
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

                      {/* Product Card */}
                      <div
                        className={`relative bg-white rounded-xl p-4 h-full border transition-all duration-200 ${
                          hoveredProduct === product.id
                            ? "border-blue-200 shadow-lg"
                            : "border-gray-100 shadow-sm hover:shadow-md"
                        }`}
                      >
                        {/* Product Badge */}
                        <div className="absolute top-2 left-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>

                        <div className="pt-6">
                          <div className="aspect-square w-40 h-30 relative mb-3 bg-gray-50 rounded-lg overflow-hidden">
                            <Image
                              src={
                                product.imageUrl || "/images/placeholder.png"
                              }
                              alt={product.title}
                              fill
                              className="object-contain p-3"
                            />
                          </div>

                          <h3 className="font-semibold text-sm mb-3 leading-5 text-gray-800 overflow-hidden line-clamp-2 text-center">
                            {product.title}
                          </h3>

                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-lg font-bold text-gray-900">
                                {product.price?.toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-500">
                                تومان
                              </span>
                            </div>

                            {product.originalPrice && product.discount && (
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-xs text-gray-400 line-through">
                                  {product.originalPrice.toLocaleString()}
                                </span>
                                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                                  %{product.discount}
                                </span>
                              </div>
                            )}

                            {product.rating && (
                              <div className="flex items-center justify-center gap-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(product.rating!)
                                          ? "text-yellow-400"
                                          : "text-gray-200"
                                      }`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-xs font-medium text-gray-600">
                                  {product.rating}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                ))}

                {/* Add Product Box - Only show when there are products */}
                {canAddMore && products.length > 0 && (
                  <td className="px-4 py-4 min-w-[200px] w-[200px] h-full align-top">
                    <div
                      onClick={onAddProductClick}
                      className="relative group cursor-pointer h-full"
                    >
                      <div className="h-full border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/30">
                        <div className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition-colors duration-200 mb-3">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>

                        <h3 className="text-sm font-semibold text-gray-700 mb-1">
                          افزودن محصول
                        </h3>
                        <p className="text-xs text-gray-500 text-center leading-relaxed">
                          برای مقایسه کلیک کنید
                        </p>
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile View */}
      <div className="relative md:hidden p-4">
        <div className="space-y-4">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
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
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-700 mb-1">
                هیچ محصولی انتخاب نشده
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                برای شروع مقایسه، محصولی اضافه کنید
              </p>
              <button
                onClick={onAddProductClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                افزودن محصول
              </button>
            </div>
          ) : (
            products.map((product, index) => (
              <div
                key={product.id}
                className="relative bg-white border border-gray-100 rounded-lg p-3 shadow-sm"
              >
                {/* Remove Button */}
                <button
                  onClick={() => onRemoveProduct(product.id)}
                  className="absolute top-2 right-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full w-5 h-5 flex items-center justify-center transition-colors duration-200 z-10"
                >
                  <svg
                    className="w-3 h-3"
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

                {/* Product Badge */}
                <div className="absolute top-2 left-2 bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-xs font-medium">
                  #{index + 1}
                </div>

                <div className="flex gap-3 mt-5">
                  <div className="w-16 h-16 relative bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.imageUrl || "/images/placeholder.png"}
                      alt={product.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-2 leading-4 text-gray-800 overflow-hidden line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="text-base font-bold text-gray-900">
                          {product.price?.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">تومان</span>
                      </div>

                      {product.originalPrice && product.discount && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 line-through">
                            {product.originalPrice.toLocaleString()}
                          </span>
                          <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded font-medium">
                            %{product.discount}
                          </span>
                        </div>
                      )}

                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-2.5 h-2.5 ${
                                  i < Math.floor(product.rating!)
                                    ? "text-yellow-400"
                                    : "text-gray-200"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs font-medium text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Add Product Box Mobile - Only show when there are products */}
          {canAddMore && products.length > 0 && (
            <div
              onClick={onAddProductClick}
              className="relative cursor-pointer"
            >
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/30">
                <div className="bg-blue-100 hover:bg-blue-200 p-2.5 rounded-full transition-colors duration-200 mb-2">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>

                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  افزودن محصول
                </h3>
                <p className="text-xs text-gray-500 text-center">
                  برای مقایسه کلیک کنید
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
