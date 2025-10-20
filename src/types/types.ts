import { ProductType } from "@/components/base/product-card/type";

type BreadcrumbItem = {
  href: string;
  iconSrc?: string;
  label: string;
  product: ProductType;
};

type BreadcrumbProps = {
  breadcrumbItems: BreadcrumbItem[];
  className: string;
};

type BlogCardsItem = {
  id: number;
  thumbnail: string;
  title: string;
  subject: string;
  description: string;
  createdAt: string;
};

type BlogCardsProps = {
  BlogCardsItems: BlogCardsItem[];
};

type CommentBoxItem = {
  id: number;
  starNumber: number;
  name: string;
  title: string;
  description: string;
  date: string;
  likes: number;
  dislikes: number;
};

type CommentCardProps = {
  content: string;
  rate: number;
  createdAt: number;
  commentImages: string[];
  productTitle: string;
  productImage: string;
};

export interface InputPropsType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  iconSrc?: string;
  inputClassName?: string;
  iconClass?: string;
  classNameLabel?: string;
  parentClassName?: string;
  id?: string;
  register?: any;
  nameInput?: string;
  as?: "textarea";
}

export interface SectionProps {
  sectionRef: (el: HTMLElement | null) => void;
  product?: ProductType;
}
export interface Order {
  id: number;
  userId: number;
  status: string;
  totalPrice: number;
  itemCount: number; // Keep this for API compatibility, but consider using totalQuantity in the future
  packagingType: string;
  deliveryType: string;
  delivery_code: string | null;
  prePayment: string | null;
  shippingId: number;
  wrappingId: number | null;
  paymentType: string;
  userAddressId: number;
  vendorId: number | null;
  trackingNumber: string | null;
  deliveryId: number | null;
  inProgressStatus: string | null;
  dateOfSend: string | null;
  created_at: string;
  updated_at: string;
  wrapping: any;
  orderItems: OrderItem[];
  payments: any[];
  user: {
    id: number;
    phone_number: string;
    auth_level: number;
    email: string | null;
    account_status: boolean;
    role: string;
    avatar: string | null;
  };
  shipping: {
    id: number;
    name: string;
    description: string;
    price: string;
  };
}

export interface OrderItem {
  productVariant: any;
  id: number;
  orderId: number;
  variantId: number;
  quantity: number;
  serialNumber: string;
  price: number;
  variant: {
    id: number;
    image: string;
    colorId: number;
    stockId: number;
    quantity: number;
    maximumOrder: number;
    partnerMaximumOrder: number;
    partnerMinimumOrder: number;
    customerPrice: string;
    partnerPrice: string;
    customerSpecialPrice: string;
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
    product: {
      id: number;
      title: string;
      sub_title: string;
      slug: string;
      productImages: {
        id: number;
        productId: number;
        url: string;
        thumbnail: boolean;
      }[];
    };
  };
}
