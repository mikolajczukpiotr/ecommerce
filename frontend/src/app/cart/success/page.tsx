import Link from "next/link";
import React from "react";

const SuccessPage = () => {
  return (
    <div className="flex text-black flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Thank you for your purchase!</h1>
      <p className="text-lg mb-8">
        Your order has been placed successfully and will be on its way soon.
      </p>
      <Link href="/" className="text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
