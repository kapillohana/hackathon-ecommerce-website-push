import { CartProvider } from "../../context/CartContext";

interface GlobalProviderProps {
  children: React.ReactNode; // Define the type of children
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  return <CartProvider>{children}</CartProvider>;
}
