export interface Color {
  id: number;
  mainColor: string;
  subColor: string;
  color: string; // رنگ به فرمت RGB
}

export interface Stock {
  id: number;
  name: string;
  uniqueCode: string;
}

export interface ProductVariant {
  color: Color;
  stock: Stock;
  productVariantProperties: any[]; // می‌تونی دقیق‌تر هم تعریف کنی
}

export interface UserCartItem {
  id: number;
  cartId: number;
  variantId: number;
  quantity: number;
  productVariant: ProductVariant;
}

export interface UserCart {
  id: number;
  userId: number;
  prioIndex: number;
  items: UserCartItem[];
}

export interface GetCartResponse {
  userCarts: UserCart[];
  success: boolean;
}
