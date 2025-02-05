"use client";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const { isSignedIn } = useUser();

  return (
    <div>
      {/* Menu Icon */}
      <CiMenuFries
        className="h-8 w-8 text-black cursor-pointer hover:text-gray-600 transition-colors duration-300"
        onClick={() => setOpen((prev) => !prev)}
      />

      {/* Overlay Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center gap-8 text-xl z-50"
            onClick={() => setOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white text-2xl hover:text-gray-400 transition-colors duration-300"
            >
              &times;
            </button>

          

            {/* Navigation Links */}
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Link
                href="/"
                className="text-white hover:text-gray-400 transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/Shop"
                className="text-white hover:text-gray-400 transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/"
                className="text-white hover:text-gray-400 transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blogs"
                className="text-white hover:text-gray-400 transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-gray-400 transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;