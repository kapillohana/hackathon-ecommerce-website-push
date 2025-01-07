import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="text-white">
      <div className="flex justify-center items-start w-full mt-20 px-10 md:px-18">
        <div className="flex flex-col md:flex-row w-full max-w-screen-lg justify-between pt-10 space-x-6" style={{ height: '20rem' }}>
          
          {/* Left section with logo and address */}
          <div className="flex-1 max-w-[15rem] mb-6 md:mb-0">
            <Link href="/" passHref>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={120}
                height={60}
                className="cursor-pointer"
              />
            </Link>
            <div className="pt-6">
              <small className="text-[#9f9f9f] leading-5">
                400 University Drive Suite 200 Coral <br /> Gables, <br /> FL 33134 USA
              </small>
            </div>
          </div>

          {/* Links section */}
          <div className="flex-1 max-w-[15rem] mb-6 md:mb-0">
            <small className="text-[#9f9f9f] block mb-4">Links</small>
            <div className="flex flex-col gap-8 text-black font-medium">
              <Link href="/" className="cursor-pointer hover:underline">
                Home
              </Link>
              <Link href="/" className="cursor-pointer hover:underline">
                Shop
              </Link>
              <Link href="/" className="cursor-pointer hover:underline">
                About
              </Link>
              <Link href="/" className="cursor-pointer hover:underline">
                Contact
              </Link>
            </div>
          </div>

          {/* Help section */}
          <div className="flex-1 max-w-[15rem] mb-6 md:mb-0">
            <small className="text-[#9f9f9f] block mb-4">Help</small>
            <div className="flex flex-col gap-8 text-black font-medium">
              <Link href="/" className="cursor-pointer hover:underline">
                Payment Option
              </Link>
              <Link href="/" className="cursor-pointer hover:underline">
                Returns
              </Link>
              <Link href="/" className="cursor-pointer hover:underline">
                Privacy Policies
              </Link>
            </div>
          </div>

          {/* Newsletter section */}
          <div className="flex-1 max-w-[15rem]">
            <small className="text-[#9f9f9f] block mb-4">Newsletter</small>
            <div className="text-black font-medium">
              <div className="flex items-center border-b border-black w-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full p-2 text-black bg-transparent focus:outline-none"
                />
                <button className="-mr-10 text-black border-b hover:text-blue-600 hover:border-blue-600 ">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="hidden md:block">
        <small className='text-black pl-52 -pt-10'>2023 furino. All rights reserved</small>
      </div>
    </div>
  );
};

export default Footer;


