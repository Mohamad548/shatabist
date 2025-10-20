import React from "react";
import { FeaturesTableProps } from "../../types";

/**
 * Features comparison table component
 * Displays product features in both desktop table and mobile card layouts
 */
const FeaturesTable: React.FC<FeaturesTableProps> = ({
  products,
  featureKeys,
  canAddMore,
}) => {
  if (featureKeys.length === 0) {
    return (
      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-700">
            مشخصات فنی در دسترس نیست
          </h3>
          <p className="text-gray-500">
            برای مشاهده مقایسه مشخصات، محصولات بیشتری اضافه کنید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30"></div>

      {/* Section Header */}
      <div className="relative p-6 border-b border-gray-100/50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse"></div>
          <h2 className="text-xl font-bold text-gray-800">مقایسه مشخصات فنی</h2>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {featureKeys.length} ویژگی
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="relative hidden md:block overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
            <tr>
              <th className="sticky right-0 bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-4 text-right font-bold text-gray-800 border-l border-gray-200 min-w-[200px]">
                مشخصات
              </th>
              {products.map((product, index) => (
                <th
                  key={product.id}
                  className="px-4 py-4 text-center font-bold text-gray-800 border-l border-gray-200 min-w-[200px] last:border-l-0"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span
                      className="truncate max-w-[150px]"
                      title={product.title}
                    >
                      {product.title.length > 30
                        ? `${product.title.substring(0, 30)}...`
                        : product.title}
                    </span>
                  </div>
                </th>
              ))}
              {canAddMore && (
                <th className="px-4 py-4 text-center font-bold text-gray-400 min-w-[200px]">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-gray-400"
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
                    <span>محصول بعدی</span>
                  </div>
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {featureKeys.map((featureKey, index) => (
              <tr
                key={featureKey}
                className={`border-b border-gray-100 transition-colors hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/30 ${
                  index % 2 === 0 ? "bg-white/60" : "bg-gray-50/40"
                }`}
              >
                <td className="sticky right-0 bg-inherit px-6 py-4 font-semibold text-gray-700 border-l border-gray-200 bg-gradient-to-r from-emerald-100 to-teal-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    {featureKey}
                  </div>
                </td>
                {products.map((product) => (
                  <td
                    key={`${product.id}-${featureKey}`}
                    className="px-4 py-4 text-center text-gray-600 border-l border-gray-200 last:border-l-0"
                  >
                    <div className="max-w-[180px] mx-auto">
                      {product.features[featureKey] ? (
                        <span
                          className="block leading-relaxed"
                          title={product.features[featureKey]}
                        >
                          {product.features[featureKey].length > 50
                            ? `${product.features[featureKey].substring(0, 50)}...`
                            : product.features[featureKey]}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">—</span>
                      )}
                    </div>
                  </td>
                ))}
                {canAddMore && (
                  <td className="px-4 py-4 text-center text-gray-400">
                    <span className="italic">—</span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="relative md:hidden p-4">
        <div className="space-y-6">
          {featureKeys.map((featureKey, featureIndex) => (
            <div
              key={featureKey}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
            >
              {/* Feature Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                  <h3 className="font-semibold text-gray-800">{featureKey}</h3>
                </div>
              </div>

              {/* Products Comparison for this Feature */}
              <div className="p-4 space-y-3">
                {products.map((product, productIndex) => (
                  <div
                    key={product.id}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                      productIndex % 2 === 0 ? "bg-gray-50/60" : "bg-white/80"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <span className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {productIndex + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 text-sm truncate mb-1">
                        {product.title.length > 40
                          ? `${product.title.substring(0, 40)}...`
                          : product.title}
                      </h4>
                      <div className="text-gray-600 text-sm leading-relaxed">
                        {product.features[featureKey] ? (
                          product.features[featureKey]
                        ) : (
                          <span className="text-gray-400 italic">
                            اطلاعات موجود نیست
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="relative bg-gradient-to-r from-blue-50/50 to-purple-50/30 border-t border-gray-100/50 p-4">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <span>{products.length} محصول مقایسه شده</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
            <span>{featureKeys.length} ویژگی بررسی شده</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesTable;
