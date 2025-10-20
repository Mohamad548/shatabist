import clsxm from "@/utils/clsxm";
import Image from "next/image";
import { localization } from "@/constants/localization";
import { InputPropsType } from "@/types/types";
import React from "react";

const Input: React.FC<InputPropsType> = ({
  label,
  iconSrc,
  inputClassName,
  iconClass,
  classNameLabel,
  parentClassName,
  id,
  register,
  nameInput,
  as,
  ...rest
}) => {
  const commonProps = {
    name: nameInput,
    id,
    className: clsxm("border border-gray-200 outline-none", inputClassName),
    ...register,
    ...rest,
  };

  return (
    <div className={clsxm("relative", parentClassName)}>
      {as === "textarea" ? (
        <textarea {...commonProps} />
      ) : (
        <input {...commonProps} />
      )}
{iconSrc && (
<Image
  src={iconSrc}
  alt={localization.search}
  fill
  sizes="(max-width: 768px) 20px, 40px" // تنظیم اندازه‌ها برای نمایش در دستگاه‌های مختلف
  className={clsxm("absolute right-2 hidden md:block", iconClass)}
/>

)}
      {label && (
        <label htmlFor={id?.toString()} className={classNameLabel}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;
