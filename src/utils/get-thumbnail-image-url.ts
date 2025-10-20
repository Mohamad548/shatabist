import { BASE_URL } from "@/constants/url";

export const getThumbnailImageUrl = (
  productImages?: { thumbnail: boolean; url: string }[],
): string => {
  const thumbnailImage = productImages?.find(
    (image) => image.thumbnail && image.url,
  );

  if (!thumbnailImage?.url) return "";

  const url = String(thumbnailImage.url); // تبدیل صریح به رشته

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${BASE_URL}${url}`;
};
