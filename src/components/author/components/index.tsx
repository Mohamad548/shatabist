import React, { useState } from "react";
import HeaderBox from "./author-header";
import Breadcrumb from "@/components/blog/components/breadcrumbs";
import Image from "next/image";

import ArticleBox from "@/components/blogDetail/components/articleBox";
import { breadcrumbItems } from "@/constants/mock-data/breadcrumbs";
import { authorArticlesData } from "@/constants/mock-data/author-articlescard";
import AuthorArticleCards from "./author-articles-card";
import PaginationProducts from "@/components/app/products/components/body-products/pagination-products";

function Author() {
  const [isGridView, setIsGridView] = useState(true); // حالت پیش‌فرض
  return (
    <>
      <HeaderBox />
      <div className="mx-5 mt-6 space-y-10">
        <div className="grid lg:grid-cols-4 gap-8 mt-10">
          <div className="space-y-6 lg:col-span-3">
            <div className="flex justify-between">
              <Breadcrumb breadcrumbItems={breadcrumbItems} className="" />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsGridView(true)} // تغییر به حالت گرید
                  className={`p-2 rounded-full ${
                    isGridView ? "bg-blue-600" : "bg-gray-200 "
                  }`}
                  aria-label="نمایش گرید"
                >
                  <Image
                    src="/svg/category.svg"
                    alt="grid icon"
                    width={18}
                    height={18}
                    className={!isGridView ? "fill-white" : "fill-black"} // تغییر رنگ آیکن
                  />
                </button>
                <button
                  onClick={() => setIsGridView(false)} // تغییر به حالت لیست
                  className={`p-2 rounded-full ${
                    !isGridView ? "bg-blue-600" : "bg-gray-200 "
                  }`}
                  aria-label="نمایش لیست"
                >
                  <Image
                    src="/svg/hmenu.svg"
                    alt="list icon"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
            </div>
            <div
              className={
                isGridView
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-2"
                  : "grid gap-2"
              }
            >
              {authorArticlesData.map((article, index) => (
                <AuthorArticleCards
                  key={index}
                  article={article}
                  isGridView={isGridView} // ارسال وضعیت به فرزند
                />
              ))}
            </div>
          </div>
          <div className="w-full lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h3 className="font-Bold">جدید ترین مقالات</h3>
              <ArticleBox />
              <ArticleBox />
              <ArticleBox />
              <ArticleBox />
            </div>
            <div className="space-y-7">
              <Image
                src="/images/banner1.jpg"
                alt="banner-1"
                width={500}
                height={500}
                className="w-full"
              />
              <Image
                src="/images/banner2.jpg"
                alt="banner-2"
                width={500}
                height={500}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <PaginationProducts total={100}  page={1} limit={16}/>
      </div>
    </>
  );
}

export default Author;

{
  /* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 ">
{authorArticlesData.map((article, index) => (
  <AuthorArticleCards key={index} article={article} /> */
}
