"use client";
import RadioBox from "@/components/base/radioBox";
import IconSize from "@/constants/icon-size";
import { PageLevelLocalization } from "@/constants/localization";
import { sortingProductsPage } from "@/constants/mock-data/product";
import clsxm from "@/utils/clsxm";
import Image from "next/image";
import { useState } from "react";

type SortingProductsType = {
  classNameSorting?: string;
  classNameInputSorting?: string;
  classNameParentSorting?: string;
  productsLength: number;
};

function SortingProducts({
  classNameSorting,
  classNameInputSorting,
  classNameParentSorting,
  productsLength,
}: SortingProductsType) {
  const [selectedOption, setSelectedOption] = useState<number | null>(1);
  const { products: sortingItem } = PageLevelLocalization;

  const handleOptionChange = (id: number) => {
    setSelectedOption(id);
  };

  const getClassNameLabel = (id: number) => {
    return clsxm(
      "transition-all px-3 py-2 duration-300 ease-in-out text-sm cursor-pointer whitespace-nowrap rounded-md",
      selectedOption === id
        ? " md:bg-emerald-500 md:text-white font-Medium"
        : "font-regular text-gray-700 hover:bg-gray-50"
    );
  };

  return (
    <form
      className={clsxm(
        "w-full md:h-auto md:items-center flex justify-between rounded-md px-2 bg-white",
        classNameSorting
      )}
    >
      <div className="flex md:py-4 flex-col md:flex-row gap-2">
        {" "}
        <div className="hidden md:flex md:pr-4 items-center">
          <Image
            alt={sortingItem.sorting.name}
            src={sortingItem.sorting.src}
            width={IconSize.lg}
            height={IconSize.lg}
          />
          <h2 className="font-Medium text-sm pr-2">
            {sortingItem.sorting.name}
          </h2>
          <span className="px-4 text-gray-200">|</span>
        </div>
        {sortingProductsPage.map((sortOption) => (
          <RadioBox
            key={sortOption.id}
            id={sortOption.id}
            name={sortOption.name}
            selectedOption={selectedOption}
            onChange={handleOptionChange}
            classNameInputSorting={classNameInputSorting}
            classNameParentSorting={classNameParentSorting}
            type="radio"
            classNameCheckmark="md:hidden"
            classNameLabel={getClassNameLabel(sortOption.id)}
          />
        ))}
      </div>
      <h2 className="hidden md:block font-regular text-xs text text-gray-800 pt-2 mr-auto">
        {`${productsLength} محصول یافت شد.`}
      </h2>
    </form>
  );
}

export default SortingProducts;
