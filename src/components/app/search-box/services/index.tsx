import { ProductType } from "@/components/base/product-card/type";

export const getSearchResultsApi = async (
  query: string,
  offset = 0,
  limit = 16
): Promise<{ products: ProductType[]; pagination: { total: number } }> => {
  if (!query) return { products: [], pagination: { total: 0 } };

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/search/${encodeURIComponent(
    query
  )}?limit=${limit}&offset=${offset}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 180, tags: ["search", "products"] },
    });

    if (!res.ok)
      throw new Error(
        `Failed to fetch search results: ${res.status} ${res.statusText}`
      );

    const data = await res.json();

    // ✅ انتظار ساختار دقیق:
    // { products: [...], pagination: { total: 123 } }

    return {
      products: Array.isArray(data.products) ? data.products : [],
      pagination: {
        total:
          typeof data.pagination?.total === "number"
            ? data.pagination.total
            : Array.isArray(data.products)
            ? data.products.length
            : 0,
      },
    };
  } catch (error) {
    return { products: [], pagination: { total: 0 } };
  }
};


export const getBrandProductsApi = async (
  brandSlug: string,
  offset = 0,
  limit = 16
): Promise<{ products: ProductType[]; pagination: { total: number }; brandTitle: string }> => {
  if (!brandSlug) return { products: [], pagination: { total: 0 }, brandTitle: "" };

  const safeLimit = limit > 0 ? limit : 16;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/brands/${brandSlug}?limit=${safeLimit}&offset=${offset}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 180, tags: ["brand-products"] },
    });

    if (!res.ok) throw new Error(`Failed to fetch brand products: ${res.status}`);

    const data = await res.json();
    console.log(data);

    const productsArray = Array.isArray(data.brand?.product) ? data.brand.product : [];

    return {
      products: productsArray,
      pagination: {
        total: productsArray.length,
      },
      brandTitle: typeof data.brand?.title === "string" ? data.brand.title : "",
    };
  } catch (err) {
    return { products: [], pagination: { total: 0 }, brandTitle: "" };
  }
};



export const getTagProductsApi = async (
  tags: string | string[],
  offset = 0,
  limit = 16
): Promise<{ products: ProductType[]; pagination: { total: number }; tagTitle: string }> => {
  try {
    // بررسی اینکه تگ وجود دارد
    if (!tags || (Array.isArray(tags) && tags.length === 0)) {
      return { products: [], pagination: { total: 0 }, tagTitle: "" };
    }

    // اگر آرایه بود، با کاما جدا کن
    const tagsParam = Array.isArray(tags) ? tags.join(",") : tags;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products/search-by-tags?tags=${encodeURIComponent(
      tagsParam
    )}&limit=${limit}&offset=${offset}`;

    console.log("🔗 Fetching URL:", url);

    const res = await fetch(url, {
      next: { revalidate: 180, tags: ["tag-products"] },
    });

    if (!res.ok) throw new Error(`Failed to fetch tag products: ${res.status}`);

    const data = await res.json();
    console.log("🔹 Raw data:", data);

    const productsArray = Array.isArray(data.data) ? data.data : [];

    return {
      products: productsArray,
      pagination: { total: data.total || productsArray.length },
      tagTitle: tagsParam,
    };
  } catch (err) {
    console.error("❌ getTagProductsApi error:", err);
    return { products: [], pagination: { total: 0 }, tagTitle: "" };
  }
};


