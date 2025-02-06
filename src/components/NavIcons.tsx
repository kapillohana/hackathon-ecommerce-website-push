"use client";

import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useCart } from "../../context/CartContext"; // Import useCart hook
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

const NavIcons = () => {
  const { cart } = useCart(); // Get the cart from the context
  const { isSignedIn } = useUser(); // Check if the user is signed in

  return (
    <div className="md:flex flex-row gap-10 hidden items-center">
      

      {/* Search Icon */}
      <Link href="/search" passHref>
        <FiSearch className="h-7 w-6 text-black cursor-pointer" />
      </Link>

      {/* Wishlist Icon */}
      <Link href="/wishlist" passHref>
        <FaRegHeart className="h-7 w-6 text-black cursor-pointer" />
      </Link>

      {/* Cart Icon with Item Count */}
      <div>
        <Link href="/cart" passHref>
          <div className="relative">
            <MdOutlineShoppingCart className="h-7 w-6 text-black cursor-pointer" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
                {cart.length}
              </span>
            )}
          </div>
        </Link>
      </div>
      {/* Profile Icon (Avatar when signed in, User Icon when signed out) */}
      <div>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal">
            <button>
              <svg
                className="h-7 w-6 text-black cursor-pointer"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a8.25 8.25 0 0115 0"
                />
              </svg>
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default NavIcons;
