"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AvailableSizes, CartItem, addToCart } from "@/redux/slices/CartSlice";

interface RootState {
  cart: {
    cartItems: CartItem[];
  };
}

interface AddToCartProps {
  product: CartItem;
  redirect?: boolean;
  increasePerClick?: boolean;
}

export default function AddToCart({
  product,
  redirect = false,
  increasePerClick = false,
}: AddToCartProps) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [selectedSize, setSelectedSize] =
    useState<keyof AvailableSizes>("Medium");
  const [selectedColor, setSelectedColor] = useState<string>(
    Object.keys(product.availableColors)[0]
  );

  const addToCartHandler = () => {
    console.log("jajco");
    console.log(selectedSize);
    let newQty = product.availableSizes[selectedSize];
    console.log(newQty, "newQty");
    if (increasePerClick) {
      const existItem = cartItems.find((x) => x.slug === product.slug);
      if (existItem) {
        if (existItem.qty + 1 <= product.availableSizes[selectedSize]) {
          newQty = existItem.qty + 1;
        } else {
          return alert("No more product exist");
        }
      }
    }
    dispatch(addToCart([{ ...product, qty: newQty, color: selectedColor }]));
  };
  console.log(product.availableSizes[selectedSize]);
  console.log(product, "product");
  return (
    <div className="flex flex-col gap-2">
      <select
        onChange={(e) =>
          setSelectedSize(e.target.value as keyof AvailableSizes)
        }
        className="uppercase border-2 border-black w-fit"
      >
        {Object.entries(product.availableSizes)
          .filter(([key]) => key !== "id")
          .map(([size]) => (
            <option
              key={size}
              value={size}
              onChange={() => setSelectedSize(size as keyof AvailableSizes)}
            >
              {size}
            </option>
          ))}
      </select>
      <div className="flex space-x-4">
        {product &&
          product.availableColors &&
          Object.entries(product.availableColors).filter(
            ([key, value]) => key !== "id" && value
          ).length > 1 &&
          Object.entries(product.availableColors)
            .filter(([key, value]) => key !== "id" && value)
            .map(([color]) => (
              <div
                key={color}
                className={`h-7 w-7 rounded-full bg-${color} cursor-pointer ${
                  selectedColor === color ? "ring-2 ring-black" : ""
                }`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
      </div>
      <button
        type="button"
        onClick={() => addToCartHandler()}
        className="w-fit text-white bg-black hover:bg-gray-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
      >
        <svg
          className="w-3.5 h-3.5 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 21"
        >
          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
        </svg>
        Add to cart
      </button>
    </div>
  );
}
