"use client";
import React, { FormEvent, useState } from "react";
import { useInitialRender } from "@/utils/useInitialRender";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { v4 as uuid } from "uuid";
import { useCart } from "@/hooks/use-cart";
import { validateForm } from "@/utils/validate";
import { sendOrderToBackend } from "@/utils/getData";
import CustomInput from "./Input";

const options = {
  style: {
    base: {
      fontSize: "32px",
      color: "black",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2521",
    },
  },
};

const INITIAL_STATE = {
  address: "",
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  state: "",
  error: "",
};

const inputFields = [
  {
    id: "firstName",
    type: "text",
    name: "firstName",
    placeholder: "Enter your first name",
  },
  {
    id: "lastName",
    type: "text",
    name: "lastName",
    placeholder: "Enter your last name",
  },
  {
    id: "email",
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    id: "address",
    type: "text",
    name: "address",
    placeholder: "Enter your address",
  },
  { id: "city", type: "text", name: "city", placeholder: "Enter your city" },
  { id: "state", type: "text", name: "state", placeholder: "Enter your state" },
];

export default function CheckoutForm() {
  const [data, setData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const { items, totalCost, clearCart } = useCart();

  const initialRender = useInitialRender();

  const stripe = useStripe();
  const elements = useElements();

  if (!initialRender) return null;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }

  async function submitOrder(e: FormEvent) {
    e.preventDefault();
    const cardElement = elements?.getElement(CardElement);
    const token = await stripe?.createToken(cardElement);
    const validationErrors = validateForm(data, token);
    if (validationErrors) {
      setData({ ...data, error: validationErrors });
      return;
    }
    try {
      setLoading(true);
      const response = await sendOrderToBackend(data, items, totalCost, token);
      if (!response.ok) {
        throw new Error("Failed to submit order");
      }
      // setData(INITIAL_STATE);
      // clearCart();
    } catch (error: any) {
      setData({ ...data, error: { message: error.message } });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className=" mx-auto p-4 md:p-6 my-10 ">
      <h1 className="text-2xl font-bold text-center">Your Information</h1>
      <div className="space-y-6">
        {inputFields.map((field) => (
          <CustomInput
            key={field.id}
            id={field.id}
            name={field.name}
            placeholder={field.placeholder}
            onChange={onChange}
          />
        ))}
        {data.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>{" "}
            <span className="block sm:inline">{data.error.message}</span>
          </div>
        )}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Credit or debit card
          </label>
          <div className="mt-1">
            <CardElement
              options={options}
              className="p-2 border border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={(e) => submitOrder(e)}
            disabled={loading}
            className="text-white bg-[#050708] gap-4 text-2xl uppercase hover:bg-[#050708]/80 focus:ring-4 focus:ring-[#050708]/50 font-medium px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
          >
            {loading ? "Submitting" : "Submit Order"}
          </button>
        </div>
      </div>
    </form>
  );
}
