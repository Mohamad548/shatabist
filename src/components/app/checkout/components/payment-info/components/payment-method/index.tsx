import clsxm from "@/utils/clsxm";
import React from "react";
import RadioCard from "../../../shipping-info/components/base/radio-card";
import { useFormContext } from "react-hook-form";
interface PaymentMethodType {
  radioRefs: React.MutableRefObject<Record<string, HTMLLabelElement | null>>;
}

function PaymentMethod({ radioRefs }: PaymentMethodType) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const formData = watch();
  const options1 = [
    {
      id: "8",
      title: "درگاه سامان",
      imgScr: "/images/saman.jpeg",
      description: "پرداخت پیش پرداخت و مشخص سازی اقساط",
    },
    {
      id: "9",
      title: "درگاه زیبال",
      imgScr: "/images/zipal.webp",
      description: "پرداخت پیش پرداخت و مشخص سازی اقساط",
    },
  ];
  return (
    <div
      className={clsxm(
        "border flex flex-col  gap-4 rounded-md py-4 px-3",
        errors.selectedGateway ? "border-red-400" : "border-gray-300",
      )}
    >
      <h3 className="font-semibold text-sm text-gary-800">
        انتخاب درگاه پرداخت:
      </h3>
      <div className="flex flex-col  justify-start flex-wrap gap-2 ">
        {options1.map((option) => (
          <RadioCard
            key={option.id}
            id={option.id}
            title={option.title}
            imgScr={option.imgScr}
            description={option.description}
            selectedOption={formData.selectedGateway}
            radioRef={(el) => {
              radioRefs.current[option.id] = el;
            }}
            register={register("selectedGateway", {
              required: "لطفاً یکی از درگاه های پرداخت را انتخاب کنید.",
            })}
            classNameLabel=""
            classNameImage="h-16 w-16 rounded-md"
          />
        ))}
      </div>
      {errors.selectedGateway && // تغییر به shippingId
        typeof errors.selectedGateway.message === "string" && ( // تغییر به shippingId
          <p className="text-red-500 text-sm pt-2">
            {errors.selectedGateway.message} {/* تغییر به shippingId */}
          </p>
        )}
    </div>
  );
}

export default PaymentMethod;
