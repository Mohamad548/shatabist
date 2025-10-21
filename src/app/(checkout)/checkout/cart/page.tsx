import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سبد خرید | شرکت شتا۲۰",
  description: "مشاهده و مدیریت محصولات انتخاب‌شده در سبد خرید شما در شتا۲۰",
};

const Cart = dynamic(
  () => import("@/components/app/checkout/components/cart"),
  { ssr: false } // فقط در کلاینت رندر شود
);

function CartPage() {
  return (
    <div> سبد خرید
      {/* <Cart /> */}
    </div>
  );
}

export default CartPage;
