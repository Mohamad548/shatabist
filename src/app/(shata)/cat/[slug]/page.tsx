import CategoryBlog from "@/components/category-blog/components";
import React from "react";

function BlogCategoryPage({ params }: any) {
  const { slug } = params;

  return <CategoryBlog />;
}

export default BlogCategoryPage;

