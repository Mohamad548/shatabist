import { ReactNode } from 'react';
import { create } from 'zustand';

interface ProductColor {
  variantId: number;
  id: number;
  mainColor: string;
  subColor: string;
  price: number;
  image?: string;
  statuses: {
    freeDelivery: boolean;
    fastDelivery: boolean;
    installmentAvailibility: boolean;
    payOnSite: boolean;            // ← اضافه شد
    isInPersonPurchase: boolean;  // ← اضافه شد
  };
  productId?: number;
}

export interface StatusType {
  freeDelivery: boolean;
  fastDelivery: boolean;
  installmentAvailibility: boolean;
  payOnSite: boolean;            // ← اضافه شد
  isInPersonPurchase: boolean;  // ← اضافه شد
}

interface ColorStore {
  selectedColor: {
    [x: string]: ReactNode;
    mainColor: string;
    subColor: string;
  };
  selectedImage: string;
  selectedPrice: number;
  selectedVariantId: number;
  selectedProductId: number;
  status: StatusType;
  setSelectedColor: (color: ProductColor) => void;
  setInitialColor: (productColors: ProductColor[]) => void;
}

export const useColorStore = create<ColorStore>((set) => ({
  selectedColor: { mainColor: '', subColor: '' },
  selectedImage: '',
  selectedPrice: 0,
  selectedVariantId: 0,
  selectedProductId: 0,
  status: {
    freeDelivery: false,
    fastDelivery: false,
    installmentAvailibility: false,
    payOnSite: false,            // ← مقدار اولیه اضافه شد
    isInPersonPurchase: false,  // ← مقدار اولیه اضافه شد
  },

  setSelectedColor: (color) => {
    set({
      selectedColor: {
        mainColor: color.mainColor,
        subColor: color.subColor,
      },
      selectedImage: color.image || '',
      selectedPrice: color.price,
      selectedVariantId: color.variantId,
      selectedProductId: color.productId || 0,
      status: {
        freeDelivery: color.statuses.freeDelivery,
        fastDelivery: color.statuses.fastDelivery,
        installmentAvailibility: color.statuses.installmentAvailibility,
        payOnSite: color.statuses.payOnSite,                // ← اضافه شد
        isInPersonPurchase: color.statuses.isInPersonPurchase,  // ← اضافه شد
      },
    });
  },

  setInitialColor: (productColors) => {
    if (!productColors || productColors.length === 0) return;

    const lowestPriceColor = productColors.reduce((prev, current) =>
      prev.price < current.price ? prev : current
    );

    set({
      selectedColor: {
        mainColor: lowestPriceColor.mainColor,
        subColor: lowestPriceColor.subColor,
      },
      selectedImage: lowestPriceColor.image || '',
      selectedPrice: lowestPriceColor.price,
      selectedVariantId: lowestPriceColor.variantId,
      selectedProductId: lowestPriceColor.productId || 0,
      status: {
        freeDelivery: lowestPriceColor.statuses.freeDelivery,
        fastDelivery: lowestPriceColor.statuses.fastDelivery,
        installmentAvailibility: lowestPriceColor.statuses.installmentAvailibility,
        payOnSite: lowestPriceColor.statuses.payOnSite,                  // ← اضافه شد
        isInPersonPurchase: lowestPriceColor.statuses.isInPersonPurchase,  // ← اضافه شد
      },
    });
  },
}));
