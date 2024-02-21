import Link from "next/link";
import React from "react";

const DeniedPage = () => {
  return (
    <div className="flex flex-col text-black items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Purchase Denied</h1>
      <p className="text-lg mb-8">
        Your order has been denied. Please contact support for more information.
      </p>
      <Link href="/" className="text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
};

export default DeniedPage;
