import { QUERY_KEYS } from "@/constants/query-key";
import { usePaginationStore } from "@/stores/paginationStore";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  getBrandBySlugApi,
  getCategoriesApi,
  getCategoriesBuySlugApi,
  getProductsApi,
  getProductsByApi,
  getProductsBySlugApi,
} from "../services";
import { ProductType } from "@/components/base/product-card/type";

//////////////////////////////////////////////////////////////////////
/////////// add - get - delete section Categories hook ////////////
////////////////////////////////////////////////////////////////////

//getCategories
export const useCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.category],
    queryFn: () => getCategoriesApi(),
  });
};

//getCategoriesBuySlug
export const useCategoriesBuySlug = (slug: string) => {
  const { limit, offset } = usePaginationStore();

  return useQuery({
    queryKey: [QUERY_KEYS.category, slug, limit, offset],
    queryFn: () => getCategoriesBuySlugApi(slug),
    enabled: !!slug,
  });
};

//////////////////////////////////////////////////////////////////////
/////////// add - get - delete section Products hook ////////////
////////////////////////////////////////////////////////////////////

//getProducts

export const useProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.terms],
    queryFn: getProductsApi,
  });
};
//getProductsBySlug - for getting filter items
export const useProductsBySlug = (slug: string) => {
  const { limit, offset } = usePaginationStore();

  return useQuery({
    queryKey: [QUERY_KEYS.product, slug, limit, offset],
    queryFn: () => getProductsBySlugApi(slug),
    enabled: !!slug,
  });
};

//getProductsBy - for getting filtered products
export const useProductsBy = (slug: string) => {
  const { limit, offset } = usePaginationStore();
  const searchParams = useSearchParams();
  
  // Extract filter parameters from URL
  const filterParams: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    // Handle property filters (without property_ prefix)
    if (!key.startsWith('search_') && 
        !['available', 'fastDelivery', 'freeDelivery', 'payOnSite', 'inPersonPurchase'].includes(key)) {
      filterParams[`${key}`] = value;
    } else {
      filterParams[key] = value;
    }
  });

  return useQuery({
    queryKey: [QUERY_KEYS.product, slug, limit, offset, filterParams],
    queryFn: () => getProductsByApi(filterParams),
    enabled: !!slug,
  });
};


export const useBrandBySlug = (slug: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.brand, slug],
    queryFn: () => getBrandBySlugApi(slug),
    enabled: !!slug,
  });
};


