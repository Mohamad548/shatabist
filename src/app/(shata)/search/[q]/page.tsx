import type { Metadata } from "next";
import ProductList from "@/components/app/products/components";
import { getSearchResultsApi } from "@/components/app/search-box/services";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  params: { q: string };
  searchParams: { page?: string; limit?: string };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const searchQuery = decodeURIComponent(params.q);
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "16");
  const offset = (page - 1) * limit;

  // ✅ دریافت داده‌ها از API
  const { products, pagination } = await getSearchResultsApi(searchQuery, offset, limit);

  return (
    <div className="p-4">
      <ProductList
        initialProducts={products}
        total={pagination?.total}
        page={page}
        limit={limit}
        type="search"
        slug={[`search/${searchQuery}`]} // ← مسیر برای pagination
      />
    </div>
  );
}

// ✅ متادیتا برای SEO
export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const query = decodeURIComponent(params.q);

  return {
    title: `نتایج جستجو برای "${query}" | شرکت شتا۲۰`,
    description: `نمایش نتایج جستجوی "${query}" در فروشگاه اینترنتی شتا۲۰.`,
    openGraph: {
      title: `جستجو: ${query} | شتا۲۰`,
      description: `نتایج جستجو برای "${query}" در فروشگاه اینترنتی شتا۲۰.`,
      type: "website",
      locale: "fa_IR",
      url: `https://shata20.ir/shop/search/${query}`,
    },
    alternates: {
      canonical: `https://shata20.ir/shop/search/${query}`,
    },
  };
}
