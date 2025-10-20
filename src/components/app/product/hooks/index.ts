import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCartApi,
  CartItem,
  createCommentApi,
  CreateCommentData,
  createQuestionApi,
  CreateQuestionPayload,
  getProductCommentsApi,
  getRelatedProductsApi,
  likeDislikeCommentApi,
  LikeDislikePayload,
} from "../services";
import { QUERY_KEYS } from "@/constants/query-key";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      prioIndex,
      cartItems,
    }: {
      prioIndex: 0 | 1;
      cartItems: CartItem[];
    }) => addToCartApi(prioIndex, cartItems),
    onSuccess: () => {
      // Invalidate cart queries to trigger refetch
      // The header component will automatically sync the store when the query updates
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cart] });
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentData) => createCommentApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.comments, QUERY_KEYS.product],
      });
    },
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateQuestionPayload) => createQuestionApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.question] }); // یا هر کلیدی که برای پرسش‌ها استفاده می‌کنی
    },
  });
};

// hooks/useGetProductComments.ts
export const useGetProductComments = (
  id: number | string,
  sortBy: "newest" | "highest_likes" | "highest_rate" | "lowest_rate" = "newest"
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.comments, id, sortBy],
    queryFn: () => getProductCommentsApi(id, sortBy),
    enabled: !!id,
  });
};

export const useLikeDislikeComment = (productId: number | undefined) => {
  const queryClient = useQueryClient();

  const sortKeys: (
    | "newest"
    | "highest_likes"
    | "highest_rate"
    | "lowest_rate"
  )[] = ["newest", "highest_likes", "highest_rate", "lowest_rate"];

   return useMutation({
    mutationFn: (data: LikeDislikePayload) => likeDislikeCommentApi(data),
    onSuccess: () => {
      if (!productId) return; // <-- مشکل اینجاست

      sortKeys.forEach((key) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.comments, productId, key],
        });
      });
    },
  });
};

export const useGetRelatedProducts = (id: number | string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.product, id],
    queryFn: () => getRelatedProductsApi(id),
    enabled: !!id,
  });
};
