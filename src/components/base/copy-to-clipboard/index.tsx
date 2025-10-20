"use client";

import React, { useState } from "react";
import clsxm from "@/utils/clsxm";

interface CopyToClipboardProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "outlined";
  showLabel?: boolean;
  customLabel?: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  text,
  className,
  size = "md",
  variant = "default",
  showLabel = false,
  customLabel = "کپی",
}) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const buttonSizeClasses = {
    sm: "p-1",
    md: "p-1.5",
    lg: "p-2",
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "minimal":
        return "text-gray-400 hover:text-emerald-500 hover:bg-gray-50";
      case "outlined":
        return "text-gray-500 hover:text-emerald-500 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50";
      default:
        return "text-gray-400 hover:text-emerald-500 bg-gray-50 hover:bg-emerald-50";
    }
  };

  const CopyIcon = () => (
    <svg
      className={clsxm(
        sizeClasses[size],
        copied ? "text-green-500" : "transition-colors duration-200"
      )}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {copied ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      )}
    </svg>
  );

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsxm(
          "relative inline-flex items-center justify-center rounded-lg transition-all duration-200 group ",
          buttonSizeClasses[size],
          getVariantClasses(),
          copied && "text-green-500 bg-green-50 border-green-200",
          className
        )}
        title={copied ? "کپی شد!" : "کپی کردن"}
        aria-label={copied ? "کپی شد!" : "کپی کردن"}
      >
        {showLabel && (
          <span
            className={clsxm(
              "ml-2 text-xs font-medium transition-colors duration-200 ",
              copied ? "text-green-600" : "text-gray-600"
            )}
          >
            {copied ? "کپی شد!" : customLabel}
          </span>
        )}
        <CopyIcon />
      </button>

      {/* Tooltip */}
      {(isHovered || copied) && (
        <div
          className={clsxm(
            "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white rounded-lg shadow-lg transition-all duration-200 z-60 whitespace-nowrap ",
            copied ? "bg-green-600" : "bg-gray-800"
          )}
        >
          {copied ? "کپی شد!" : "کپی کردن"}
          <div
            className={clsxm(
              "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent",
              copied ? "border-t-green-500" : "border-t-gray-800"
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CopyToClipboard;
