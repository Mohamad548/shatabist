import React from "react";
import MainProducts from "./main-products";
import PaginationProducts from "./pagination-products";
import SortingProducts from "./sorting-products";

function BodyProducts({
  isPending,
  products,
  total,
  page,
  limit,
  slug = []
}: {
  isPending: boolean;
  products: any;
  total: number;
  page: number;
  limit: number;
  slug?: string[];
}) {
  return (
    <section className="border py-4 rounded-md border-gray-200 w-full">
      <SortingProducts
        classNameSorting="hidden md:flex mb-2"
        classNameInputSorting="sr-only"
        productsLength={total}
      />
      <MainProducts isPending={isPending} products={products} />
      <div className="md:w-full flex justify-center">
        <PaginationProducts
          page={page}
          limit={limit}
          total={total}
        />
      </div>
    </section>
  );
}

export default BodyProducts;
