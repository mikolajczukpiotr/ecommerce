"use client";
import { useCart } from "@/hooks/use-cart";
import { Product, availableSizes } from "@/types/payloadTypes";
import { CheckCircle, ShoppingCart, X } from "lucide-react";
import React, { useState } from "react";

export default function AddToCart({
  product,
  redirect = false,
  increasePerClick = false,
}: {
  product: Product;
  redirect?: boolean;
  increasePerClick?: boolean;
}) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] =
    useState<keyof availableSizes>("Medium");
  const [selectedColor, setSelectedColor] = useState<string>(
    Object.keys(product.attributes.availableColors)[0]
  );
  const isSoldOut = product.attributes.availableSizes[selectedSize] === 0;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isSoldOut) {
      addItem({
        ...product,
        attributes: {
          ...product.attributes,
          size: selectedSize,
          color: selectedColor,
        },
      });
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 1500); // Reset after 2 seconds
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <select
        onChange={(e) =>
          setSelectedSize(e.target.value as keyof availableSizes)
        }
        className="uppercase border-2 border-black w-fit"
      >
        {Object.entries(product.attributes.availableSizes)
          .filter(([key]) => key !== "id")
          .map(([size]) => (
            <option
              key={size}
              value={size}
              onChange={() => setSelectedSize(size as keyof availableSizes)}
            >
              {size}
            </option>
          ))}
      </select>
      <div className="flex space-x-4">
        {product &&
          product.attributes.availableColors &&
          Object.entries(product.attributes.availableColors).filter(
            ([key, value]) => key !== "id" && value
          ).length > 1 &&
          Object.entries(product.attributes.availableColors)
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
        onClick={handleClick}
        disabled={isSoldOut}
        className={`uppercase w-fit text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 transition-colors duration-300 ${
          isSoldOut
            ? "bg-red-800 hover:bg-red-600 "
            : isClicked
            ? "bg-green-500 hover:bg-green-700 animate-fade-in"
            : "bg-black hover:bg-gray-800 animate-fade-out"
        }`}
      >
        {isSoldOut ? <X /> : isClicked ? <CheckCircle /> : <ShoppingCart />}
        {isSoldOut ? (
          <p>Sold out</p>
        ) : isClicked ? (
          <p>Added!</p>
        ) : (
          <p>Add to cart</p>
        )}
      </button>
    </div>
  );
}
