"use client";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Product, StateProduct } from "@/types/payloadTypes";

const Cart = () => {
  const { items, changeQuantity, removeItem, clearCart } = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalCost = items.reduce(
    (acc, item) => acc + item.product.attributes.price * item.quantity,
    0
  );
  const changeQuantityHandler = (productId: string, quantity: number) => {
    changeQuantity(productId, quantity);
  };

  const removeItemHandler = (productId: string) => {
    removeItem(productId);
  };

  return (
    <div className="text-black h-screen mx-12 my-6 xl:m-auto flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Cart</h1>
      <p className="text-gray-500 dark:text-gray-400">
        You have {totalItems} items in your cart
      </p>

      {items.map((product: StateProduct) => {
        return (
          <div
            key={product.id}
            className="flex flex-col md:flex-row items-center justify-between border-2 p-4"
          >
            <div className="flex flex-col gap-6 sm:gap-3 md:flex-row items-center -mx-4">
              <Image
                alt=""
                src={
                  product.product.attributes.image.data[0].attributes.url
                    ? `http://localhost:1337${product.product.attributes.image.data[0].attributes.url}`
                    : "https://dummyimage.com/400x400"
                }
                width="200"
                height="200"
                className="object-contain w-32 m-3"
              />
              <div className="text-gray-500">
                <h2 className="mb-2 text-xl font-bold">
                  {product.product.attributes.name}
                </h2>
                <p className="text-center">
                  SIZE: {product.product.attributes.size}
                </p>
              </div>
            </div>

            <div className=" px-4">
              <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                {product.product.attributes.price} PLN
              </p>
            </div>

            <div className="px-4">
              <div className="flex items-center px-4  font-semibold text-gray-500 border  rounded-md border-gray-700 ">
                <button
                  className="py-2 hover:text-gray-700 text-gray-400"
                  onClick={() => {
                    if (product.quantity > 1) {
                      changeQuantityHandler(product.id, product.quantity - 1);
                    } else {
                      removeItem(product.id);
                    }
                  }}
                >
                  <Minus />
                </button>
                <select
                  id={product.product.id.toString()}
                  className="px-2 w-20 py-4 text-center border-0 rounded-md bg-gray-100"
                  value={product.quantity}
                  onChange={(e) => {
                    if (e.target.value === "Remove") {
                      removeItemHandler(product.id);
                    } else {
                      changeQuantityHandler(product.id, +e.target.value);
                    }
                  }}
                >
                  <option value="Remove">Remove</option>
                  {Array.from(Array(10).keys()).map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>

                <button
                  className="py-2 hover:text-gray-700 text-gray-400"
                  onClick={() =>
                    changeQuantityHandler(product.id, product.quantity + 1)
                  }
                >
                  <Plus />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
