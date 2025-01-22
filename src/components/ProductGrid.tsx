"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { client } from "../sanity/lib/client"; // Adjust this import path
import ButtonSelfMade from "./ui/ButtonSelfMade";
import Link from "next/link";
import Shop from "@/app/Shop/page";

const ProductSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // Add loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);  // Set loading to true before fetching
      const query = `*[_type == "product"][0..7]{
        _id,
        title,
        description,
        price,
        "image": productImage.asset->url
      }`;

      try {
        const productsData = await client.fetch(query);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

  // Function to limit description text
  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-32 lg:mt-20 sm:mt-10 text-center">
      <h1 className="text-[#333333] font-bold text-[2.5rem] font-sans mb-8 text-center">
        Our Products
      </h1>

      {loading ? (
        // Loader Component (You can replace this with a spinner or animation)
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FF7A28] border-solid"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="group bg-[#F4F5F7] relative overflow-hidden flex flex-col items-left">
              {/* Product Cards */}
              <div className="relative w-full h-[300px] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full transition-all duration-300 group-hover:opacity-90"
                />
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button className="mb-4 px-10 py-2 bg-white text-[#FF7A28] text-sm font-semibold transition rounded-md duration-300 ease-in-out hover:bg-[#ff5e00] hover:text-white hover:translate-x-1">
                    Add to Cart
                  </button>

                  <div className="flex space-x-4 text-sm">
                    <button className="flex items-center space-x-1 hover:text-[#FF7A28]">
                      <FaRegHeart />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-[#FF7A28]">
                      <MdOutlineCompareArrows />
                      <span>Compare</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-[#FF7A28]">
                      <IoShareSocial />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#333333] text-left">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm text-[#666666] text-left">
                  {truncateDescription(product.description, 100)}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-lg font-bold text-[#3a3a3a]">
                    Rs:{product.price}.000
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

<div className="justify-center items-center mb-10 mt-4">
  <Link href="/Shop">
    <ButtonSelfMade text="See More Products" />
  </Link>
</div>
    </div>
  );
};

export default ProductSection;
