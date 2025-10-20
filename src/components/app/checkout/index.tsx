// components/CheckoutSidebar.tsx
"use client";
import Stepper from "@/components/base/stepper";
import React from "react";

const checkoutSteps = [
  {
    id: 1,
    label: "سبد خرید",
    defaultIcon: "/svg/shopping-cart.svg",
    activeIcon: "/svg/shopping-cart-white.svg",
    completedIcon: "/svg/shopping-cart-green.svg",
    href: "/checkout/cart",
  },
  {
    id: 2,
    label: "اطلاعات ارسال",
    defaultIcon: "/svg/group-checkout.svg",
    activeIcon: "/svg/group-white.svg",
    completedIcon: "/svg/group-green.svg",
    href: "/checkout/shipping",
  },
  {
    id: 3,
    label: "پرداخت",
    defaultIcon: "/svg/receipt-item.svg",
    activeIcon: "/svg/receipt-item-white.svg",
    completedIcon: "/svg/receipt-item-green.svg",
    href: "/checkout/payment",
  },
];

export default function CheckoutSidebar() {
  return (
    <div className="w-full bg-gray-50 p-4 ">
      <Stepper steps={checkoutSteps} />
    </div>
  );
}
