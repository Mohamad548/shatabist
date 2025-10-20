import { AddressType } from '@/constants/mock-data/profile';
import axiosInstance from '@/lib/api/axios';
import { CreditDetail, GetUserResponse } from '../hooks/type';
import { BASE_URL } from '@/constants/url';

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// add - get - delete section orders api ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// گرفتن تمام سفارشات یوز

export const getAllOrdersApi = async () => {
  const response = await axiosInstance.get(`/api/orders/user`);
  return response.data;
};

export const getOrdersApi = async (status: string) => {
  const response = await axiosInstance.get(`/api/orders/user?status=${status}`);
  return response.data;
};

// گرفتن جزیتات سفارش
export const getOrdersByUserIdApi = async (userId: string) => {
  const response = await axiosInstance.get(`/api/orders/user/${userId}`);
  return response.data.order;
};

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// add - get - delete section Address api ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// Addresses Api

export const addAddressApi = async (address: {
  receiverFullName: string;
  receiverPhoneNumber: string;
  lat: number;
  long: number;
}) => {
  const response = await axiosInstance.post(`/api/users/address`, address);
  return response.data;
};

export const getAddressApi = async () => {
  const response = await axiosInstance.get(`/api/users/address`);
  return response.data;
};

export const updateAddressApi = async (addressData: AddressType) => {
  const response = await axiosInstance.put(`/api/users/address`, addressData);
  return response.data;
};

//get getAddressById
export const getAddressByIdApi = async (id: number) => {
  const response = await axiosInstance.get(`/api/users/address/${id}`);
  console.log(response);
  return response.data;
};

export const deleteAddressApi = async (id: number) => {
  const response = await axiosInstance.delete(`/api/users/address/${id}`);
  return response.data;
};

// Ticket's Api

export const getAllTicketApi = async (status: string) => {
  const response = await axiosInstance.get(
    `/api/tickets/user?status=${status}`
  );
  return response.data;
};

export const getTicketByIdApi = async (ticketId: string) => {
  const response = await axiosInstance.get(`/api/tickets/user/${ticketId}`);
  return response.data;
};

export const createTicketApi = async (formData: FormData) => {
  const response = await axiosInstance.post(`/api/tickets`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export interface CreateTicketCommentData {
  content: string;
  ticketId: string | number;
  images?: File[];
}

export const createTicketCommentApi = async (formData: FormData) => {
  const response = await axiosInstance.post('/api/tickets/comment', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const closeTicketByUserApi = async (id: string) => {
  const response = await axiosInstance.put(`/api/tickets/${id}/close`);
  return response.data;
};

// Department Api

export const getDepartmentApi = async () => {
  const response = await axiosInstance.get(`/api/tickets/departments`);
  return response.data;
};

// api Comment in Profile-user

// MyQuestions

export const getQuestionsCommentApi = async () => {
  const response = await axiosInstance.get(`/api/questions`);
  return response.data;
};

// MyContent

export const getMyContentApi = async () => {
  const response = await axiosInstance.get(`/api/comments/user`);
  return response.data;
};

export const getCartById = async (id: number) => {
  const response = await axiosInstance.get(`/api/transactions/cart/${id}`);
  return response.data.cart;
};

export const getShippingDeliveryById = async (id: number) => {
  const response = await axiosInstance.get(`/api/shipping/delivery/${id}`);
  return response.data.shipping;
};

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// add - get - delete section listPurchase api /////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// ایجاد لیست خرید
export const createUserPurchaseApi = async ({ title }: { title: string }) => {
  const response = await axiosInstance.post(`/api/lists/purchase`, { title });
  return response.data;
};

export const createProductToPurchaseApi = async ({
  listId,
  variantId,
}: {
  listId: number;
  variantId: number;
}) => {
  const response = await axiosInstance.post(`/api/lists/purchase/product`, {
    listId,
    variantId,
  });
  return response.data;
};

// گرفتن لیست خرید
export const getUserPurchasesApi = async () => {
  const response = await axiosInstance.get(`/api/lists/purchase`);
  return response.data;
};

// حذف لیست خرید
export const deleteUserPurchaseApi = async (purchaseId: number) => {
  const response = await axiosInstance.delete(
    `/api/lists/purchase/${purchaseId}`
  );
  return response.data;
};
/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// add- get - delete section listFavorite api ///////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// اضافه کردن محصول به علاقه مندی ها
export const addToFavoritesApi = async (variantId: number) => {
  const response = await axiosInstance.post(`/api/lists/favorites/`, {
    variantId,
  });
  return response.data;
};

// گرفتن لیست علاقه
export const getUserFavoriteApi = async () => {
  const response = await axiosInstance.get(`/api/lists/favorites`);
  return response.data;
};

// حذف لیست علاقه
export const deleteUserFavoriteApi = async (favoriteId: number) => {
  const response = await axiosInstance.delete(
    `/api/lists/favorites/${favoriteId}`
  );
  return response.data;
};

//////////////////////////////////////////////////////////////////////////////
/////////////////////////  get  section Notifications api ///////////////////
////////////////////////////////////////////////////////////////////////////

// گرفتن  اعلانات
export const getUserNotificationsApi = async () => {
  const response = await axiosInstance.get(`/api/panel/broadcasts`);
  return response.data;
};

//////////////////////////////////////////////////////////////////////////////
/////////////////////////  get  section Province & Cities Api ///////////////
////////////////////////////////////////////////////////////////////////////
// Province & Cities Api
export const getAllProvince = async () => {
  const response = await axiosInstance.get('/api/provinces');
  return response.data;
};

export const getAllCities = async (id: number) => {
  const response = await axiosInstance.get(`/api/provinces/cities/${id}`);
  return response.data;
};

// Checkout => Get currentCart && nextCart

export const getAllCartApi = async () => {
  const response = await axiosInstance.get(`/api/transactions/cart`);
  return response.data;
};

export const deletePurchaseCartItem = async (cartItemId: string) => {
  const response = await axiosInstance.delete(
    `/api/transactions/cart/items/${cartItemId}`
  );
  return response.data;
};

export const deleteAllPurchaseCartItems = async (cartId: string) => {
  const response = await axiosInstance.delete(
    `/api/transactions/cart/items/all/${cartId}`
  );
  return response.data;
};

export const addToCartTransactionApi = async ({
  cartId,
  id,
  to,
}: {
  cartId: number;
  id: number;
  to: string;
}) => {
  const response = await axiosInstance.post(`/api/transactions/cart/items`, {
    cartId,
    id,
    to,
  });
  return response.data;
};

// Shipping Api

export const getShippingTypeByCityId = async (cityId: string) => {
  const response = await axiosInstance.get(`/api/shipping/${cityId}`);
  return response.data;
};

export const getAllPackagingApi = async () => {
  const response = await axiosInstance.get(`/api/panel/wrapping`);
  return response.data;
};

// vendors

export const getVendorsApi = async () => {
  const response = await axiosInstance.get(`/api/panel/vendor`);
  return response.data;
};

export const getVendorByIdApi = async (vendorId: number) => {
  const response = await axiosInstance.get(`/api/panel/vendor/${vendorId}`);
  return response.data.vendor;
};

// order in shipping
// services/order.ts

export const createOrderApi = async (data: {
  deliveryType: string;
  packagingType: string;
  wrapping: number;
  userAddressId: number;
  shippingId: number;
  cartId: number;
}) => {
  const response = await axiosInstance.post('/api/orders', data);
  return response.data;
};

// Payment Api
export const createPaymentApi = async (data: {
  method: string;
  orderId: number;
}) => {
  const response = await axiosInstance.post('/api/payment', data);
  return response.data;
};

export const createPaymentRedirectUrl = async (paymentId: number) => {
  const response = await axiosInstance.get(`/api/payment/pay/${paymentId}`);
  return response.data;
};

///getQuestions product
export const getCommentsProductApi = async (id: number) => {
  const response = await axiosInstance.get(`/api/products/${id}/comments`);
  return response.data.data;
};

// services/api/user/inquiry.ts

export const sendNationalInquiryApi = async (data: {
  birth_date: string;
  national_id: string;
}) => {
  const response = await axiosInstance.post(
    '/api/user/inquiry/national/request',
    data
  );
  return response.data;
};

export const sendNationalVerificationApi = async (data: {
  verification_token: string;
}) => {
  const response = await axiosInstance.post(
    '/api/user/inquiry/national/verification',
    data
  );
  return response.data;
};

export const getUserApi = async (): Promise<GetUserResponse> => {
  const response = await axiosInstance.get<GetUserResponse>('/api/user');
  return response.data;
};

// FAQ
export interface FaqItem {
  id: number;
  title: string;
  content: string;
}

export interface FaqTypeProps {
  id: number;
  title: string;
  content: string;
}

// ✅ Server fetch
export async function getFaqServer(): Promise<FaqTypeProps[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/panel/faq`, {
      next: { revalidate: 43200 },
    });
    if (!res.ok) throw new Error("خطا در دریافت FAQ");
    const data = await res.json();
    return data?.faqs || [];
  } catch {
    return [];
  }
}

export async function getFaqClient(): Promise<FaqTypeProps[]> {
  const res = await axiosInstance.get("/api/panel/faq");
  return res.data?.faqs || [];
}

// Terms
export interface Term {
  id: number;
  title: string;
  content: string;
}

// Server fetch (SSR / ISR)
export async function getTermsServer(): Promise<Term[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/panel/terms`, {
      next: { revalidate: 43200 }, // هر 12 ساعت
    });
    if (!res.ok) throw new Error("خطا در دریافت قوانین");
    const data = await res.json();
    return data?.terms || [];
  } catch {
    return [];
  }
}

// Client fetch (React Query)
export async function getTermsClient(): Promise<Term[]> {
  const res = await axiosInstance.get(`${BASE_URL}/api/panel/terms`);
  return res.data?.terms || [];
}


// About
export const getAboutApi = async () => {
  const response = await axiosInstance.get('/api/panel/about');
  return response.data;
};

export type UploadDocumentPayload = {
  file: File;
  type: string; // مثلا "identity"
  business: string; // مثلا "credit"
};

export const uploadDocumentApi = async ({
  file,
  type,
  business,
}: UploadDocumentPayload) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  formData.append('business', business);

  const response = await axiosInstance.post('api/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export type CreditRequestPayload = {
  check_sample: number; // اینجا ID فایل
  id_card: number; // اینجا ID فایل
  userId: number;
  first_name: string;
  last_name: string;
  national_id: string;
  phone_number: string;
};

export const createCreditRequestApi = async (payload: CreditRequestPayload) => {
  const response = await axiosInstance.post('api/credit', payload);
  return response.data;
};

// api/installment.ts
export const getInstallmentsApi = async (status: string) => {
  const response = await axiosInstance.get(`/api/credit?status=${status}`);
  return response.data;
};

export const getInstallmentById = async (id: string): Promise<CreditDetail> => {
  const response = await axiosInstance.get(`/api/credit/${id}`);
  return response.data?.credit;
};

export const updateInstallmentById = async (
  id: string,

  payload: Partial<CreditDetail>
): Promise<CreditDetail> => {
  const response = await axiosInstance.put(`/api/credit/${id}`, payload);
  return response.data;
};

export interface UpdateCreditPayload {
  credit: number;
}

export const updateCredit = async (
  id: string,
  payload: UpdateCreditPayload
) => {
  const response = await axiosInstance.post(
    `/api/credit/${id}/max-credit`,
    payload
  );
  return response.data;
};

export interface FinalizeCreditPayload {
  step: number; // یا هر فیلدی که لازم داری، به جای step بزن
}
export const finalizeCredit = async (
  id: string,
  payload: FinalizeCreditPayload
) => {
  const response = await axiosInstance.post(
    `/api/credit/${id}/finalize`,
    payload
  );
  return response.data;
};

///////////// slider api /////////////

export const getSlidersApi = async () => {
  const response = await axiosInstance.get(`/api/panel/slider/active`);
  return response.data;
};

export const getBannersApi = async () => {
  const response = await axiosInstance.get(`/api/panel/bigbanner/active`);
  return response.data;
};

// ///// remind order api //////

export const remindOrderApi = async ({
  variantId,
  method,
}: {
  variantId: number;
  method?: string;
}) => {
  const response = await axiosInstance.post(`/api/orders/remind`, {
    variantId,
    method,
  });
  return response.data;
};
