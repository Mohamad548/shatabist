import type { Metadata } from "next";
import ProductList from "@/components/app/products/components";
import { getTagProductsApi } from "@/components/app/search-box/services";

export const dynamic = "force-dynamic"; // SSR

interface TagPageProps {
  params: { slug: string[] }; // [...slug] -> آرایه
  searchParams: { page?: string; limit?: string };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  // ✅ decodeURIComponent برای حل مشکل %2C
  const decodedTagsArray = params.slug.map(decodeURIComponent);
  const tags = decodedTagsArray.join(",");

  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "16");
  const offset = (page - 1) * limit;

  const { products, pagination, tagTitle } = await getTagProductsApi(tags, offset, limit);

  console.log("✅ Products:", products);

  return (
    <ProductList
      initialProducts={products}
      total={pagination?.total || 0}
      page={page}
      limit={limit}
      type="tag"
      slug={decodedTagsArray} // برای Pagination
    />
  );
}
