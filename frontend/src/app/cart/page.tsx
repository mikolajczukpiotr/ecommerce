"use client";
import { useCart } from "@/hooks/use-cart";
import { HandCoins, Link, Minus, Plus } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Product, StateProduct } from "@/types/payloadTypes";

const Cart = () => {
  const { items, changeQuantity, removeItem, totalCost, totalItems } =
    useCart();

  const changeQuantityHandler = (productId: string, quantity: number) => {
    changeQuantity(productId, quantity);
  };

  const removeItemHandler = (productId: string) => {
    removeItem(productId);
  };
  if (!items.length) return null;
  return (
    <div className="container text-black gap-5 mx-auto flex px-5 flex-col my-4">
      <div className="flex items-left flex-col">
        <h1 className="text-3xl font-bold">Cart</h1>
        <p className="text-gray-500 dark:text-gray-400">
          You have {totalItems} items in your cart
        </p>
      </div>

      {items.map((product: StateProduct) => {
        return (
          <div
            key={product.id}
            className="flex flex-col md:flex-row w-full items-center justify-between border-2 p-4 gap-4"
          >
            <div className="flex flex-col gap-4 sm:gap-3 md:flex-row items-center -mx-4">
              <Image
                alt=""
                src={
                  product.product.attributes.image.data[0].attributes.url
                    ? `${product.product.attributes.image.data[0].attributes.url}`
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
                <p>SIZE: {product.product.attributes.size}</p>
              </div>
            </div>

            <p className="text-2xl px-4 font-bold text-blue-500 dark:text-gray-400">
              {product.product.attributes.price} PLN
            </p>

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
      <div className="flex w-full justify-between gap-4 text-md font-bold  text-gray-400">
        <div className="flex flex-col">
          <p>apply promocode</p>
          <input
            type="text"
            placeholder="Enter your code"
            className="border-2 uppercase text-sm p-1"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="">Total: {totalCost} PLN</div>
          <button
            type="button"
            className="text-white bg-[#050708] gap-4 text-2xl uppercase hover:bg-[#050708]/80 focus:ring-4 focus:ring-[#050708]/50 font-medium px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
          >
            <a href="/cart/payment">CHECKOUT</a>
            <HandCoins />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
