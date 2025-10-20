import { ProductType } from '@/components/base/product-card/type';
import { BASE_URL } from '@/constants/url';
import axiosInstance from '@/lib/api/axios';
import { usePaginationStore } from '@/stores/paginationStore';

/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// add- get - delete section Categories api ///////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// گرفتن لیست دسته بندی ها
export const getCategoriesApi = async () => {
  const response = await axiosInstance.get(`/api/categories`);
  return response.data;
};
export const getProductsApi = async () => {
  const response = await axiosInstance.get(`/api/products`);
  return response.data;
};


export const getProductsServer = async (
  offset = 0,
  limit = 16
): Promise<{ products: ProductType[]; total: number }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?offset=${offset}&limit=${limit}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

    const data = await res.json();
    return {
      products: Array.isArray(data.products) ? data.products : [],
      total: data.total || data.products.length || 0,
    };
  } catch (err) {
    return { products: [], total: 0 };
  }
};

// گرفتن محصولات بر اساس slug
export const getProductsBySlugApi = async (slug: string) => {
  const { limit, offset } = usePaginationStore.getState();
  const response = await axiosInstance.get(`/api/products/slug/${slug}`, {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};
export const getProductsByApi = async (filterParams?: {
  [key: string]: string;
}) => {
  const { limit, offset } = usePaginationStore.getState();
  const response = await axiosInstance.get(`/api/products`, {
    params: {
      // limit,
      // offset,
      ...filterParams,
    },
  });
  return response.data;
};

export const getCategoriesBuySlugApi = async (
  slug: string,
  offset = 0,
  limit = 16
): Promise<{ 
  products: ProductType[]; 
  pagination: { total: number }; 
  categoryTitle: string;
}> => {
  if (!slug) return { products: [], pagination: { total: 0 }, categoryTitle: "" };

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/categories/slug/${slug}?limit=${limit}&offset=${offset}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 180, tags: ["category-products"] },
    });
    if (!res.ok) throw new Error(`Failed to fetch category products: ${res.status}`);

    const data = await res.json();

    // انتظار داریم API یکی از این حالت‌ها رو بده:
    // { products: [...], pagination: { total: 123 }, category: { title: "گوشی موبایل" } }

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
      categoryTitle:
        typeof data.category?.title === "string" ? data.category.title : "",
    };
  } catch (err) {
    return { products: [], pagination: { total: 0 }, categoryTitle: "" };
  }
};



/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// add- get - delete section Brand api ///////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
export const getBrandBySlugApi = async (slug: string) => {
  const response = await axiosInstance.get(`/api/brands/${slug}`);
  return response.data;
};
