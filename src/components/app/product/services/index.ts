import axiosInstance from "@/lib/api/axios";

export interface CartItem {
  variantId: number;
  quantity: number;
}

export const addToCartApi = async (prioIndex: 0 | 1, cartItems: CartItem[]) => {
  const response = await axiosInstance.post("/api/transactions/cart/", {
    prioIndex,
    cartItems,
  });
  return response.data;
};

export interface CreateQuestionPayload {
  title?: string;
  content: string;
  productId: number;
}

export type CreateCommentData = {
  title: string;
  content: string;
  rate: number;
  productId: number;
  images?: File[];
};

export const createCommentApi = async (data: CreateCommentData) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("rate", String(data.rate));
  formData.append("productId", String(data.productId));

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append("images", file);
    });
  }

  const response = await axiosInstance.post("/api/comments", formData);
  return response.data;
};

// services/questions.service.ts
export const createQuestionApi = async (data: CreateQuestionPayload) => {
  const response = await axiosInstance.post(`/api/questions`, {
    title: data.title,
    content: data.content,
    productId: data.productId,
  });
  return response.data;
};

export const getProductCommentsApi = async (
  id: number | string,
  sortBy:
    | "newest"
    | "highest_likes"
    | "highest_rate"
    | "lowest_rate" = "newest",
) => {
  const response = await axiosInstance.get(`/api/products/${id}/comments`, {
    params: { sortBy },
  });
  return response.data;
};

export type LikeDislikePayload = {
  isLike: boolean;
  commentId: number;
};

export const likeDislikeCommentApi = async (data: LikeDislikePayload) => {
  const response = await axiosInstance.post(`/api/comments/likes`, {
    isLike: data.isLike,
    commentId: data.commentId,
  });
  return response.data;
};

export const getRelatedProductsApi = async (id: number | string) => {
  const response = await axiosInstance.get(`/api/products/${id}/related`);
  return response.data;
};
