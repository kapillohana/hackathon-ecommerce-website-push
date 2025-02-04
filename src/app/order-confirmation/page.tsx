"use client"
import { useRouter } from "next/navigation"; // Updated import
import React, { useEffect } from "react";

const OrderConfirmationPage = () => {
  const router = useRouter();

  useEffect(() => {
    // You can redirect to the homepage or another page after confirmation.
    setTimeout(() => {
      router.push("/"); // Redirect to homepage (or another page if needed)
    }, 5000); // Redirect after 5 seconds
  }, [router]);

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-[#FF7A28] mb-8">
        Order Confirmation
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Thank you for your order!
        </h2>
        <p className="text-center text-lg text-gray-600 mb-4">
          Your order has been successfully placed. We are processing it and will notify you
          once it's ready for shipping.
        </p>
        <p className="text-center text-gray-500">
          You will be redirected to the homepage shortly. If not, click{" "}
          <a href="/" className="text-[#FF7A28] underline">
            here
          </a>{" "}
          to go to the homepage now.
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
