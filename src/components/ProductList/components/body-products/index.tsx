import SortingProducts from "@/components/app/products/components/body-products/sorting-products";
import React from "react";

function BodyProducts() {
  return (
    <section className="border rounded-md  border-gray-200 w-full">
      <SortingProducts
        classNameSorting="hidden md:flex"
        classNameInputSorting="sr-only"
        productsLength={0}
      />
      <div className="">pagination</div>
    </section>
  );
}

export default BodyProducts;
