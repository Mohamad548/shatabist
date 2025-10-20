import { OrderItem } from "@/types/types";

export interface CreditResponse {
  id: number;
  main_result: boolean | null;
  description: string | null;
  check_sample_result: boolean | null;
  check_history_result: boolean | null;
  id_card_result: boolean | null;
  max_installment: number | null;
  max_credit: number | null;
  risk_check: string | null;
  risk_number: number | null;
  credit_requestId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Shipping {
  price: number;
  method: string;
}

export interface CreditDetail {
  [x: string]: any;
  id_card_document: any;
  check_sample_document: any;
  id: number;
  id_card: number;
  check_sample: number;
  national_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  request_status: 'pending' | 'approved' | 'rejected';
  userId: number;
  credit: number | null;
  main_check: number | null;
  userAddressId: number | null;
  step: number;
  createdAt: string;
  updatedAt: string;
  credit_response?: CreditResponse[];
  totalPrice?: number;
  installmentCount?: number;
  status?: string;
  orderItems?: OrderItem[];
  shipping?: Shipping;
}

export interface UserData {
  id: number;
  phone_number: string;
  national_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  account_status: boolean;
  birth_date: string;
  auth_level: number;
}

 export interface GetUserResponse {
  user: UserData;
}