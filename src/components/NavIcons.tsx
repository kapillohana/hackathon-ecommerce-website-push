"use client";

import { FaRegUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useCart } from "../../context/CartContext"; // Import useCart hook

const NavIcons = () => {
  const { cart } = useCart(); // Get the cart from the context

  return (
    <div className="md:flex flex-row gap-10 hidden">
      <Link href="/profile" passHref>
        <FaRegUser className="h-6 w-6 text-black cursor-pointer" />
      </Link>
      <Link href="/search" passHref>
        <FiSearch className="h-6 w-6 text-black cursor-pointer" />
      </Link>
      {/* Link the heart icon to the wishlist page */}
      <Link href="/wishlist" passHref>
        <FaRegHeart className="h-6 w-6 text-black cursor-pointer" />
      </Link>
      <div>
        <Link href="/cart" passHref> 
          <div className="relative">
            <MdOutlineShoppingCart className="h-6 w-6 text-black cursor-pointer" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
                {cart.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavIcons;