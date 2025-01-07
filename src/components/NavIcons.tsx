"use client";

import { FaRegUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";

const NavIcons = () => {
  return (
    <div className="md:flex flex-row gap-10 hidden">
      <Link href="/profile" passHref>
        <FaRegUser className="h-6 w-6 text-black cursor-pointer" />
      </Link>
      <Link href="/search" passHref>
        <FiSearch className="h-6 w-6 text-black cursor-pointer" />
      </Link>
      <Link href="/favorites" passHref>
        <FaRegHeart className="h-6 w-6 text-black cursor-pointer" />
      </Link>
      <div>
      <Link href="/cart" passHref>
        <MdOutlineShoppingCart className="h-6 w-6 text-black cursor-pointer" />
      </Link>
    </div>
    </div>
  );
};

export default NavIcons;
