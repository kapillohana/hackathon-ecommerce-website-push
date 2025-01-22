"use client";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";

// Define the shape of the cart context data
interface CartContextType {
  cart: any[];  // You can specify the type of items in the cart if needed
  setCart: React.Dispatch<React.SetStateAction<any[]>>;  // Function to update cart
}

// Set the default value for the context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);  // Your cart state

  const router = useRouter();

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,  // Provide the setter function to update the cart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
