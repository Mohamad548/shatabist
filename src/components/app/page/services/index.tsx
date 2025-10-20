import axiosInstance from "@/lib/api/axios";

export interface PageResponse {
  page: {
    id: number;
    title: string;
    slug: string;
    body: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
  };
}



export const getPageBySlugApi = async (slug: string): Promise<PageResponse> => {
  const response = await axiosInstance.get(`/api/page/slug/${encodeURIComponent(slug)}`);
  return response.data; // اینجا response.data.page شامل داده‌های صفحه است
};
