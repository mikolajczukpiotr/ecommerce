"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useInitialRender } from "@/utils/useInitialRender";
import CheckoutForm from "@/components/CheckoutForm";
import { useCart } from "@/hooks/use-cart";
const stripePromise = loadStripe(
  "pk_test_51OUwGBLmHZc9lLCcIes5c6QEQUeIQCPOWIyHBdFPXjHSqSE1qitcWS0GxmXz4QROtmHL82aO5hI4WnCEHeOA5QAi00SGBZwbGu"
);

export default function Checkout() {
  const { items, totalCost, clearCart } = useCart();
  const initialRender = useInitialRender();
  if (!initialRender) return null;

  return (
    <section className="container mx-auto py-24">
      <div className="flex-row gap-4">
        <div className="w-1/2">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
        <div className="w-1/2 text-black">
          <h1 className="text-3xl uppercase font-bold">Summary</h1>
          <div className="flex justify-between">
            <p>Total cost:</p>
            <p>{totalCost} PLN</p>
          </div>
          {items.map((product) => (
            <div key={product.id} className="flex justify-between">
              <p>{product.product.attributes.name}</p>
              <p>{product.quantity}</p>
              <p>{product.product.attributes.price} PLN</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
