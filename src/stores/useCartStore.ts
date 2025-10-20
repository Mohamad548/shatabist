import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  totalPrice: number;
  totalQuantity: number;
  shippingCost: number;
  packagingCost: number;
  giftWrapCost: number;
  cartId: string | null;
  setTotalPrice: (price: number) => void;
  setTotalQuantity: (quantity: number) => void;
  setShippingCost: (price: number) => void;
  setPackagingCost: (price: number) => void;
  setGiftWrapCost: (price: number) => void;
  setCartId: (cartId: string) => void;
  clearCartId: () => void;
  updateCartData: (items: any[]) => void;
  resetCart: () => void;
}

const initialState = {
  totalPrice: 0,
  totalQuantity: 0,
  shippingCost: 0,
  packagingCost: 0,
  giftWrapCost: 0,
  cartId: null,
};

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      ...initialState,
      setTotalPrice: (price) => set({ totalPrice: price }),
      setTotalQuantity: (quantity) => set({ totalQuantity: quantity }),
      setShippingCost: (price) => set({ shippingCost: price }),
      setPackagingCost: (price) => set({ packagingCost: price }),
      setGiftWrapCost: (price) => set({ giftWrapCost: price }),
      setCartId: (cartId) => set({ cartId }),
      clearCartId: () => set({ cartId: null }),
      updateCartData: (items) => {
        const quantity =
          items?.reduce((total, item) => total + (item.quantity ?? 0), 0) ?? 0;
        set({ totalQuantity: quantity });
      },
      resetCart: () => set({ ...initialState }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage), // ✅ این خط درست است
    }
  )
);
