"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

type CartItem = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  setCart: (cart: CartItem[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCartState] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Only execute this on the client side
  useEffect(() => {
    setIsClient(true);
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartState(JSON.parse(storedCart));
    }
  }, []);

  const setCart = (newCart: CartItem[]) => {
    setCartState((prevCart) => {
      if (JSON.stringify(prevCart) !== JSON.stringify(newCart)) {
        localStorage.setItem("cart", JSON.stringify(newCart)); // Persist only if the cart has changed
        return newCart;
      }
      return prevCart;
    });
  };

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
  };

  if (!isClient) {
    return null; // Prevent rendering during SSR
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
