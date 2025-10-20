import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FinalOrderData {
  deliveryType: string;
  packagingType: string;
  cartId: number;
  shippingId?: number;
  userAddressId?: number;
  vendorId?: number;
  wrapping?: number | null;
}

export interface OrderStore {
  orderData: FinalOrderData | null;
  setOrderData: (data: FinalOrderData, isSwitchChecked: boolean) => void;
  clearOrderData: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orderData: null,

      setOrderData: (data, isSwitchChecked) => {
        const finalData = { ...data };
        if (!isSwitchChecked) delete finalData.wrapping;
        set({ orderData: finalData });
      },

      clearOrderData: () => set({ orderData: null }),
    }),
    {
      name: 'order-storage', // ذخیره در localStorage
    }
  )
);
