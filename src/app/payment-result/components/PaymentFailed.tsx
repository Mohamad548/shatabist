
import PaymentResult from "@/components/app/checkout/components/payment-info/PaymentResult";
import { useRouter } from "next/navigation";

interface PaymentFailedProps {
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

const PaymentFailed = ({ trackId, orderId }: PaymentFailedProps) => {
  const router = useRouter();
  return (
    <PaymentResult
      success={false}
      details={[
        { label: "زمان پرداخت", value: getFormattedDateTime() },
        { label: "نوع پرداخت", value: "آنلاین" },
        { label: "درگاه پرداخت", value: "زیبال" },
        { label: "شماره پیگیری", value: trackId || "-" },
        { label: "شماره سفارش", value: orderId || "-" },
      ]}
      onPrimaryAction={() => router.push("/checkout/cart")}
      onSecondaryAction={() => router.push("/")}
      primaryLabel="پرداخت مجدد"
      secondaryLabel="صفحه اصلی"
    />
  );
};

export default PaymentFailed;
