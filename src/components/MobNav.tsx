"use client";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <CiMenuFries
        className="h-6 w-6 text-black cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-16 w-full h-[calc(80vh)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          <Link href="/">Home</Link>
          <Link href="/">Contact</Link>
          <Link href="/">About</Link>
          <Link href="/">Signup</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
