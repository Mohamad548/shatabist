import { BASE_URL } from "@/constants/url";

export default async function request({
  url,
  method,
  body,
  options,
}: {
  url: string;
  method: string;
  body?: any;
  options?: any;
}) {
  try {
    const response = await fetch(`${BASE_URL}/api${url}`, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message || "مشکل در اتصال به سرور.");
  }
}
