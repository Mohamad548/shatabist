import { QUERY_KEYS } from '@/constants/query-key';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useCartStore } from '@/stores/useCartStore';
import {
  addAddressApi,
  addToCartTransactionApi,
  addToFavoritesApi,
  closeTicketByUserApi,
  createOrderApi,
  createPaymentApi,
  createPaymentRedirectUrl,
  createProductToPurchaseApi,
  createTicketApi,
  createTicketCommentApi,
  createUserPurchaseApi,
  deleteAddressApi,
  deletePurchaseCartItem,
  deleteUserFavoriteApi,
  deleteUserPurchaseApi,
  getAddressApi,
  getAddressByIdApi,
  getAllCartApi,
  getAllCities,
  getAllPackagingApi,
  getAllProvince,
  getAllTicketApi,
  getCommentsProductApi,
  getDepartmentApi,
  getMyContentApi,
  getOrdersApi,
  getOrdersByUserIdApi,
  getQuestionsCommentApi,
  getShippingTypeByCityId,
  getTicketByIdApi,
  getUserFavoriteApi,
  getUserNotificationsApi,
  getUserPurchasesApi,
  getVendorsApi,
  sendNationalInquiryApi,
  updateAddressApi,
  sendNationalVerificationApi,
  getUserApi,
  getAboutApi,
  getAllOrdersApi,
  uploadDocumentApi,
  UploadDocumentPayload,
  CreditRequestPayload,
  createCreditRequestApi,
  deleteAllPurchaseCartItems,
  getInstallmentsApi,
  getInstallmentById,
  updateInstallmentById,
  updateCredit,
  UpdateCreditPayload,
  FinalizeCreditPayload,
  finalizeCredit,
  CreateTicketCommentData,
  getCartById,
  getShippingDeliveryById,
  getSlidersApi,
  getBannersApi,
  remindOrderApi,
  getVendorByIdApi,
  getTermsClient,
  getFaqClient,
} from '../services';
import { CreditDetail, GetUserResponse, UserData } from './type';
import { FaqTypeProps } from '@/components/FAQ/components';

interface AddressApi {
  title: string;
  hood: string;
  postalCode: string;
  pelak: string;
  vahed: string;
  details: string;
  receiverFullName: string;
  receiverPhoneNumber: string;
  province_id: number;
  city_id: number;
  ownReceiver: boolean;
  userId: number;
  lat: number;
  long: number;
}

///////////////////////////////////////////////////////////////
///////////// add - get - post section orders hook //////////
////////////////////////////////////////////////////////////
//getUserOrders

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.orders],
    queryFn: () => getAllOrdersApi(),
  });
};

export const useGetOrders = (status: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ordersByStatus, status],
    queryFn: () => getOrdersApi(status),
    enabled: !!status,
  });
};
//
export const useGetOrdersByUserId = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ordersByUserId, userId],
    queryFn: () => getOrdersByUserIdApi(userId),
    enabled: !!userId,
  });
};

//////////////////////////////////////////////////////////////////////
/////////// add - get - delete section listPurchase hook ////////////
////////////////////////////////////////////////////////////////////
//createUserPurchase
export const useCreateUserPurchase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string }) => {
      return createUserPurchaseApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.purchase] });
    },
    onError: (error) => {},
  });
};

export const useAddToPurchaseList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { listId: number; variantId: number }) => {
      return createProductToPurchaseApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.purchase] });
    },
    onError: (error) => {},
  });
};

//getUserPurchases
export const useUserPurchases = () => {
  const token = Cookies.get('token');
  return useQuery({
    queryKey: [QUERY_KEYS.purchase],
    queryFn: () => getUserPurchasesApi(),
    enabled: !!token,
  });
};

//deleteUserPurchase
export const useDeleteUserPurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (purchaseId: number) => deleteUserPurchaseApi(purchaseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.purchase] });
    },
  });
};

//////////////////////////////////////////////////////////////////////////
///////////////// add - get - delete section listFavorite hook //////////
////////////////////////////////////////////////////////////////////////
//addToFavorites
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) => addToFavoritesApi(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.favorites] });
    },
  });
};

//getUserFavorite
export const useUserFavorite = () => {
  const token = Cookies.get('token');
  return useQuery({
    queryKey: [QUERY_KEYS.favorites],
    queryFn: () => getUserFavoriteApi(),
    enabled: !!token,
  });
};

//deleteUserFavorite
export const useDeleteUserFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (favoriteId: number) => deleteUserFavoriteApi(favoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.favorites] });
      //1
    },
  });
};

////////////////////////////////////////////////////////////////
////////////// add - section Addresses Hooks ///////////////
//////////////////////////////////////////////////////////////

// Addresses Hooks

export const useCreateUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddressApi) => addAddressApi(data),
    onSuccess: (newAddress) => {
      // ریفچ لیست آدرس‌ها
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.address] });

      // آپدیت کوئری آدرس تک
      queryClient.setQueryData([QUERY_KEYS.address, newAddress.id], newAddress);
    },
  });
};

export const useGetAddress = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.address],
    queryFn: getAddressApi,
    // staleTime: 30000,
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAddressApi,
    onSuccess: (updatedAddress) => {
      // ریفچ لیست آدرس‌ها
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.address] });

      // آپدیت داده آدرس تک
      queryClient.setQueryData(
        [QUERY_KEYS.address, updatedAddress.id],
        updatedAddress
      );
    },
  });
};

export const useGetAddressById = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.address, id],
    queryFn: () => getAddressByIdApi(id),
    enabled: !!id,
    staleTime: 30000,
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAddressApi(id),
    onSuccess: (_deletedId) => {
      // ریفچ لیست آدرس‌ها
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.address] });

      // پاک کردن کوئری آدرس تک
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.address, _deletedId] });
    },
  });
};

// Tickets Hooks

export const useGetTickets = (status: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ticket, status],
    queryFn: () => getAllTicketApi(status === 'ALL' ? '' : status),
    enabled: true,
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createTicketApi(formData), // ارسال مستقیم FormData
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ticket] });
    },
  });
};

export const useCreateTicketComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createTicketCommentApi(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ticket] });
    },
    onError: (error) => {},
  });
};
export const useGetTicketsById = (ticketId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ticket, ticketId],
    queryFn: () => getTicketByIdApi(ticketId),
    // enabled: !!ticketId,
  });
};

export const useEditTicketByUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => closeTicketByUserApi(id), // دریافت و ارسال id
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ticket] });
    },
    onError: (error) => {},
  });
};

// Department Hooks

export const useGetDepartment = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.department],
    queryFn: getDepartmentApi,
    staleTime: 30000,
  });
};

// Comments in Profile-User Hooks

// MyQuestion

export const useGetQuestionsComment = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.question],
    queryFn: getQuestionsCommentApi,
  });
};

// MyContent

export const useGetMyContent = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.content],
    queryFn: getMyContentApi,
  });
};
////////////////////////////////////////////////////////////////
////////////// add - section Notifications hook ///////////////
//////////////////////////////////////////////////////////////

//getUserNotifications
export const useUserNotifications = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.broadcasts],
    queryFn: () => getUserNotificationsApi(),
  });
};

////////////////////////////////////////////////////////////////
////////////// add - section Province & Cities Hooks ///////////////
//////////////////////////////////////////////////////////////

// Province & Cities Hooks

export const useGetProvince = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.province],
    queryFn: getAllProvince,
    // staleTime: 30000,
  });
};

export const useGetCities = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.cities, id],
    queryFn: () => getAllCities(id),
    enabled: !!id,
    // staleTime: 30000,
  });
};

// Checkout => Cart Hooks

export const useGetCart = () => {
  const token = Cookies.get('token');
  const { updateCartData } = useCartStore();

  const { isPending, data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.cart],
    queryFn: getAllCartApi,
    enabled: !!token,
  });

  // Update store when cart data changes
  useEffect(() => {
    if (data?.userCarts?.[0]?.items) {
      updateCartData(data.userCarts[0].items);
    } else {
      // Reset cart when no items
      updateCartData([]);
    }
  }, [data, updateCartData]);

  return {
    isPending: token ? isPending : false,
    data,
    ...rest,
  };
};

export const useGetCartById = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.cart, id],
    queryFn: () => getCartById(id),
    enabled: !!id,
  });
};

export const useGetShippingDeliveryById = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.shippingDelivery, id],
    queryFn: () => getShippingDeliveryById(id),
    enabled: !!id,
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePurchaseCartItem(id),
    onSuccess: () => {
      // Invalidate cart queries to trigger refetch
      // The header component will automatically sync the store when the query updates
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cart] });
    },
  });
};

export const useDeleteAllCartItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: string) => deleteAllPurchaseCartItems(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cart] });
    },
  });
};

export const useAddToCartTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { cartId: number; id: number; to: string }) => {
      return addToCartTransactionApi(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.cart],
      });
    },
    onError: (error) => {},
  });
};

// Shipping Hooks

export const useGetShippingTypeByCityId = (cityId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.shipping, cityId],
    queryFn: () => getShippingTypeByCityId(cityId),
    enabled: !!cityId,
  });
};

export const useGetVendors = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.vendor],
    queryFn: getVendorsApi,
  });
};

export const useGetVendorById = (vendorId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.vendor, vendorId],
    queryFn: () => getVendorByIdApi(vendorId),
    enabled: !!vendorId,
  });
};

export const useGetPackaging = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.packaging],
    queryFn: getAllPackagingApi,
  });
};

// order hook
export const useCreateOrder = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.createOrder] });
      // router.push("/checkout/payment"); // مسیر بعد از ساخت سفارش
    },
    onError: (error) => {},
  });
};

// Payment hook
export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPaymentApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.order] });
      // You can add additional success handling here
    },
    onError: (error) => {
      // You can add error handling here (e.g., show toast message)
    },
  });
};

export const useCreatePaymentRedirectUrl = (paymentId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.payment, paymentId],
    queryFn: () => createPaymentRedirectUrl(paymentId),
    // enabled: paymentId !== null && paymentId > 0,
    enabled: !!paymentId,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetCommentsProduct = (id: number) => {
  return useQuery({
    queryKey: ['comments', id],
    queryFn: () => getCommentsProductApi(id),
    enabled: !!id, // فقط وقتی id وجود دارد اجرا شود
  });
};

interface InquiryInput {
  birth_date: string;
  national_id: string;
}
export interface NationalInquiryResponse {
  first_name: string;
  last_name: string;
  father_name: string;
  national_id: string;
  birth_date: string; // اگر بخوای تاریخ دقیق‌تر باشه می‌تونی از Date استفاده کنی
  verified: boolean;
  verification_token: string;
}

interface UseNationalInquiryProps {
  onSuccess: (data: NationalInquiryResponse) => void;
  onError: (error: any) => void;
}
//useNationalInquiry.ts
export const useNationalInquiry = ({
  onSuccess,
  onError,
}: UseNationalInquiryProps) => {
  return useMutation({
    mutationFn: (data: InquiryInput) => sendNationalInquiryApi(data),
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error: (error: any) => void) => {
      onError(error);
    },
  });
};

export const useNationalVerification = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { verification_token: string }) =>
      sendNationalVerificationApi(data),
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
    },
    onError: (error) => {
      onError(error);
    },
  });
};

export const useGetUser = <TData = GetUserResponse>(
  options?: Partial<Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>>
) => {
  return useQuery<TData>({
    queryKey: [QUERY_KEYS.user],
    queryFn: getUserApi as () => Promise<TData>,
    ...options,
  });
};

// FAQ
export const useGetFaq = () => {
  return useQuery<FaqTypeProps[], Error>({
    queryKey: [QUERY_KEYS.faq],
    queryFn: getFaqClient,
  });
};

// Terms
export const useGetTerms = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.terms],
    queryFn: getTermsClient,
  });
};

// About
export const useGetAbout = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.about],
    queryFn: getAboutApi,
  });
};

export const useUploadDocument = () => {
  return useMutation({
    mutationFn: (payload: UploadDocumentPayload) => uploadDocumentApi(payload),
  });
};

export const useCreateCreditRequest = () => {
  return useMutation({
    mutationFn: (payload: CreditRequestPayload) =>
      createCreditRequestApi(payload),
  });
};

export const useGetInstallment = (status: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.credit, status],
    queryFn: () => getInstallmentsApi(status),
    enabled: !!status,
  });
};

export const useGetInstallmentById = (id: string) => {
  return useQuery<CreditDetail>({
    queryKey: [QUERY_KEYS.credit, id],
    queryFn: () => getInstallmentById(id),
    enabled: !!id,
  });
};

export const useUpdateInstallmentById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<any> }) =>
      updateInstallmentById(id, payload),

    onSuccess: (data, variables) => {
      // کش رو آپدیت کن
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.credit, variables.id],
      });
    },
  });
};

export const useUpdateCredit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCreditPayload;
    }) => updateCredit(id, payload),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.credit, variables.id],
      });
    },
  });
};

export const useFinalizeCredit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: FinalizeCreditPayload;
    }) => finalizeCredit(id, payload),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.credit, variables.id],
      });
    },
  });
};

///////////////////// slider hook /////////////////////

export const useGetSliders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.slider],
    queryFn: getSlidersApi,
    enabled: true,
  });
};

export const useGetBanners = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.banner],
    queryFn: getBannersApi,
    enabled: true,
  });
};

// ///// remind order hook //////

export const useRemindOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { variantId: number; method?: string }) => {
      return remindOrderApi(data);
    },
    onSuccess: () => {
      // اگر نیاز داری دیتایی مثل سفارش‌ها رو دوباره fetch کنی
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.remindOrder],
      });
    },
    onError: (error) => {
      console.error('Remind order failed:', error);
    },
  });
};
