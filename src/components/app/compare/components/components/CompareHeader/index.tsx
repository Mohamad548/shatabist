import React from "react";
import { CompareHeaderProps } from "../../types";

/**
 * Header component for the comparison page
 * Features animated background and product count indicator
 */
const CompareHeader: React.FC<CompareHeaderProps> = ({
  productsCount,
  maxProducts,
}) => {
  return (
    <div className="relative bg-gradient-to-r from-white via-blue-50/50 to-white backdrop-blur-sm border-b border-blue-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600  p-3 rounded-xl">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-500 to-green-700 bg-clip-text text-transparent">
                مقایسه محصولات
              </h1>
              <p className="text-gray-600 mt-1">بهترین انتخاب را انجام دهید</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                {productsCount} از {maxProducts} محصول
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareHeader;
