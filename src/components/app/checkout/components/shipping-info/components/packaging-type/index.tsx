import { DescriptionModal } from "@/components/app/profile-user/components/base/profile-modals";
import { useGetPackaging } from "@/components/app/profile-user/hooks";
import ManageModal from "@/components/base/modal";
import Switch from "@/components/base/switch";
import { useCartStore } from "@/stores/useCartStore";
import clsxm from "@/utils/clsxm";
import Image from "next/image";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import RadioCard from "../base/radio-card";

interface WrappingType {
  id: number;
  name: string;
  cost: number;
}

interface PackagingTypeProps {
  radioRefs: React.MutableRefObject<Record<string, HTMLLabelElement | null>>;
  setIsSwitchChecked: React.Dispatch<React.SetStateAction<boolean>>;
  isSwitchChecked?: boolean;
}

function PackagingType({
  radioRefs,
  setIsSwitchChecked,
  isSwitchChecked,
}: PackagingTypeProps) {
  const { data } = useGetPackaging();
  const { wrappings } = data || {};
  const {
    watch,
    setValue,
    formState: { errors },
    register,
  } = useFormContext();

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchChecked((prev: boolean) => !prev);
    if (!checked) {
      setValue("wrappingPaper", false);
      setValue("kartPastal", false);
    }
  };

  const packagingType = watch("packagingType");
  const wrappingPaper = watch("wrappingPaper");
  const kartPastal = watch("kartPastal");

  const options2 = [
    {
      id: "6",
      title: "اقتصادی",
      desPrice: "هزینه : 15,000 تومانء",
      price: 15000,
    },
    {
      id: "7",
      title: "ایمن",
      desPrice: "هزینه : 30,000 تومانء",
      price: 30000,
      descriptionLabel: true,
    },
    {
      id: "8",
      title: "بدون بسته بندی",
      desPrice: "رایگان",
      // price: 200000,
      // descriptionLabel: true,
    },
  ];

  const options3 = [
    {
      id: "8",
      imgScr: "/Cod1.jpg",
    },
    {
      id: "9",
      imgScr: "/Cod1.jpg",
    },
    {
      id: "10",
      imgScr: "/Cod1.jpg",
    },
    {
      id: "11",
      imgScr: "/Cod1.jpg",
    },
  ];

  const options4 = [
    {
      id: "12",
      imgScr: "/Cod2.jpg",
    },
    {
      id: "13",
      imgScr: "/Cod2.jpg",
    },
    {
      id: "14",
      imgScr: "/Cod2.jpg",
    },
    {
      id: "15",
      imgScr: "/Cod2.jpg",
    },
  ];

  const watchedPackagingType = useWatch({ name: "packagingType" });
  const watchedWrappingPaper = useWatch({ name: "wrappingPaper" });

  const setPackagingCost = useCartStore((state) => state.setPackagingCost);
  const setGiftWrapCost = useCartStore((state) => state.setGiftWrapCost);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = e.target.value;
    const selectedPackagingOption = options2.find(
      (item) => item.id.toString() === selectedId
    );
    const cost = selectedPackagingOption?.price || 0;
    setPackagingCost(cost);
  };

  useEffect(() => {
    if (!watchedPackagingType) {
      setPackagingCost(0);
    }
  }, [watchedPackagingType, setPackagingCost]);

  const handleWrapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = e.target.value;
    const selectedWrappingOption = wrappings.find(
      (item: WrappingType) => item.id.toString() === selectedId
    );
    const cost = selectedWrappingOption?.cost || 0;
    setGiftWrapCost(cost);
  };

  useEffect(() => {
    if (!watchedWrappingPaper) {
      setGiftWrapCost(0);
    }
  }, [watchedWrappingPaper, setGiftWrapCost]);

  return (
    <div className="space-y-6">
      {/* Main Packaging Section */}
      <div
        className={clsxm(
          "bg-white rounded-xl border-2 transition-all duration-200 p-6",
          Object.keys(errors).includes("packagingType")
            ? "border-red-200 bg-red-50/30"
            : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
        )}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex justify-center items-center w-6 h-6  bg-green-600 rounded-full text-white text-sm font-black">
            3
          </div>
          <h3 className="font-bold text-lg text-gray-900">نوع بسته‌بندی</h3>
        </div>

        <div className="space-y-3">
          {options2.map((option) => (
            <RadioCard
              key={option.id}
              id={option.id}
              title={option.title}
              desPrice={option.desPrice}
              selectedOption={packagingType}
              radioRef={(el) => (radioRefs.current[option.id] = el)}
              register={register("packagingType", {
                required: "لطفاً نوع بسته‌بندی را انتخاب کنید.",
                onChange: handleChange,
              })}
              descriptionLabel={option.descriptionLabel || false}
              modalDescription={
                <ManageModal
                  triggerContent={
                    <div className="relative h-5 w-5 opacity-60 hover:opacity-100 transition-opacity">
                      <Image
                        src="/svg/info-circle-green.svg"
                  fill
    style={{ objectFit: "contain" }}
                        alt="Information"
                        quality={100}
                      />
                    </div>
                  }
                  className="fixed inset-0 z-50"
                >
                  d
                </ManageModal>
              }
            />
          ))}
        </div>

        {errors.packagingType &&
          typeof errors.packagingType.message === "string" && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">
                {errors.packagingType.message}
              </p>
            </div>
          )}
      </div>

      {/* Gift Wrapping Section */}
    </div>
  );
}

export default PackagingType;
