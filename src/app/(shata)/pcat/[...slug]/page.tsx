import type { Metadata } from "next";
import ProductList from "@/components/app/products/components";
import { getCategoriesBuySlugApi } from "@/components/layout/components/header/services";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: { slug?: string[] };
  searchParams: { page?: string; limit?: string };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "16");
  const offset = (page - 1) * limit;

  const slugForApi = params.slug?.[params.slug.length - 1] || "";

  // ✅ حالا عنوان دسته را هم می‌گیریم
  const { products, pagination } = await getCategoriesBuySlugApi(slugForApi, offset, limit);

  return (
    <ProductList
      initialProducts={products}
      total={pagination.total}
      page={page}
      limit={limit}
      type="category"
      slug={params.slug || []}
    />
  );
}

// ✅ متادیتا با عنوان واقعی دسته
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const slugForApi = params.slug?.[params.slug.length - 1] || "";
  const { categoryTitle } = await getCategoriesBuySlugApi(slugForApi, 0, 16);

  const slugPath = params.slug?.join("/") || "";
  const name = categoryTitle || params.slug?.join(" / ") || "همه محصولات";

  return {
    title: `لیست محصولات ${name} | شرکت شتا۲۰`,
    description: `مشاهده محصولات دسته‌بندی "${name}" در فروشگاه اینترنتی شتا۲۰. خرید آنلاین با بهترین قیمت و ارسال سریع.`,
    alternates: { canonical: `https://shata20.ir/shop/${slugPath}` },
    openGraph: {
      title: `محصولات ${name} | شتا۲۰`,
      description: `نمایش لیست محصولات در دسته "${name}" در فروشگاه شتا۲۰.`,
      type: "website",
      locale: "fa_IR",
      url: `https://shata20.ir/shop/${slugPath}`,
    },
  };
}
