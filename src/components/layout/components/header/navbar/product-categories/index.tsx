"use client";
import IconSize from "@/constants/icon-size";
import { PageLevelLocalization } from "@/constants/localization";
import { ProductCategory } from "@/constants/mock-data/navbar";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useCategories } from "../../hooks";
import Link from "next/link";
import clsxm from "@/utils/clsxm";

const { home: homeLocalization } = PageLevelLocalization;
export interface Category {
  id: number;
  title: string;
  icon: string;
  slug: string;
  parentId: number | null;
  children: Category[];
}

export interface CategoriesResponse {
  categories: Category[];
  success: boolean;
}

export default function ProductCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending } = useCategories();

  return (
    <div>
      <Popover>
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="pt-1 z-50"
        >
          <Popover.Button className="group inline-flex items-center rounded-md text-base font-medium hover:text-opacity-100 focus:outline-none  focus-visible:ring-opacity-75 ">
            <div className="flex gap-2 font-semibold border-l border-gray-200 pl-6 ">
              <Image
                src="/svg/menu.svg"
                width={IconSize.lg}
                height={IconSize.lg}
                alt="menu"
              />
              <div>{homeLocalization.productCategories}</div>
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            show={isOpen}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-50">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1  ring-black ring-opacity-5">
                <div className="relative bg-white border-t-2 border-primary-500">
                  {isPending ? (
                    <div className="flex items-center justify-center py-6">
                      <div className="w-4 h-4 border-2 border-t-primary-500 border-gray-200 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="flex gap-12 p-6 min-w-[700px] max-w-[1500px]">
                      {data?.categories.map(
                        (category: Category, index: number) => {
                          return (
                            <div key={category.id} className="group relative">
                              {/* Unique Color Strip */}
                              <div
                                className="absolute -top-6 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                  background:
                                    index % 2 === 0
                                      ? "linear-gradient(to right, #08A70A, #069D6E)"
                                      : "linear-gradient(to right, #069D6E, #08A70A)",
                                }}
                              ></div>

                              {/* Main Category */}
                              <Link
                                href={`/pcat/${category.slug}`}
                                className="block mb-3 group/main"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-1 h-4 rounded-full transition-all duration-300 group-hover/main:h-6"
                                    style={{
                                      background:
                                        index % 2 === 0 ? "#08A70A" : "#069D6E",
                                    }}
                                  ></div>
                                  <h3 className="font-Bold text-gray-800 text-lg group-hover/main:text-primary-600 transition-colors duration-300 tracking-tight">
                                    {category.title}
                                  </h3>
                                </div>
                              </Link>

                              {/* Subcategories */}
                              <div className="space-y-1 ml-3">
                                {category?.children
                                  ?.slice(0, 6)
                                  .map(
                                    (
                                      subcategory: Category,
                                      subIndex: number
                                    ) => {
                                      return (
                                        <div
                                          key={subcategory.id}
                                          className="group/sub"
                                        >
                                          <Link
                                            href={`/pcat/${category.slug}/${subcategory.slug}`}
                                            className="block py-1 group/sublink"
                                          >
                                            <div className="flex items-center gap-2">
                                              <div
                                                className="w-0.5 h-3 transition-all duration-200 opacity-30 group-hover/sublink:opacity-100 group-hover/sublink:h-4"
                                                style={{
                                                  backgroundColor:
                                                    subIndex % 3 === 0
                                                      ? "#08A70A"
                                                      : subIndex % 3 === 1
                                                        ? "#069D6E"
                                                        : "#9BE39C",
                                                }}
                                              ></div>
                                              <span className="text-basw text-gray-600 group-hover/sublink:text-gray-800 font-Medium transition-colors duration-200">
                                                {subcategory.title}
                                              </span>
                                            </div>
                                          </Link>

                                          {/* Selected Sub-subcategories */}
                                          {subcategory?.children.map(
                                            (subSubcategory: Category) => (
                                              <Link
                                                href={`/pcat/${category.slug}/${subcategory.slug}/${subSubcategory.slug}`}
                                                key={subSubcategory.id}
                                                className="block ml-4 py-0.5 group/subsublink"
                                              >
                                                <div className="flex items-center gap-1.5">
                                                  <div className="w-1 h-1 rounded-full bg-gray-300 group-hover/subsublink:bg-emerald-500 transition-colors duration-200"></div>
                                                  <span className="text-sm text-gray-500 group-hover/subsublink:text-primary-600 transition-colors duration-200">
                                                    {subSubcategory.title}
                                                  </span>
                                                </div>
                                              </Link>
                                            )
                                          )}
                                        </div>
                                      );
                                    }
                                  )}

                                {/* Show more indicator */}
                                {category?.children &&
                                  category.children.length > 6 && (
                                    <div className="ml-3 mt-2">
                                      <span className="text-xs text-primary-500 font-Medium cursor-pointer hover:text-primary-700 transition-colors">
                                        +{category.children.length - 6} بیشتر
                                      </span>
                                    </div>
                                  )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      </Popover>
    </div>
  );
}
