"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, removeFromCart, setCart } = useCart();
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, [setCart]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addToCart = (newItem: any) => {
    const isProductInCart = cart.some(
      (item) => item._id === newItem._id && item.color === newItem.color
    );

    if (isProductInCart) {
      showNotification("Product already added to cart!");
      return;
    }

    const updatedCart = [...cart, { ...newItem, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    showNotification("Product added to cart!");
  };

  const increaseQuantity = (_id: string, color: string | undefined) => {
    setLoading(true);
    const updatedCart = cart.map((item) =>
      item._id === _id && item.color === color
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const decreaseQuantity = (_id: string, color: string | undefined) => {
    setLoading(true);
    const updatedCart = cart.map((item) =>
      item._id === _id && item.color === color && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <div className="container mx-auto py-10 flex flex-col lg:flex-row">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-center text-[#FF7A28] mb-8">
          Your Shopping Cart
        </h1>
        {cart.length === 0 ? (
          <p className="text-center text-xl text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="spinner-border animate-spin w-16 h-16 border-4 border-solid border-[#FF7A28] rounded-full"></div>
              </div>
            ) : (
              <table className="w-full table-auto shadow-lg rounded-lg">
                <thead className="bg-[#FF7A28] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Product</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-right">Quantity</th>
                    <th className="px-6 py-4 text-right">Subtotal</th>
                    <th className="px-6 py-4 text-right">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={`${item._id}-${item.color}`} className="border-b hover:bg-gray-100">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        {item.title} {item.color && <span>({item.color})</span>}
                      </td>
                      <td className="px-6 py-4 text-right text-lg font-semibold">
                        Rs: {item.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right flex items-center justify-center gap-4">
                        <button
                          onClick={() => decreaseQuantity(item._id, item.color)}
                          className="px-4 py-2 bg-gray-300 rounded-l-md text-xl transition-all duration-300 ease-in-out"
                        >
                          -
                        </button>
                        <span className="text-xl">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item._id, item.color)}
                          className="px-4 py-2 bg-gray-300 rounded-r-md text-xl transition-all duration-300 ease-in-out"
                        >
                          +
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right text-lg font-semibold">
                        Rs: {(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 font-semibold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      <div className="lg:w-1/3 lg:ml-8 mt-10 lg:mt-32">
        <div className="bg-white p-6 rounded-lg shadow-lg sticky top-0">
          <h2 className="text-2xl font-semibold text-[#FF7A28] mb-6">
            Order Summary
          </h2>
          <div className="flex justify-between mb-4">
            <p className="text-lg font-medium">Total</p>
            <p className="text-lg font-semibold">
              Rs: {calculateTotal().toLocaleString()}
            </p>
          </div>
          <button
            className="w-full py-3 bg-[#FF7A28] text-white text-xl font-semibold rounded-md hover:bg-orange-600"
            onClick={() => router.push('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {notification && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg transition-opacity duration-500">
          {notification}
        </div>
      )}
    </div>
  );
};

export default CartPage;
