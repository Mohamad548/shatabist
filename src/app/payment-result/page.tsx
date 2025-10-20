"use client";

import { useSearchParams } from "next/navigation";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";

export default function PaymentResult() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const trackId = searchParams.get("trackId");
  const orderId = searchParams.get("orderId");

  //

  return (
    <div className="min-h-screen flex items-center justify-center mx-4 ">
      {success === "1" ? (
        <PaymentSuccess trackId={trackId} orderId={orderId} />
      ) : (
        <PaymentFailed trackId={trackId} orderId={orderId} />
      )}
    </div>
  );
}
