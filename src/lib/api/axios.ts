// import axios from "axios";
// import Cookies from "js-cookie";

// // Persian translations
// const messages = {
// 	request: {
// 		log: "درخواست:",
// 		error: "خطا در ارسال درخواست:",
// 	},
// 	response: {
// 		log: "پاسخ:",
// 		error: "خطا در دریافت پاسخ:",
// 	},
// 	errors: {
// 		noResponse: "پاسخی از سرور دریافت نشد:",
// 		setupError: "خطا در تنظیم درخواست:",
// 		unauthorized: "دسترسی غیرمجاز - لطفا دوباره وارد شوید",
// 		forbidden: "دسترسی ممنوع",
// 		notFound: "منبع مورد نظر یافت نشد",
// 		serverError: "خطای سرور رخ داده است",
// 		generalError: "خطایی رخ داده است:",
// 		timeoutError: "درخواست بیش از حد طول کشید.",
// 		networkError: "خطای شبکه رخ داده است.",
// 		badRequest: "درخواست نامعتبر بود.",
// 		validationError: "خطای اعتبارسنجی رخ داده است.",
// 	},
// 	redirects: {
// 		login: "/login",
// 		home: "/",
// 		notFound: "/not-found",
// 	},
// };

// // Create axios instance with default config
// const axiosInstance = axios.create({
// 	baseURL: process.env.NEXT_PUBLIC_API_URL,
// 	timeout: 10000,
// 	headers: {
// 		//"Content-Type": "application/json",
// 		"X-Requested-With": "XMLHttpRequest",
// 	},
// });

// // Helper function to handle redirects safely
// const safeRedirect = (url: string) => {
// 	if (typeof window !== "undefined") {
// 		window.location.href = url;
// 	}
// };

// // Helper function to show error messages
// const showErrorMessage = (message: string) => {};

// // Request interceptor
// axiosInstance.interceptors.request.use(
// 	(config) => {
// 		// Get token from cookies
// 		const token = Cookies.get("token");

// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}

// 		// Add timestamp to prevent caching
// 		// if (config.method === "get") {
// 		//   config.params = {
// 		//     ...config.params,
// 		//     _t: Date.now(),
// 		//   };
// 		// }

// 		return config;
// 	},
// 	(error) => {
// 		showErrorMessage("خطا در ارسال درخواست");
// 		return Promise.reject(error);
// 	}
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {
// 		// Handle network errors
// 		if (!error.response) {
// 			if (error.code === "ECONNABORTED") {
// 				showErrorMessage(messages.errors.timeoutError);
// 			} else {
// 				showErrorMessage(messages.errors.networkError);
// 			}
// 			return Promise.reject(error);
// 		}

// 		// Handle HTTP error responses
// 		const { status, data } = error.response;

// 		switch (status) {
// 			case 400: {
// 				// Bad Request - validation or malformed request
// 				const badRequestMessage = data?.message || messages.errors.badRequest;
// 				showErrorMessage(badRequestMessage);
// 				break;
// 			}

// 			case 401:
// 				// Unauthorized - clear token and redirect to login
// 				Cookies.remove("token", { path: "/" });
// 				Cookies.remove("refreshToken", { path: "/" }); // Clear refresh token if exists
// 				showErrorMessage(messages.errors.unauthorized);
// 				safeRedirect(messages.redirects.login);
// 				break;

// 			case 403:
// 				// Forbidden - show error and redirect to home
// 				showErrorMessage(messages.errors.forbidden);
// 				safeRedirect(messages.redirects.home);
// 				break;

// 			case 404:
// 				// Not found - show error message (don't always redirect)
// 				showErrorMessage(messages.errors.notFound);
// 				// Only redirect if it's a page-level request, not API calls
// 				if (error.config?.url && !error.config.url.includes("/api/")) {
// 					safeRedirect(messages.redirects.notFound);
// 				}
// 				break;

// 			case 422: {
// 				// Validation errors - let the component handle these with custom message
// 				const validationMessage =
// 					data?.message || messages.errors.validationError;
// 				showErrorMessage(validationMessage);
// 				break;
// 			}

// 			case 500:
// 			case 502:
// 			case 503:
// 			case 504:
// 				// Server errors
// 				showErrorMessage(messages.errors.serverError);
// 				break;

// 			default: {
// 				// Handle other errors with custom message if available
// 				const errorMessage = data?.message || `خطای ناشناخته (کد: ${status})`;
// 				showErrorMessage(errorMessage);
// 			}
// 		}

// 		return Promise.reject(error);
// 	}
// );

// export default axiosInstance;

import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

// Persian messages for UI error handling
const messages = {
  errors: {
    unauthorized: "دسترسی غیرمجاز - لطفا دوباره وارد شوید",
    forbidden: "دسترسی ممنوع",
    notFound: "منبع مورد نظر یافت نشد",
    serverError: "خطای سرور رخ داده است",
    timeoutError: "درخواست بیش از حد طول کشید.",
    networkError: "خطای شبکه رخ داده است.",
    badRequest: "درخواست نامعتبر بود.",
    validationError: "خطای اعتبارسنجی رخ داده است.",
  },
  redirects: {
    login: "/login",
    home: "/",
    notFound: "/not-found",
  },
};

// Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Safe client-side redirect
const safeRedirect = (url: string) => {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
};

// Helper: show error messages (you can customize this for UI)
const showErrorMessage = (message: string) => {};

// Get a new access token using the refresh_token
const refreshAccessToken = async () => {
  const refreshToken = getCookie("refresh_token");
  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/refresh_token`,
      {
        refresh_token: refreshToken,
      }
    );

    const { token } = response.data;

    // Save new tokens in cookies
    setCookie("token", token, { path: "/", maxAge: 60 * 60 * 24 * 1 });
    // Cookies.set("refresh_token", newRefreshToken, {
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 7,
    // });
    return token;
  } catch (error) {
    return null;
  }
};

// Queue for pending requests during token refresh
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    showErrorMessage("Request error");
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network or timeout errors
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        showErrorMessage(messages.errors.timeoutError);
      } else {
        showErrorMessage(messages.errors.networkError);
      }
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Handle expired token (401 Unauthorized)
    if (
      (status === 401 || data?.message === "jwt expired") &&
      !originalRequest._retry
    ) {
      // Prevent infinite loop on refresh endpoint itself
      if (originalRequest.url?.includes("/refresh_token")) {
        deleteCookie("token");
        // deleteCookie("refresh_token");
        safeRedirect(messages.redirects.login);
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        // If token is being refreshed, wait until it's done
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        if (!newToken) throw new Error("Failed to refresh access token");

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        deleteCookie("token");
        deleteCookie("refresh_token");
        safeRedirect(messages.redirects.login);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other status codes
    switch (status) {
      case 400:
        showErrorMessage(data?.message || messages.errors.badRequest);
        break;
      case 403:
        showErrorMessage(messages.errors.forbidden);
        safeRedirect(messages.redirects.home);
        break;
      case 404:
        showErrorMessage(messages.errors.notFound);
        if (error.config?.url && !error.config.url.includes("/api/")) {
          safeRedirect(messages.redirects.notFound);
        }
        break;
      case 422:
        showErrorMessage(data?.message || messages.errors.validationError);
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        showErrorMessage(messages.errors.serverError);
        break;
      default:
        showErrorMessage(data?.message || `Unknown error (code: ${status})`);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
