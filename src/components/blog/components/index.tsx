"use client";
import React from "react";
import Breadcrumbs from "./breadcrumbs";
import { breadcrumbItems } from "@/constants/mock-data/breadcrumbs";
import AllBlogCards from "./allblogcards";
import { BlogCardsInfo } from "@/constants/mock-data/blogcards";
import PaginationProducts from "@/components/app/products/components/body-products/pagination-products";

function Blog() {
  return (
    <div className="mt-6 md:mx-10 lg:mx-20 space-y-10">
      <Breadcrumbs breadcrumbItems={breadcrumbItems} className="" />
      <AllBlogCards BlogCardsInfo={BlogCardsInfo} />
      <PaginationProducts total={50} page={1}  limit={16} />
    </div>
  );
}

export default Blog;

// در ریسپانسیو در سایز 320 موبایل به هم می ریزد به خاطر paginate
