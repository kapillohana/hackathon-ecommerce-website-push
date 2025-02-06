"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react"; // Clerk import
import { RedirectToSignIn } from "@clerk/nextjs";

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  instructions: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  paymentMethod?: string;
  easypaisaPhone?: string;
  jazzcashPhone?: string;
  bankDetails?: string;
  creditCardNumber?: string;
  creditCardExpiry?: string;
  creditCardCVC?: string;
}

const CheckoutPage = () => {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [shippingMethod, setShippingMethod] = useState("free");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    instructions: "",
  });
  const [coupon, setCoupon] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [easypaisaPhone, setEasypaisaPhone] = useState("");
  const [jazzcashPhone, setJazzcashPhone] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardExpiry, setCreditCardExpiry] = useState("");
  const [creditCardCVC, setCreditCardCVC] = useState("");
  const router = useRouter();

  // Clerk authentication
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk to load

    if (!isSignedIn) {
      // Redirect to sign-in if not authenticated
      router.push("/sign-in");
      return;
    }

    // Pre-fill shipping info if user is signed in
    if (isSignedIn && user) {
      setShippingInfo({
        name: user.fullName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        instructions: "",
      });
    }
  }, [isLoaded, isSignedIn, router, user]);

  // If Clerk is still loading, show a loading state
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If the user is not signed in, do not render the component
  if (!isSignedIn) {
    return null; // Prevents rendering before redirection
  }

  // Calculate total cart price
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCharge = shippingMethod === "express" ? 250 : 0;
  const discount = coupon === "DISCOUNT10" ? 0.1 * cartTotal : 0; // Example discount
  const totalAmount = cartTotal + shippingCharge - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Error handling for missing fields
    const tempErrors: Errors = {};
    if (!shippingInfo.name) tempErrors.name = "Name is required";
    if (!shippingInfo.email || !/\S+@\S+\.\S+/.test(shippingInfo.email)) tempErrors.email = "Please enter a valid email";
    if (!shippingInfo.phone) tempErrors.phone = "Phone number is required";
    if (!shippingInfo.address) tempErrors.address = "Address is required";
    if (!shippingInfo.city) tempErrors.city = "City is required";
    if (!shippingInfo.state) tempErrors.state = "State is required";
    if (!shippingInfo.zip) tempErrors.zip = "Zip code is required";
    if (!shippingInfo.country) tempErrors.country = "Country is required";
    if (!paymentMethod) tempErrors.paymentMethod = "Payment method is required";

    // Payment method-specific validation
    if (paymentMethod === "easypaisa" && !easypaisaPhone) {
      tempErrors.easypaisaPhone = "EasyPaisa phone number is required";
    }
    if (paymentMethod === "jazzcash" && !jazzcashPhone) {
      tempErrors.jazzcashPhone = "JazzCash phone number is required";
    }
    if (paymentMethod === "bank_transfer" && !bankDetails) {
      tempErrors.bankDetails = "Bank details are required";
    }
    if (paymentMethod === "credit_card") {
      if (!creditCardNumber) tempErrors.creditCardNumber = "Credit card number is required";
      if (!creditCardExpiry) tempErrors.creditCardExpiry = "Expiry date is required";
      if (!creditCardCVC) tempErrors.creditCardCVC = "CVC is required";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      router.push("/order-confirmation");
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderPaymentMethodFields = () => {
    switch (paymentMethod) {
      case "easypaisa":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">EasyPaisa Details</h3>
            <input
              type="text"
              placeholder="Enter EasyPaisa Phone Number"
              value={easypaisaPhone}
              onChange={(e) => setEasypaisaPhone(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none"
            />
            {errors.easypaisaPhone && <p className="text-red-500 text-sm">{errors.easypaisaPhone}</p>}
          </div>
        );
      case "jazzcash":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">JazzCash Details</h3>
            <input
              type="text"
              placeholder="Enter JazzCash Phone Number"
              value={jazzcashPhone}
              onChange={(e) => setJazzcashPhone(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none"
            />
            {errors.jazzcashPhone && <p className="text-red-500 text-sm">{errors.jazzcashPhone}</p>}
          </div>
        );
      case "bank_transfer":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Bank Transfer Details</h3>
            <textarea
              placeholder="Enter Bank Account Details"
              value={bankDetails}
              onChange={(e) => setBankDetails(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none"
            />
            {errors.bankDetails && <p className="text-red-500 text-sm">{errors.bankDetails}</p>}
          </div>
        );
      case "credit_card":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Credit Card Details</h3>
            <input
              type="text"
              placeholder="Card Number"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none mb-4"
            />
            {errors.creditCardNumber && <p className="text-red-500 text-sm">{errors.creditCardNumber}</p>}
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={creditCardExpiry}
              onChange={(e) => setCreditCardExpiry(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none mb-4"
            />
            {errors.creditCardExpiry && <p className="text-red-500 text-sm">{errors.creditCardExpiry}</p>}
            <input
              type="text"
              placeholder="CVC"
              value={creditCardCVC}
              onChange={(e) => setCreditCardCVC(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none mb-4"
            />
            {errors.creditCardCVC && <p className="text-red-500 text-sm">{errors.creditCardCVC}</p>}
          </div>
        );
      case "paypal":
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">PayPal</h3>
            <button
              onClick={() => router.push("/paypal-login")} // Redirect to PayPal login
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login to PayPal
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-[#FF7A28] mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Shipping Information */}
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "phone", "address", "city", "state", "zip", "country"].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={shippingInfo[field as keyof ShippingInfo]}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, [field]: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none"
                />
                {errors[field as keyof Errors] && <p className="text-red-500 text-sm">{errors[field as keyof Errors]}</p>}
              </div>
            ))}
            <textarea
              placeholder="Delivery Instructions (optional)"
              value={shippingInfo.instructions}
              onChange={(e) => setShippingInfo({ ...shippingInfo, instructions: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none"
            />
            {/* Shipping Method */}
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Shipping Method</h3>
            <select
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none"
            >
              <option value="free">Free Shipping (0 PKR)</option>
              <option value="express">Express Shipping (+250 PKR)</option>
            </select>

            {/* Payment Method */}
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Payment Method</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none"
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
              <option value="easypaisa">EasyPaisa</option>
              <option value="jazzcash">JazzCash</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}

            {/* Render payment method-specific fields */}
            {renderPaymentMethodFields()}

            {/* Coupon Code */}
            <h3 className="text-xl font-semibold text-gray-700 mt-4">Coupon Code</h3>
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7A28] outline-none"
            />

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FF7A28] text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-[#e66a1e]"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 rounded-lg p-6 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={`${item._id}-${item.color}`} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <span className="ml-3 text-lg">{item.title}</span>
                </div>
                <span className="text-lg">{item.quantity} x ₨{item.price}</span>
              </div>
            ))}
            <hr />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₨{cartTotal}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Shipping</span>
              <span>₨{shippingCharge}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-lg font-semibold">
                <span>Discount</span>
                <span>-₨{discount}</span>
              </div>
            )}
            <hr />
            <div className="flex justify-between text-xl font-bold">
              <span>Total Amount</span>
              <span>₨{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-center mb-4">Confirm Order</h2>
            <p className="text-lg mb-4">Your total amount is ₨{totalAmount}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-[#FF7A28] text-white rounded-lg hover:bg-[#e66a1e]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;