"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define the structure of a cart item
type CartItem = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
};

// Define the structure of the cart context
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  setCart: (cart: CartItem[]) => void;
  clearCart: () => void;
  checkout: () => Promise<{ success: boolean; message: string }>;
};

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component to wrap around your app
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCartState] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    setIsClient(true);
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (JSON.stringify(parsedCart) !== JSON.stringify(cart)) {
          setCartState(parsedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Helper function to update cart and persist in localStorage
  const updateCart = (newCart: CartItem[]) => {
    setCartState((prevCart) => {
      if (JSON.stringify(prevCart) === JSON.stringify(newCart)) return prevCart;
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Add item to cart (updates quantity if already exists)
  const addToCart = (item: CartItem) => {
    setCartState((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedCart = [...prevCart, item];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Remove item from cart safely
  const removeFromCart = (id: string) => {
    setCartState((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Set cart with new values (ensuring minimal updates)
  const setCart = (newCart: CartItem[]) => {
    updateCart(newCart);
  };

  // Clear the cart safely
  const clearCart = () => {
    setCartState((prevCart) => {
      if (prevCart.length === 0) return prevCart;
      localStorage.removeItem("cart");
      return [];
    });
  };

  // Simulate checkout process
  const checkout = async (): Promise<{ success: boolean; message: string }> => {
    if (cart.length === 0) {
      return { success: false, message: "Your cart is empty. Add items before checkout." };
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        clearCart();
        resolve({ success: true, message: "Checkout successful! Thank you for your order." });
      }, 2000);
    });
  };

  // Prevent rendering on SSR (Server-Side Rendering)
  if (!isClient) {
    return null;
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setCart, clearCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context in components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
