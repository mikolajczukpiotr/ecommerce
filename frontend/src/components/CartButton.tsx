"use client";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import React from "react";

const CartButton = () => {
  const { totalItems } = useCart();
  return (
    <Link
      href="/cart"
      className="inline-flex items-center  text-base mt-4 md:mt-0"
    >
      KOSZYK {totalItems > 0 && `(${totalItems})`}
    </Link>
  );
};

export default CartButton;
