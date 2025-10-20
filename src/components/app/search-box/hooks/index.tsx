import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-key";
import { getSearchResultsApi } from "../services";
import { ProductType } from "@/components/base/product-card/type";

export const useSearchResults = (
  query: string,
  options?: UseQueryOptions<ProductType[], Error>
) => {
  return useQuery<ProductType[], Error>({
    queryKey: [QUERY_KEYS.search, query],
    queryFn: async () => {
      const result = await getSearchResultsApi(query);
      return result.products; // فقط آرایه محصولات
    },
    enabled: !!query && query.length >= 3,
    ...options,
  });
};
