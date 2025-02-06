import Link from "next/link";
import Image from "next/image";
import NavIcons from "./NavIcons";
import Menu from "./MobNav";

const Header = () => {
  return (
    <>
      {/* Large Screen Header */}
      <div className="w-full h-[100px] bg-white px-10 md:px-18 lg:px-24 py-8 hidden lg:flex items-center justify-between">
        {/* Large Screen Logo and Navigation Links */}
        <div className="flex items-center">
          <Link href="/" passHref>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={140}
              height={70}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Large Screen Navigation Links */}
        <div className="hidden lg:flex gap-14 text-black font-semibold">
          <Link href="/" className="cursor-pointer hover:underline hover:text-[#B88E2F] ">
            Home
          </Link>
          <Link href="/Shop" className="cursor-pointer hover:underline hover:text-[#B88E2F]">
            Shop
          </Link>
          <Link href="/blogs" className="cursor-pointer hover:underline hover:text-[#B88E2F]">
            Blogs
          </Link>
          <Link href="/contact" className="cursor-pointer hover:underline hover:text-[#B88E2F]">
            Contact
          </Link>
        </div>

        {/* Icons (e.g., Cart, User) for Large Screen */}
        <NavIcons />
      </div>

      {/* Small Screen Header */}
      <div className="lg:hidden w-full flex items-center justify-between px-10 md:px-18 lg:px-24 py-8">
        {/* Mobile Logo on the Left */}
        <div className="flex items-center justify-start w-full">
          <Link href="/" passHref>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={120}
              height={60}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Mobile Menu Icon on the Right */}
        <div className="flex items-center justify-end">
          <Menu />
        </div>
      </div>
    </>
  );
};

export default Header;
