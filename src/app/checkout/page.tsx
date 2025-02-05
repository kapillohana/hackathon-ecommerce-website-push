"use client";
import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
}

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
  const router = useRouter();

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
      // Redirect to the confirmation page after 2 seconds
      router.push("/order-confirmation");
    }, 2000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
              <div key={`${item._id}-${item.color}`} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.title} width={60} height={60} className="rounded-lg" />
                  <div>
                    <p className="text-gray-800 font-medium">{item.title}</p>
                    {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">Rs: {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Pricing Details */}
          <div className="mt-6 space-y-2 text-lg text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Rs: {cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shippingCharge > 0 ? `Rs: ${shippingCharge}` : "Free"}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>{discount > 0 ? `Rs: -${discount.toLocaleString()}` : "No Discount"}</span>
            </div>
            <hr className="border-gray-300 my-3" />
            <div className="flex justify-between font-semibold text-xl">
              <span>Total:</span>
              <span>Rs: {totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
            <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">Confirm Your Order</h3>
            <p className="text-gray-600 mb-4">Please confirm that all the information is correct before submitting your order.</p>
            <div className="flex justify-between">
              <button onClick={handleCloseModal} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">Cancel</button>
              <button onClick={handleConfirm} className="bg-[#FF7A28] text-white py-2 px-4 rounded-md">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;