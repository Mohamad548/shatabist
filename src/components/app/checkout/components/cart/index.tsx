"use client";

import TabManager from "@/components/base/tab-manager";
import React, { useEffect } from "react";
import CartComponents from "@/components/app/checkout/components/cart/components/cart-components/index";
import NextPurchase from "./components/next_purchase";
import { useGetCart } from "@/components/app/profile-user/hooks";
import { CartItem, UserCart } from "../type";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/stores/useCartStore";

function Cart() {
  const { data, isPending: isPendingCart } = useGetCart();
  const userCarts = data?.userCarts || [];
  const searchParams = useSearchParams();
  const urlCartId = searchParams.get("id");
  const { setCartId } = useCartStore();

  // Store cartId from URL if present
  useEffect(() => {
    if (urlCartId) {
      setCartId(urlCartId);
    }
  }, [urlCartId, setCartId]);

  const getItemsByPrio = (carts: UserCart[], prios: number[]): CartItem[] =>
    carts
      .filter((cart) => prios.includes(cart.prioIndex))
      .flatMap((cart) => cart.items);

  const currentCartItems = getItemsByPrio(userCarts, [0, 5]);
  const nextPurchaseItems = getItemsByPrio(userCarts, [1]);

  const tabs = [
    {
      id: "cart",
      label: "سبد خرید",
      content: (
        <CartComponents items={currentCartItems} isPending={isPendingCart} />
      ),
    },
    {
      id: "next_purchase",
      label: "خرید بعدی",
      content: (
        <NextPurchase items={nextPurchaseItems} isPending={isPendingCart} />
      ),
    },
  ];

  return (
    <div className="bg-white top-44 lg:px-40 md:px-20 px-4 py-6 text-sm md:text-base ">
      <TabManager
        tabs={tabs}
        defaultTab="cart"
        queryParamName="activeTab"
        backPath="/profile-user"
        isHead={false}
      />
    </div>
  );
}

export default Cart;
