import React from "react";
import Button from "@/components/base/button";
import { ActionButtonsProps } from "../../types";

/**
 * Action buttons for the comparison page
 * Includes purchase and clear all buttons
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  products,
  onClearAll,
}) => {
  return (
    <div className="relative mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
      {/* Primary Action Button */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
        <Button className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-10 py-4 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-xl font-bold text-lg">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            مشاهده و خرید محصولات
          </div>
        </Button>
      </div> 
      {/* Clear All Button - Only show when there are multiple products */}
      {products.length > 1 && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <Button
            onClick={onClearAll}
            className="relative bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5"
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
              پاک کردن همه
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
