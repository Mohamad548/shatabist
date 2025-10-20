"use client";
import Button from "@/components/base/button";
import { ProductType } from "@/components/base/product-card/type";
import { PageLevelLocalization } from "@/constants/localization";
import { useEffect, useState } from "react";
import FilterBody from "../filter-body";
import Image from "next/image";
import IconSize from "@/constants/icon-size";
import SortingProducts from "@/components/app/products/components/body-products/sorting-products";

interface FilterMobileProps {
  products?: ProductType[];
  selectedFilters: { [propertyId: number]: string[] };
  onFilterChange: (propertyId: number, value: string, checked: boolean) => void;
}

const FilterMobile = ({
  products = [],
  selectedFilters,
  onFilterChange,
}: FilterMobileProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSortingOpen, setIsSortingOpen] = useState<boolean>(false);
  const { products: ItemsFilterAndSort } = PageLevelLocalization;

  const activeFilterCount = Object.values(selectedFilters || {}).reduce(
    (acc, values) => acc + (Array.isArray(values) ? values.length : 0),
    0
  );

  const handleClearFilters = () => {
    Object.entries(selectedFilters || {}).forEach(([propertyId, values]) => {
      if (Array.isArray(values)) {
        values.forEach((value) =>
          onFilterChange(Number(propertyId), value, false)
        );
      }
    });
  };

  useEffect(() => {
    if (isOpen || isSortingOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, isSortingOpen]);

  return (
    <>
      <section className="flex w-full justify-between md:hidden p-2 bg-gray-50">
        <Button
          onClick={() => setIsOpen(true)}
          aria-label="باز کردن فیلترها"
          aria-expanded={isOpen}
          className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-emerald-50 text-emerald-700 shadow-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-[0.99] transition"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            focusable="false"
          >
            <path d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 .53 1.28l-6.03 6.03v5.44a.75.75 0 0 1-1.06.67l-3-1.5a.75.75 0 0 1-.42-.67v-3.94L3.22 5.78A.75.75 0 0 1 3 5.25z" />
          </svg>
          <span className="font-Medium text-xs">فیلتر</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold h-5 px-1.5">
              {activeFilterCount}
            </span>
          )}
        </Button>
        <Button
          onClick={() => setIsSortingOpen(true)}
          aria-label="باز کردن مرتب‌سازی"
          aria-expanded={isSortingOpen}
          className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-emerald-50 text-emerald-700 shadow-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-[0.99] transition"
        >
          <Image
            alt={ItemsFilterAndSort.sorting.name}
            src={ItemsFilterAndSort.sorting.src}
            width={IconSize.lg}
            height={IconSize.lg}
          />
          <h3 className="font-Medium text-xs text-gray-800 ">
            {ItemsFilterAndSort.sorting.name}
          </h3>
        </Button>
        {isSortingOpen && (
          <div className="fixed inset-0 z-50 bg-white animate-openCircle">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-secondary-500" />
            <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
              <h3 className="font-Medium text-gray-900">
                {ItemsFilterAndSort.sorting.name}
              </h3>
              <Button
                onClick={() => setIsSortingOpen(false)}
                aria-label="بستن مرتب‌سازی"
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
            <div className="h-[calc(100vh-64px-64px)] overflow-y-auto">
              <SortingProducts
                classNameSorting="w-full flex flex-col gap-2 p-4"
                classNameInputSorting="sr-only"
                classNameParentSorting="items-center gap-3"
                productsLength={0}
              />
            </div>
            <div className="sticky bottom-0 inset-x-0 p-4 bg-white border-t">
              <Button
                onClick={() => setIsSortingOpen(false)}
                className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-primary focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                اعمال مرتب‌سازی
              </Button>
            </div>
          </div>
        )}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-white animate-slideUp">
            <div className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />
            <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <h3 className="font-Medium text-gray-900">فیلتر</h3>
                {activeFilterCount > 0 && (
                  <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
                    {activeFilterCount} فیلتر فعال
                  </span>
                )}
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                aria-label="بستن فیلترها"
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
            <div className="h-[calc(100vh-64px-64px)] overflow-y-auto">
              <FilterBody
                products={products}
                selectedFilters={selectedFilters}
                onFilterChange={onFilterChange}
              />
            </div>
            <div className="sticky bottom-0 inset-x-0 p-4 bg-white border-t">
              <div className="flex gap-3">
                <Button
                  onClick={handleClearFilters}
                  disabled={activeFilterCount === 0}
                  className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  حذف فیلترها
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-primary focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  اعمال فیلتر
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default FilterMobile;
