// parent
export interface UserCart {
  id: number;
  userId: number;
  prioIndex: number;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  cartId: number;
  variantId: number;
  quantity: number;
  productVariant: ProductVariant;
}

interface ProductVariant {
  id: number;
  image: string;
  colorId: number;
  stockId: number;
  quantity: number;
  installmentAvailibility: boolean;
  fastDelivery: boolean;
  freeDelivery: boolean;
  maximumOrder: number;
  partnerMaximumOrder: number;
  partnerMinimumOrder: number;
  customerPrice: string;
  partnerPrice: string;
  customerSpecialPrice: string;
  partnerSpecialPrice: string;
  discount: string;
  productId: number;
  color: {
    id: number;
    mainColor: string;
    subColor: string;
    color: string;
  };
  stock: {
    id: number;
    name: string;
    uniqueCode: string;
  };
  productVariantProperties: {
    id: number;
    label: string;
    value: string;
    variantId: number;
  }[];

  product: {
    [x: string]: string | number | undefined;
    id: number;
    title: string;
  };
}

export interface CartComponentsProps {
  items: CartItem[];
  isPending: boolean;
}
