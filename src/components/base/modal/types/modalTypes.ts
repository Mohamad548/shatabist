import { AddressType } from "@/constants/mock-data/profile";
import { Dispatch, ReactNode, SetStateAction } from "react";
export interface modalTypes {
  children:
    | React.ReactNode
    | ((props: { closeModal: () => void }) => React.ReactNode);

  triggerContent?: ReactNode; // ✅ اختیاری شد
  mode?: "edit" | "delete";
  actionLabel?: ReactNode;
  cancelLabel?: ReactNode;
  actionBtnClass?: string;
  cancelBtnClass?: string;
  modalBodyClass?: string;
  actionBoxClass?: string;
  cancelBoxClass?: string;
  onConfirm?: (closeModal: () => void) => void;
  setTempSelectedAddress?: any;
  selectedAddress?: AddressType | null;
  fadeIn?: string;
  fadeOut?: string;
  moodCheckout?: boolean;
  setStep?: (value: boolean) => void;
  classNameTrigger?: string;
  triggerClass?: string;
  requireAuth?: boolean;
  confirmLoading?: boolean;
  onClose?: () => void;
   onOpen?: () => void;
  className?: string;
   activeOverlay?: boolean;
  onCancel?: (closeModal: () => void) => void; 
  isNested?: boolean;
classNameModale?:string
}
