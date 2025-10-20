export interface CommentImage {
  id: number;
  imageUrl: string;
  type: string;
}
interface CategoryPathSegment {
  title: string;
  slug: string;
}

export interface Comment {
  id: number;
  userName: string;
  commentTitle: string;
  likes: number;
  dislikes: number;
  commentDate: string;
  description: string;
  commment_images: CommentImage[];
}

export interface ProductVariantProperty {
  property_value: any;
  id: number;
  label: string;
  value: string;
  variantId: number;
  priorityIndex: number;
}

export interface Stock {
  id: number;
  name: string;
  uniqueCode?: string;
}

export interface Color {
  [x: string]: any;
  id: number;
  mainColor: string;
  subColor: string;
  color: string;
}

export interface ProductImage {
  alt: string;
  id: number;
  productId: number;
  url: string;
  thumbnail: boolean;
  type?: string;
}

export interface ProductVariant {
  iframe: boolean;
  isInPersonPurchase: any;
  payOnSite: any;
  id: number;
  image: string;
  colorId: number;
  stockId: number;
  quantity: number;
  installmentAvailibility: boolean | null;
  fastDelivery?: boolean;
  freeDelivery?: boolean;
  maximumOrder: number;
  partnerMaximumOrder: number;
  partnerMinimumOrder: number;
  customerPrice: string;
  partnerPrice: string;
  customerSpecialPrice: string;
  partnerSpecialPrice: string;
  discount: string;
  productId: number;
  color: Color;
  stock: Stock;
  productVariantProperties: ProductVariantProperty[];
  current?: CategoryPathSegment;
}

export interface ProductProperty {
  [x: string]: any;
  productId?: number;
  propertyId?: number;
  description?: string;
  priority?: boolean;
  title?: string;
  categoryid?: number;
}

export interface CategoryChild {
  id: number;
  title: string;
  icon: string;
  slug: string;
  parentId: number;
  children: CategoryChild[];
}

export interface Category {
  id: number;
  title: string;
  icon: string;
  slug?: string;
  parentId?: number | null;
  parent?: Category | null;
  children?: CategoryChild[];
}

export interface Brand {
  id: number;
  title: string;
  logo: string;
  slug: string;
}

export interface Serie {
  id: number;
  brandId: number;
  title: string;
  description: string;
}

export interface ProductType {
  [x: string]:
    | number
    | string
    | undefined
    | boolean
    | number[]
    | null
    | Comment[]
    | ProductVariant[]
    | ProductImage[]
    | Brand
    | Category
    | Serie
    | ProductProperty[]
    | { comments: number }
    | undefined;
  id: number;
  title: string;
  sub_title?: string;
  description?: string;
  short_description?: string;
  brandId?: number;
  publish?: boolean;
  slug?: string;
  relatedProductsIds?: number[] | null;
  tagIds?: number[] | null;
  shippingIds?: string;
  serieId?: number;
  categoryId?: number;
  created_at?: string;
  comments?: Comment[];
  productVariants?: ProductVariant[];
  productImages?: ProductImage[];
  brand?: Brand;
  category?: Category;
  serie?: Serie;
  productProperties?: ProductProperty[];
  _count?: {
    comments: number;
  };
}
