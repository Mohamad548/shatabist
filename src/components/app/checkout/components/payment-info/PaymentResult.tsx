import React from "react";
import clsxm from "@/utils/clsxm";

interface PaymentResultProps {
  success: boolean;
  details: { label: string; value: string }[];
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
  primaryLabel: string;
  secondaryLabel?: string;
}

const iconClass =
  "flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 shadow-md animate-pop";

const PaymentResult: React.FC<PaymentResultProps> = ({
  success,
  details,
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel,
  secondaryLabel,
}) => {
  return (
    <div
      className={clsxm(
        "w-full md:w-96 flex items-center justify-center flex-col gap-6 rounded-xl shadow-lg p-4 text-center",
        success ? "border border-green-200" : "border border-red-200" ,
      )}
    >
      <div className="flex flex-col w-full">
        <div
          className={clsxm(iconClass, success ? "bg-green-100" : "bg-red-100")}
        >
          {success ? (
            <svg
              className="w-10 h-10 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12l2 2 4-4"
              />
            </svg>
          ) : (
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 9l-6 6m0-6l6 6"
              />
            </svg>
          )}
        </div>
        <h2
          className={clsxm(
            "font-bold text-sm md:text-lg mb-2",
            success ? "text-emerald-700" : "text-red-700",
          )}
        >
          {success ? "پرداخت موفق" : "پرداخت ناموفق"}
        </h2>
      </div>
      <hr className="w-full border-t border-gray-200" />
      <div className="flex flex-col gap-3 rounded-md w-full text-right text-sm">
        {details.map((item) => (
          <div className="flex justify-between mb-1" key={item.label}>
            <span className="text-gray-500">{item.label}</span>
            <span className="font-medium text-gray-800 font-Bold">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <hr className="w-full border-t border-gray-200" />
      <div className="flex gap-6 mt-4 w-full">
        <button
          type="button"
          onClick={onPrimaryAction}
          className={clsxm(
            "flex-1 py-2 rounded-md font-Bold whitespace-nowrap text-sm md:text-base",
            success
              ? "bg-emerald-500 text-white hover:bg-emerald-500/80"
              : "bg-red-500 text-white hover:bg-red-600",
          )}
        >
          {primaryLabel}
        </button>
        {secondaryLabel && onSecondaryAction && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="flex-1 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 font-Bold text-sm md:text-base whitespace-nowrap"
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;
