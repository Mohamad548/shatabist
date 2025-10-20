import clsxm from "@/utils/clsxm";
import Image from "next/image";
import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface RadioCardType {
  id: string | number;
  name?: string;
  title?: string;
  time?: string;
  price?: string;
  description?: ReactNode;
  desPrice?: string;
  selectedOption: string;
  radioRef?: (el: HTMLLabelElement | null) => void;
  register: UseFormRegisterReturn;
  descriptionLabel?: ReactNode;
  modalDescription?: ReactNode;
  imgScr?: string;
  marker?: boolean;
  classNameLabel?: string;
  classNameImage?: string;
}

const RadioCard = ({
  id,
  name,
  title,
  time,
  description,
  desPrice,
  price,
  selectedOption,
  radioRef,
  register,
  descriptionLabel = false,
  imgScr,
  marker = true,
  classNameLabel,
  classNameImage,
}: RadioCardType) => {
  const isSelected = selectedOption === id;

  return (
    <label
      key={id}
      ref={radioRef}
      className={clsxm(
        "group relative flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-all duration-200 border-2",
        isSelected
          ? "border-secondary-500 bg-secondary-50/50 shadow-md"
          : "border-gray-200 hover:border-secondary-300 hover:bg-gray-50 hover:shadow-md"
      )}
    >
      <input type="radio" value={id} {...register} className="sr-only peer" />

      {marker && (
        <div className="flex-shrink-0 mt-1">
          <div
            className={clsxm(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
              isSelected
                ? "border-emerald-500 bg-emerald-500"
                : "border-gray-300 bg-white group-hover:border-emerald-400"
            )}
          >
            {isSelected && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
          </div>
        </div>
      )}

      {imgScr && (
        <div
          className={clsxm(
            "flex-shrink-0 relative overflow-hidden rounded-lg",
            classNameImage
          )}
        >
          <Image
            src={imgScr}
        fill
    style={{ objectFit: "contain" }}
            alt="Option Icon"
            quality={100}
          />
        </div>
      )}

      <div className={clsxm("flex-1 min-w-0", classNameLabel)}>
        {name && <p className="font-semibold text-gray-800 mb-1">{name}</p>}
        {title && <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>}
        {time && <p className="font-medium text-gray-700 mb-1">{time}</p>}
        {description &&
          (typeof description === "string" ? (
            <div
              className="text-sm text-gray-600 leading-relaxed whitespace-pre-line "
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {description}
            </div>
          ))}
        {desPrice && (
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-sm font-medium text-black">
            {desPrice}
          </div>
        )}
        {price && (
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-sm font-medium text-black">
            هزینه: {Number(price).toLocaleString("fa-IR") + " تومانء"}
          </div>
        )}
      </div>

      {descriptionLabel && (
        <div className="flex-shrink-0">{descriptionLabel}</div>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 left-3 w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center">
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </label>
  );
};

export default RadioCard;
