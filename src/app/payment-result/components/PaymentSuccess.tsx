
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCartStore } from "@/stores/useCartStore";
import PaymentResult from "@/components/app/checkout/components/payment-info/PaymentResult";

interface PaymentSuccessProps {
  trackId: string | null;
  orderId: string | null;
}

const getFormattedDateTime = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("fa-IR");
  return `${date} - ${time}`;
};

const PaymentSuccess = ({ trackId, orderId }: PaymentSuccessProps) => {
  const router = useRouter();
  useEffect(() => {
    // Clear cartId from persisted store when payment succeeds
    useCartStore.getState().clearCartId();
  }, []);
  return (
    <PaymentResult
      success={true}
      details={[
        { label: "زمان پرداخت", value: getFormattedDateTime() },
        { label: "نوع پرداخت", value: "آنلاین" },
        { label: "درگاه پرداخت", value: "زیبال" },
        { label: "شماره پیگیری", value: trackId || "-" },
        { label: "شماره سفارش", value: orderId || "-" },
      ]}
      onPrimaryAction={() => router.push(`/profile-user/orders/${orderId}`)}
      onSecondaryAction={() => router.push("/")}
      primaryLabel="جزئیات سفارش"
      secondaryLabel="صفحه اصلی"
    />
  );
};

export default PaymentSuccess;
